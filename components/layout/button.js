import Link from "next/link";

export default function Button({ children, className, href, rel, target }) {
  return (
    <Link
      className={`${className} px-12 py-2 uppercase rounded-sm`}
      target={target}
      href={href}
      rel={rel}
    >
      {children}
    </Link>
  );
}
