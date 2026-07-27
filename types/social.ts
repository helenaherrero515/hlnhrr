export type SocialPlatform = "GitHub" | "LinkedIn" | "Dribbble" | "Behance" | "X" | "Email";

export interface Social {
  platform: SocialPlatform;
  label: string;
  href: string;
}
