import Link from "next/link";

export default function Button({
  children,
  className,
  href,
  rel,
  target,
  title,
}) {
  return (
    <Link target={target} href={href} rel={rel} title={title}>
      <div
        className={`${className} flex flex-col items-center px-12 py-2 uppercase rounded-sm`}
      >
        {children}
      </div>
    </Link>
  );
}
