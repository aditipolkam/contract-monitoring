export interface IMailOptions {
  from: string;
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  attachments?: AttachmentType[];
}

export interface AttachmentType {
  filename: string;
  path: string;
  cid: string;
}

export enum EMAIL_TYPE {
  WARN = 'warn',
  SUSPICIOUS_ACTIVITY = 'suspicious_activity',
}
