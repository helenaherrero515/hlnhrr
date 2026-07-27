import type { ReactElement, ReactNode } from "react";
import { SectionTitle } from "@/components/ui";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  headingId?: string;
}

export function SectionHeading({ eyebrow, title, description, action, className, headingId }: SectionHeadingProps): ReactElement {
  return <SectionTitle eyebrow={eyebrow} title={title} description={description} action={action} className={className} headingId={headingId} />;
}
