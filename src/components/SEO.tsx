import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

export default function SEO({
  title = "Hakancan Ozturk - Software Development Engineer at Amazon",
  description = "Software Development Engineer at Amazon specializing in machine learning, RAG systems, and computational fluid dynamics. Expert in AI, data science, and healthcare technology.",
  url = "https://hakancan.io",
  image = "https://hakancan.io/profile.webp",
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Basic meta tags
    setMetaTag("description", description);
    setMetaTag(
      "keywords",
      "machine learning, software engineer, Amazon, RAG, computational fluid dynamics, AI, data science"
    );
    setMetaTag("author", "Hakancan Ozturk");

    // Open Graph tags
    setMetaTag("og:title", title, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:type", "website", true);
    setMetaTag("og:url", url, true);
    setMetaTag("og:image", image, true);

    // Twitter Card tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);

    // Structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Hakancan Ozturk",
      jobTitle: "Software Development Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Amazon",
      },
      url: url,
      sameAs: ["https://linkedin.com/in/hakancan", "https://github.com/hkc5"],
      knowsAbout: [
        "Machine Learning",
        "Retrieval-Augmented Generation",
        "Computational Fluid Dynamics",
        "Software Engineering",
        "Data Science",
      ],
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "Imperial College London",
        },
        {
          "@type": "EducationalOrganization",
          name: "Koç University",
        },
      ],
    };

    // Update or create structured data script
    let structuredDataScript = document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (!structuredDataScript) {
      structuredDataScript = document.createElement("script");
      structuredDataScript.setAttribute("type", "application/ld+json");
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);
  }, [title, description, url, image]);

  return null;
}
