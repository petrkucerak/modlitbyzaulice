import Link from "next/link";

export default function Button({ children, className, href, rel, target }) {
  return (
    <Link
      className={`${className} bg-wine px-4 py-2 uppercase rounded`}
      target={target}
      href={href}
      rel={rel}
    >
      {children}
    </Link>
  );
}
