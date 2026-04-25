export const siteConfig = {
  name: "Veridium",
  title: "Veridium — Data & Technology Studio",
  description:
    "Veridium is a two-person data and technology studio based in New York. We partner with companies to design, build, and ship the systems that move their business forward.",
  url: "https://veridium.studio",
  ogImage: "/og-default.png",
  founders: [
    { name: "Jeffrey Wang", role: "Strategy & Engineering" },
    { name: "Roman Bellisari", role: "Design & Engineering" },
  ],
  location: {
    city: "New York, NY",
    coords: "40.71°N · 74.00°W",
  },
  founded: 2024,
  ref: "VRD-001",
  social: {
    linkedin: "https://linkedin.com/company/veridium",
    github: "https://github.com/veridium",
    email: "hello@veridium.studio",
  },
  motionProfile: "editorial" as "editorial" | "kinetic",
} as const;
