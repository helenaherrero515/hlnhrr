import type { ReactElement } from "react";
import type { Experience as ExperienceRecord } from "@/types";
import { Experience } from "./Experience";

interface ExperienceTimelineProps {
  experience: ExperienceRecord[];
}

export function ExperienceTimeline({ experience }: ExperienceTimelineProps): ReactElement {
  return <Experience experience={experience} />;
}
