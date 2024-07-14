import Link from "next/link";

export default function Button({ children, className, href, rel, target }) {
  return (
    <Link
      className={`${className} border border-stone-800 hover:bg-stone-800 transition hover:text-white p-2 px-4 rounded-2xl w-fit`}
      target={target}
      href={href}
      rel={rel}
    >
      {children}
    </Link>
  );
}
