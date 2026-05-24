"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, ReactNode, MouseEvent } from "react";

type Props = Omit<ComponentProps<typeof Link>, "onClick"> & {
  children: ReactNode;
};

type StartVT = (cb: () => void | Promise<void>) => { finished: Promise<void> };

export function ViewTransitionLink({ href, children, ...rest }: Props) {
  const router = useRouter();

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (typeof document === "undefined") return;
    const start = (document as Document & { startViewTransition?: StartVT }).startViewTransition;
    if (!start) return;
    e.preventDefault();
    start(() => {
      router.push(href as string);
    });
  };

  return (
    <Link href={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
