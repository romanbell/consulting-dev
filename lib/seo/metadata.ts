import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

export function makeMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    title: overrides.title,
    description: overrides.description ?? siteConfig.description,
    openGraph: {
      title: overrides.title
        ? String(overrides.title)
        : siteConfig.title,
      description:
        (overrides.description as string | undefined) ??
        siteConfig.description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      ...(typeof overrides.openGraph === "object" ? overrides.openGraph : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: overrides.title
        ? String(overrides.title)
        : siteConfig.title,
      description:
        (overrides.description as string | undefined) ??
        siteConfig.description,
      ...(typeof overrides.twitter === "object" ? overrides.twitter : {}),
    },
    ...overrides,
  };
}
