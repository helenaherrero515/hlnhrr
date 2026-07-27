export interface Certification {
  name: string;
  issuer: string;
  issuedDate: string;
  description?: string;
  credentialId?: string;
  credentialUrl?: string;
  badge?: string;
}
