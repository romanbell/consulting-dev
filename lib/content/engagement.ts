export interface EngagementPhase {
  desig: string;
  code: string;
  name: string;
  duration: string;
  deliverables: { ref: string; item: string }[];
}

export const ENGAGEMENT_PHASES: EngagementPhase[] = [
  {
    desig: "D",
    code: "DISCOVERY",
    name: "Scope & diagnose",
    duration: "1-2 wks",
    deliverables: [
      { ref: "D01", item: "Stakeholder interviews" },
      { ref: "D02", item: "Data landscape audit" },
      { ref: "D03", item: "Problem brief (written)" },
      { ref: "D04", item: "Scope + success criteria" },
    ],
  },
  {
    desig: "A",
    code: "ARCHITECTURE",
    name: "Design the system",
    duration: "1-3 wks",
    deliverables: [
      { ref: "A01", item: "System architecture doc" },
      { ref: "A02", item: "Schema + data model" },
      { ref: "A03", item: "Stack recommendation" },
      { ref: "A04", item: "Risk register" },
      { ref: "A05", item: "Timeline + milestones" },
    ],
  },
  {
    desig: "B",
    code: "BUILD",
    name: "Ship incrementally",
    duration: "4-12 wks",
    deliverables: [
      { ref: "B01", item: "Working prototype (wk 2)" },
      { ref: "B02", item: "Pipeline / model / interface" },
      { ref: "B03", item: "Test suite + CI" },
      { ref: "B04", item: "Weekly demo + changelog" },
    ],
  },
  {
    desig: "V",
    code: "VALIDATE",
    name: "Prove the outcome",
    duration: "1-2 wks",
    deliverables: [
      { ref: "V01", item: "Metric snapshot (before/after)" },
      { ref: "V02", item: "Performance benchmark" },
      { ref: "V03", item: "Stakeholder sign-off" },
    ],
  },
  {
    desig: "H",
    code: "HAND-OFF",
    name: "Transfer ownership",
    duration: "1-2 wks",
    deliverables: [
      { ref: "H01", item: "Runbook + ops playbook" },
      { ref: "H02", item: "Team walkthrough (recorded)" },
      { ref: "H03", item: "30-day support window" },
    ],
  },
];

export interface Strength {
  label: string;
  detail: string;
}

export const STUDIO_STRENGTHS: Strength[] = [
  {
    label: "Strategy that ships",
    detail: "We don't hand you a deck. We hand you a working system and the deck that explains why it was built that way.",
  },
  {
    label: "Full-stack execution",
    detail: "Pipeline to interface, model to dashboard. One team owns the whole surface area. No handoff gaps.",
  },
  {
    label: "Outcome-indexed",
    detail: "Every engagement exits with a number attached. Hours saved, dollars moved, records migrated. Cited, not claimed.",
  },
  {
    label: "Operable on exit",
    detail: "Runbooks, tests, documentation, a trained team. We build to leave, not to stay.",
  },
];
