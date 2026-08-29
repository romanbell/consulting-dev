export type Row = {
  slug: string;
  title: string;
  summary: string;
  color: string;
  col: number;
  year: number;
};

export const ROWS: Row[] = [
  {
    slug: "internal-admin-dashboard",
    title: "internal admin dashboard",
    color: "#4a7c5c",
    col: 8,
    year: 2025,
    summary:
      "An internal tool for operating a complex back office. Built around the workflows the team actually used day to day, not the ones in the original spec. The interesting work was figuring out which screens existed in the old system because policy required them and which existed because nobody had ever questioned them. A few of each got cut, and the rest got rebuilt to fit how the team actually moved through their day.",
  },
  {
    slug: "customer-facing-web-application",
    title: "customer facing web application",
    color: "#6b95c8",
    col: 18,
    year: 2025,
    summary:
      "A public product surface. Focus on making the read paths fast and the write paths legible. Shipped behind a feature flag and rolled out over a couple of weeks. The hard part was less the build and more the careful negotiation about what was actually launch blocking and what was a nice to have that could ship a sprint later. The flag gave us room to be honest about that.",
  },
  {
    slug: "data-ingestion-pipeline",
    title: "data ingestion pipeline",
    color: "#8fc89a",
    col: 27,
    year: 2024,
    summary:
      "A pipeline that takes messy upstream data and produces something the downstream team can trust. Most of the work was deciding what to throw away. The schema kept drifting in small ways nobody upstream considered breaking, so a lot of the value was a thin layer that caught those drifts early and surfaced them with enough context to fix at the source instead of papering over them downstream.",
  },
  {
    slug: "workflow-automation",
    title: "workflow automation",
    color: "#6ba87a",
    col: 12,
    year: 2024,
    summary:
      "Replaced a series of recurring manual steps with a small program. Saved a measurable amount of time and removed a class of copy paste errors. The first version intentionally did less than the manual process so the team could trust it. Once it had a few weeks of clean runs behind it, the scope grew in small steady increments instead of one big launch nobody trusted.",
  },
  {
    slug: "marketing-site",
    title: "marketing site",
    color: "#4a6f9c",
    col: 23,
    year: 2024,
    summary:
      "An editorial site with a small CMS behind it. Treated content as the product. The visual system stayed quiet so the copy could carry the page. The CMS shape was negotiated with the people who would actually use it on a Tuesday afternoon, not the people who specced it in a planning doc, which is the only way to get a CMS that gets used after the launch press cycle ends.",
  },
  {
    slug: "third-party-api-integration",
    title: "third party api integration",
    color: "#8fb5d9",
    col: 5,
    year: 2024,
    summary:
      "Wired an external system into an internal one. The interesting part was the retry and reconciliation layer, making the integration honest about what it had and had not done. The external API was eventually consistent in a way the docs did not really admit, so a lot of the work was figuring out where that mattered and building a paper trail the team could actually use during an incident.",
  },
  {
    slug: "reporting-tool",
    title: "reporting tool",
    color: "#5e9c70",
    col: 16,
    year: 2024,
    summary:
      "A small interface over a set of queries the team kept rerunning by hand. Cached the expensive bits and exposed the cheap bits live. The most valuable feature turned out to be the ability to share a saved view by URL, because the underlying question almost always required a small handful of follow ups before anyone agreed on what the data meant.",
  },
  {
    slug: "backend-service",
    title: "backend service",
    color: "#a7c5e0",
    col: 29,
    year: 2023,
    summary:
      "A long running service that replaced a brittle script. Same job, but legible operationally and recoverable when upstream blinked. The old script was a single file that everyone was scared to touch because nobody had written it down. The new service did roughly the same work, but with the boring parts of an operable system that the team had been working around for months.",
  },
  {
    slug: "authentication-system",
    title: "authentication system",
    color: "#356b78",
    col: 11,
    year: 2023,
    summary:
      "Standard auth done carefully. Boring on the outside, which was the goal. Documented the threat model on the way through. The threat model document outlived the project by a long margin and became a reference for two later engagements, which is honestly the case for a lot of this work. The actual code is generally the least interesting artifact.",
  },
  {
    slug: "migration-tooling",
    title: "migration tooling",
    color: "#4a6f9c",
    col: 25,
    year: 2022,
    summary:
      "A one shot tool for moving a large dataset between two schemas without downtime. Ran it once, deleted it after. The interesting decisions were about how to verify the migration mid flight without locking writes, which involved a small parallel read path that the actual product never used but the migration relied on completely for confidence.",
  },
  {
    slug: "this-site",
    title: "this site",
    color: "#a7d4a2",
    col: 7,
    year: 2026,
    summary:
      "The portfolio you are on. A page wide grid, a thin colored cell per project, hover or click to expand a quiet drawer with the summary. The whole point of the layout is to behave like a sheet of color samples with one cell per row, instead of a typical portfolio with hero images and case study scaffolding. The squares are the index, the drawers are the content, and nothing else has to be on the page.",
  },
  {
    slug: "spreadsheet-sketches",
    title: "spreadsheet sketches",
    color: "#6b95c8",
    col: 20,
    year: 2026,
    summary:
      "Layout studies that treat the page as a sheet of cells. Most never leave the sketchbook. A few become real things eventually. The pattern is to set up the cell grid first, then pour content into it and see what breaks, instead of starting with content and building a layout around it. It turns out to be a useful constraint for projects that do not have hero images to lean on.",
  },
  {
    slug: "type-system-explorations",
    title: "type system explorations",
    color: "#3f6f5b",
    col: 14,
    year: 2025,
    summary:
      "Notes and small programs that lean on the type system to make wrong states unrepresentable. Useful exercises even when nothing ships. A lot of these end up as small repos that document one specific shape of mistake and how the type system can catch it at compile time, which is the kind of writing I keep going back to during real projects.",
  },
  {
    slug: "cli-utilities",
    title: "cli utilities",
    color: "#7da6cc",
    col: 30,
    year: 2024,
    summary:
      "A handful of small command line tools written for personal use. Each solved one specific annoyance and was retired when the annoyance went away. The retirement step is the unusual part. Most tools accumulate features and outlive their reason for existing. These ones got deleted the moment the underlying problem stopped being a problem, which is the cleanest way to leave a tool I have found.",
  },
  {
    slug: "notes-on-small-tools",
    title: "notes on small tools",
    color: "#9bbf86",
    col: 3,
    year: 2026,
    summary:
      "An ongoing note about software written for one person, by the same person, for a specific job. The opposite of platform engineering. The note tries to take seriously the case for tools that never need to scale past their author, because those tools tend to do their job well and stop, which is rarer than it should be in the kind of software that gets written for paychecks.",
  },
];

export type InfoRow = { k: string; v: string; href?: string };

export const INFO: InfoRow[] = [
  { k: "studio", v: "Veridium" },
  { k: "basis", v: "Independent" },
  { k: "work", v: "Software design and engineering" },
  { k: "domains", v: "Web, data, tooling" },
  { k: "location", v: "New York City" },
  { k: "availability", v: "Selective, accepting inquiries" },
  { k: "contact", v: "Send a message", href: "mailto:hello@veridium.studio" },
];
