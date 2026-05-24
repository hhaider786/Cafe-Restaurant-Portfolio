type Props = {
  href?: string;
  children?: React.ReactNode;
  className?: string;
};

export function SkipLink({ href = "#main", children = "Skip to main content", className }: Props) {
  return (
    <a
      href={href}
      className={
        className ??
        "sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-lg focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-current"
      }
    >
      {children}
    </a>
  );
}
