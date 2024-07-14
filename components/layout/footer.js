import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t w-[90vw] max-w-[800px] flex flex-col items-center justify-between">
      <p className="mt-4">Projekt Modlitba za Pardubice podporují</p>
      <p className="text-sm mb-4">
        Tento projekt je vytvořený jako open-source. Pro více informací mrkni do{" "}
        <Link
          href={"https://github.com/petrkucerak/modlitbazapardubice"}
          target="_blank"
          className="underline"
        >
          repositáře projektu
        </Link>
        .
      </p>
    </footer>
  );
}
