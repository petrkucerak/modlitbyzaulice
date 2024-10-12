import Link from "next/link";

export default function Button({ children, className, href, rel, target, title }) {
  return (
    <Link
      className={`${className} px-12 py-2 uppercase rounded-sm`}
      target={target}
      href={href}
      rel={rel}
      title={title}
    >
      {children}
    </Link>
  );
}
