import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://veridium.studio",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://veridium.studio/projects",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
