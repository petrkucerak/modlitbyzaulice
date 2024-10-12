import Script from "next/script";
import { conf } from "../conf";

export default function StructureOrg() {
  const schemeData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    image: conf.image,
    url: conf.url,
    logo: `${conf.url}${conf.icons[0].src}`,
    name: conf.short_name,
    description: conf.description,
    email: conf.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kostelní 92",
      addressLocality: "Pardubice",
      addressCountry: "CZ",
      postalCode: "530 02",
    },
  };
  return (
    <>
      <Script
        id="structure-org"
        strategy="lazyOnload"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemeData) }}
      />
    </>
  );
}
