export interface Project {
  n: string;
  slug: string;
  title: string;
  tag: string;
  sector: string;
  desc: string;
  stack: string[];
  metric: string;
  unit: string;
  framing: string;
  approach: string[];
  stackDetail: { tool: string; reason: string }[];
  reflection: string;
}

export const PROJECTS: Project[] = [
  {
    n: "01",
    slug: "automated-invoicing",
    title: "Automated Invoicing",
    tag: "AUTOMATION",
    sector: "Commercial Services",
    desc: "Automated invoicing system for a national commercial services company. Receivables, reconciliations, remittance.",
    stack: ["Python", "Postgres", "Airflow", "FastAPI"],
    metric: "$1.2B",
    unit: "Invoices collected / yr",
    framing:
      "A national commercial services firm was processing invoices manually across dozens of regional offices. Errors were frequent, collections lagged, and reconciliation took days that should have taken minutes. The finance team needed a system that could handle volume without hiring proportionally.",
    approach: [
      "Mapped the full receivables lifecycle across all regional offices to find bottlenecks",
      "Built an event-driven pipeline to generate, validate, and dispatch invoices on schedule",
      "Integrated with existing ERP via a lightweight API gateway",
      "Automated reconciliation with bank feeds, flagging discrepancies for human review",
      "Deployed progressively, office by office, with rollback capability at each stage",
    ],
    stackDetail: [
      { tool: "Python", reason: "Core business logic and data transformations" },
      { tool: "Postgres", reason: "Transactional data store with strong ACID guarantees" },
      { tool: "Airflow", reason: "Orchestration of scheduled invoice runs and reconciliation" },
      { tool: "FastAPI", reason: "Internal API layer connecting the pipeline to existing systems" },
    ],
    reflection:
      "The lesson here was that automation is not about replacing people. It is about removing the repetitive work so the finance team can focus on exceptions and strategy. The system now processes over a billion dollars in invoices annually with minimal human intervention on the happy path.",
  },
  {
    n: "02",
    slug: "customer-retention-engine",
    title: "Customer Retention Engine",
    tag: "DATA ANALYTICS",
    sector: "Consumer Subscription",
    desc: "Advanced analytics and ML to identify customers at risk of leaving, paired with lightweight in-app interventions.",
    stack: ["BigQuery", "dbt", "scikit-learn", "Looker"],
    metric: "+30%",
    unit: "Retention lift",
    framing:
      "A consumer subscription business was losing customers faster than it could acquire them. The marketing team had hunches about who was at risk, but no systematic way to act on them. They needed a signal, not a dashboard.",
    approach: [
      "Built a unified customer events table from fragmented product analytics and billing data",
      "Trained a churn prediction model on 18 months of historical behavior",
      "Identified the three strongest leading indicators of churn for this specific product",
      "Designed lightweight in-app interventions triggered by model scores",
      "Shipped a Looker dashboard for the retention team to monitor cohort health weekly",
    ],
    stackDetail: [
      { tool: "BigQuery", reason: "Scalable warehouse for event-level customer data" },
      { tool: "dbt", reason: "Modular transformation layer, tested and documented" },
      { tool: "scikit-learn", reason: "Gradient-boosted model, interpretable and fast to iterate" },
      { tool: "Looker", reason: "Self-serve dashboards the retention team actually uses" },
    ],
    reflection:
      "The model itself was straightforward. The hard part was getting the interventions right: too aggressive and you annoy users, too subtle and they never see it. The 30% lift came from the interventions, not the model. The model just told us where to aim.",
  },
  {
    n: "03",
    slug: "budget-optimization",
    title: "Budget Optimization",
    tag: "MARKETING",
    sector: "DTC Retail",
    desc: "Marketing mix + incrementality model to reallocate spend toward channels that actually compound.",
    stack: ["Python", "Snowflake", "dbt", "PyMC"],
    metric: "$1M",
    unit: "Spend reduction",
    framing:
      "A DTC retail brand was spending heavily across paid channels but could not explain which dollars were driving growth and which were wasted. Attribution models were conflicting. The CMO needed a clear allocation framework before the next budget cycle.",
    approach: [
      "Consolidated spend, impression, and conversion data across all paid channels into a single source of truth",
      "Built a Bayesian marketing mix model to decompose revenue contributions by channel",
      "Ran incrementality tests on the two largest spend categories to validate model outputs",
      "Delivered a spend reallocation plan with confidence intervals",
      "Automated weekly model refresh to track drift as channel dynamics shifted",
    ],
    stackDetail: [
      { tool: "Python", reason: "Model development and statistical analysis" },
      { tool: "Snowflake", reason: "Central warehouse for cross-channel spend and conversion data" },
      { tool: "dbt", reason: "Reproducible transformations for channel-level aggregates" },
      { tool: "PyMC", reason: "Bayesian framework for the marketing mix model with uncertainty quantification" },
    ],
    reflection:
      "The biggest insight was not which channel was best. It was which channel looked best in last-touch attribution but contributed almost nothing incrementally. That single finding freed up a million dollars in annual spend.",
  },
  {
    n: "04",
    slug: "ai-lesson-plan-generation",
    title: "AI Lesson Plan Generation",
    tag: "APPLIED AI",
    sector: "Education",
    desc: "Bespoke, interactive lesson plans tuned to each student's interests, location, and learning style.",
    stack: ["Next.js", "LangChain", "GPT-4o", "Supabase"],
    metric: "10h",
    unit: "Hours saved / wk",
    framing:
      "Teachers were spending evenings and weekends writing lesson plans from scratch. An education platform wanted to give them a tool that could draft personalized, standards-aligned plans in minutes, not hours, while still leaving room for a teacher's own judgment and creativity.",
    approach: [
      "Defined a structured lesson plan schema that maps to common education standards",
      "Built a multi-step generation pipeline: context gathering, draft, review, refinement",
      "Incorporated student profile signals (interests, reading level, location) into prompt construction",
      "Designed a review interface where teachers edit, annotate, and approve generated plans",
      "Shipped as a standalone tool embedded within the existing platform via iframe and API",
    ],
    stackDetail: [
      { tool: "Next.js", reason: "Full-stack framework for the teacher-facing UI and API routes" },
      { tool: "LangChain", reason: "Orchestration for multi-step generation with retrieval" },
      { tool: "GPT-4o", reason: "Primary generation model, strong at structured educational content" },
      { tool: "Supabase", reason: "Auth, storage, and Postgres for plan persistence and user data" },
    ],
    reflection:
      "The risk with AI in education is that it flattens everything into the same voice. We spent as much time on the editing interface as on the generation pipeline, because the value is not in the first draft. It is in how quickly a teacher can make it their own.",
  },
  {
    n: "05",
    slug: "ai-driven-etl-pipeline",
    title: "AI-Driven ETL Pipeline",
    tag: "ETL / NLP",
    sector: "Stealth NLP",
    desc: "Scalable, secure ETL for a stealth NLP company. Encryption, cloud logging, automated preprocessing.",
    stack: ["Python", "Kafka", "Dagster", "AWS"],
    metric: "+50",
    unit: "Spreadsheets eliminated",
    framing:
      "A stealth NLP company was ingesting unstructured data from dozens of sources, each with its own format and delivery method. Manual preprocessing consumed engineering time that should have gone to model development. They needed a pipeline that could handle variety, volume, and compliance.",
    approach: [
      "Catalogued all data sources and standardized ingestion contracts",
      "Built a Kafka-backed streaming pipeline with schema validation at the boundary",
      "Added field-level encryption for PII before data enters the warehouse",
      "Automated preprocessing steps that were previously done in spreadsheets",
      "Set up structured cloud logging with alerts on ingestion failures and drift",
    ],
    stackDetail: [
      { tool: "Python", reason: "Pipeline logic and NLP preprocessing steps" },
      { tool: "Kafka", reason: "Durable, ordered message delivery across data sources" },
      { tool: "Dagster", reason: "Orchestration with asset-level lineage and observability" },
      { tool: "AWS", reason: "S3, KMS for encryption, CloudWatch for centralized logging" },
    ],
    reflection:
      "The spreadsheet count is a funny metric, but it is real. Every spreadsheet eliminated is a manual process that can no longer break silently. The pipeline now handles sources that the team has not even onboarded yet, because the contracts are generic enough to flex.",
  },
  {
    n: "06",
    slug: "healthcare-data-platform",
    title: "Healthcare Data Platform",
    tag: "HEALTHCARE",
    sector: "Healthcare Distribution",
    desc: "Enterprise data processing and automation system for a national healthcare distribution and services company.",
    stack: ["Snowflake", "dbt", "Terraform", "Airflow"],
    metric: "+100M",
    unit: "Records migrated",
    framing:
      "A national healthcare distribution company was running critical operations on legacy systems with fragmented data stores. Reporting took days. Compliance audits were painful. They needed a modern data platform that could unify their data and support both operational and analytical workloads.",
    approach: [
      "Audited the existing data landscape: 12 source systems, 4 databases, no single source of truth",
      "Designed a Snowflake-based warehouse with a medallion architecture (raw, clean, curated)",
      "Built dbt models for every business domain, with tests and documentation as first-class citizens",
      "Migrated 100M+ records with validation checksums at every stage",
      "Provisioned all infrastructure as code for auditability and reproducibility",
    ],
    stackDetail: [
      { tool: "Snowflake", reason: "Elastic compute, strong governance, handles healthcare-scale data" },
      { tool: "dbt", reason: "Modular SQL transformations with built-in testing and lineage" },
      { tool: "Terraform", reason: "Infrastructure as code for all cloud resources and permissions" },
      { tool: "Airflow", reason: "Orchestration for ingestion, transformation, and export jobs" },
    ],
    reflection:
      "Healthcare data is uniquely unforgiving. A wrong join can mean a wrong patient record. We ran validation checksums at every stage of the migration and kept the legacy system live for three months after cutover. Trust is earned in increments.",
  },
  {
    n: "07",
    slug: "technical-due-diligence",
    title: "Technical Due Diligence",
    tag: "DUE DILIGENCE",
    sector: "Growth-Stage PE",
    desc: "Series B diligence on a vertical SaaS: codebase, data architecture, team, and a 24-month technical forecast.",
    stack: ["Audit", "Reports", "Interviews"],
    metric: "14d",
    unit: "Kickoff to memo",
    framing:
      "A growth-stage private equity firm was evaluating a vertical SaaS company for a Series B investment. They needed an independent technical assessment: could this team scale the product, was the architecture sound, and where were the hidden risks that would surface post-investment.",
    approach: [
      "Reviewed the full codebase, CI/CD pipeline, and deployment history",
      "Assessed data architecture, storage costs, and query performance at projected scale",
      "Conducted structured interviews with engineering, product, and leadership",
      "Built a 24-month technical roadmap with risk-adjusted cost estimates",
      "Delivered a concise investment memo with clear go/no-go recommendations",
    ],
    stackDetail: [
      { tool: "Audit", reason: "Structured codebase and architecture review framework" },
      { tool: "Reports", reason: "Investment memo, technical risk register, roadmap document" },
      { tool: "Interviews", reason: "Structured conversations with engineering, product, and leadership" },
    ],
    reflection:
      "Diligence is not about finding everything wrong. It is about finding the things that matter for the investment thesis. We flagged two architectural decisions that would have required significant rework at 10x the current user base. Both were addressable, but only if planned for early.",
  },
  {
    n: "08",
    slug: "semantic-search-archives",
    title: "Semantic Search for Archives",
    tag: "APPLIED AI",
    sector: "Cultural Institution",
    desc: "Embedding-based retrieval across 1.4M archival records. Hybrid keyword + vector ranking.",
    stack: ["Python", "Pinecone", "OpenAI", "FastAPI"],
    metric: "1.4M",
    unit: "Records indexed",
    framing:
      "A cultural institution had 1.4 million archival records spanning decades, but their search was keyword-only. Researchers could not find what they needed unless they already knew the exact terminology used by the original cataloguer. The archive was rich but effectively invisible.",
    approach: [
      "Processed and cleaned 1.4M records, standardizing metadata fields across decades of cataloguing conventions",
      "Generated dense embeddings for each record using a fine-tuned model",
      "Built a hybrid retrieval pipeline combining BM25 keyword search with vector similarity",
      "Designed a lightweight search UI that surfaces results with context snippets and faceted filters",
      "Indexed incrementally so the archive stays searchable during ongoing cataloguing",
    ],
    stackDetail: [
      { tool: "Python", reason: "Data processing, embedding generation, and API logic" },
      { tool: "Pinecone", reason: "Managed vector database with metadata filtering" },
      { tool: "OpenAI", reason: "Embedding model for dense vector representations" },
      { tool: "FastAPI", reason: "Search API serving hybrid results to the frontend" },
    ],
    reflection:
      "The most satisfying test was watching a researcher type a natural-language question and find a record that had been miscatalogued for twenty years. The record was always there. It just needed a different way to be found.",
  },
];
