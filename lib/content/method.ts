export interface MethodStep {
  n: string;
  code: string;
  title: string;
  body: string;
  glyphId: "patchbay" | "sequencer" | "lfo" | "handoff";
}

export const METHOD_STEPS: MethodStep[] = [
  {
    n: "001",
    code: "FRAME",
    title: "Diagnose the question",
    body: "We start with the business problem, not the dataset. Interviews, schema walkthroughs, a lot of whiteboard.",
    glyphId: "patchbay",
  },
  {
    n: "002",
    code: "BUILD",
    title: "Compose the system",
    body: "Pipelines, models, interfaces. Written to be read. Small, legible, and boring where boring wins.",
    glyphId: "sequencer",
  },
  {
    n: "003",
    code: "MEASURE",
    title: "Prove the outcome",
    body: "Every project exits with a number attached. Hours saved, dollars moved, records migrated. Cited, not claimed.",
    glyphId: "lfo",
  },
  {
    n: "004",
    code: "HAND-OFF",
    title: "Leave it operable",
    body: "Documentation, runbooks, a trained team. We'd rather you didn't need us next quarter.",
    glyphId: "handoff",
  },
];
