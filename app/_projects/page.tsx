// Route disabled: the underscore prefix on this folder excludes it from
// the app router. Rename the folder back to `projects` to restore the
// grid page at /projects (and re-add Inter weight 900 in layout.tsx,
// which the grid wordmark uses).
import Grid from "@/components/Grid";

export default function ProjectsPage() {
  return <Grid />;
}
