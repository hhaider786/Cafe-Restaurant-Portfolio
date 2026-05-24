"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion, useSaveData } from "./useReducedMotion";

type Palette = "aurora" | "ember" | "metallic" | "warm" | "violet";

const PALETTES: Record<Palette, [number, number, number][]> = {
  aurora:   [[0.05, 0.10, 0.20], [0.10, 0.45, 0.65], [0.40, 0.85, 0.75], [0.95, 0.55, 0.85]],
  ember:    [[0.02, 0.02, 0.04], [0.55, 0.10, 0.05], [0.95, 0.45, 0.15], [1.00, 0.85, 0.45]],
  metallic: [[0.02, 0.02, 0.03], [0.08, 0.08, 0.10], [0.45, 0.40, 0.30], [0.88, 0.75, 0.45]],
  warm:     [[0.07, 0.06, 0.04], [0.32, 0.18, 0.06], [0.83, 0.50, 0.20], [0.96, 0.85, 0.62]],
  violet:   [[0.03, 0.03, 0.08], [0.20, 0.10, 0.45], [0.55, 0.30, 0.85], [0.95, 0.65, 0.95]],
};

type Props = {
  palette?: Palette;
  className?: string;
  fallbackImage?: string;
  speed?: number;
  intensity?: number;
};

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main(){
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform vec2 u_res;
uniform float u_time;
uniform float u_intensity;
uniform vec3 u_c0;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;

// 2D simplex noise — Ashima Arts (MIT)
vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  for(int i = 0; i < 5; i++){
    v += a * snoise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv = v_uv;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_res.x / u_res.y;

  float t = u_time * 0.08;
  vec2 q = vec2(fbm(p + t), fbm(p - t + 3.7));
  vec2 r = vec2(fbm(p + q + vec2(1.7, 9.2) + t*0.5),
                fbm(p + q + vec2(8.3, 2.8) - t*0.5));
  float f = fbm(p + r * u_intensity);
  f = smoothstep(-0.4, 0.9, f);

  vec3 col = mix(u_c0, u_c1, smoothstep(0.0, 0.45, f));
  col = mix(col, u_c2, smoothstep(0.35, 0.75, f));
  col = mix(col, u_c3, smoothstep(0.7, 1.0, f) * 0.85);

  // subtle vignette
  float vig = smoothstep(1.3, 0.45, length(p) * 0.95);
  col *= mix(0.55, 1.0, vig);

  // soft grain
  float n = fract(sin(dot(uv, vec2(12.9898,78.233))) * 43758.5453);
  col += (n - 0.5) * 0.025;

  gl_FragColor = vec4(col, 1.0);
}
`;

export function WebGLHero({ palette = "aurora", className, fallbackImage, speed = 1, intensity = 1.3 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const saveData = useSaveData();
  const disabled = reduced || saveData;

  useEffect(() => {
    if (disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, premultipliedAlpha: true });
    if (!gl) return;

    const compile = (type: number, src: string): WebGLShader | null => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uI = gl.getUniformLocation(prog, "u_intensity");
    const uC0 = gl.getUniformLocation(prog, "u_c0");
    const uC1 = gl.getUniformLocation(prog, "u_c1");
    const uC2 = gl.getUniformLocation(prog, "u_c2");
    const uC3 = gl.getUniformLocation(prog, "u_c3");

    const [c0, c1, c2, c3] = PALETTES[palette];
    gl.uniform3fv(uC0, c0);
    gl.uniform3fv(uC1, c1);
    gl.uniform3fv(uC2, c2);
    gl.uniform3fv(uC3, c3);
    gl.uniform1f(uI, intensity);

    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let last = performance.now();
    let t = 0;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (visible) {
        t += dt * speed;
        gl.uniform1f(uTime, t);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [palette, speed, intensity, disabled]);

  if (disabled && fallbackImage) {
    return (
      <div
        aria-hidden
        className={className}
        style={{
          backgroundImage: `url(${fallbackImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    );
  }

  if (disabled) {
    const [c0, , , c3] = PALETTES[palette];
    const rgb = (c: number[]) => `rgb(${Math.round(c[0]*255)},${Math.round(c[1]*255)},${Math.round(c[2]*255)})`;
    return <div aria-hidden className={className} style={{ background: `linear-gradient(135deg, ${rgb(c0)}, ${rgb(c3)})` }} />;
  }

  return <canvas ref={canvasRef} aria-hidden className={className} style={{ display: "block" }} />;
}
