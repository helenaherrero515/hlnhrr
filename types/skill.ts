export interface Skill {
  name: string;
  category: string;
  proficiency?: "Foundational" | "Working" | "Advanced" | "Expert";
  icon?: string;
}
