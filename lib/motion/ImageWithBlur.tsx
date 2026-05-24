import Image, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "src" | "placeholder" | "blurDataURL"> & {
  src: string;
  blurWidth?: number;
};

function unsplashBlur(src: string, w: number) {
  if (!src.includes("images.unsplash.com")) return undefined;
  const url = new URL(src);
  url.searchParams.set("w", String(w));
  url.searchParams.set("q", "30");
  url.searchParams.set("blur", "50");
  return url.toString();
}

function makeShimmerDataURL(): string {
  const svg = `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" fill="#1a1a1a"/></svg>`;
  if (typeof Buffer !== "undefined") {
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  }
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function ImageWithBlur({ src, alt, blurWidth = 16, ...rest }: Props) {
  const blurUrl = unsplashBlur(src, blurWidth);
  return (
    <Image
      src={src}
      alt={alt}
      placeholder="blur"
      blurDataURL={blurUrl ?? makeShimmerDataURL()}
      {...rest}
    />
  );
}
