
export interface SmtpConfig {
  id: string;
  host: string;
  port: number;
  username: string;
  fromName: string;
  fromEmail: string;
  replyToEmail?: string;
  enableTls: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SmtpConfigData {
  host: string;
  port: number;
  username: string;
  password: string;
  fromName: string;
  fromEmail: string;
  replyToEmail?: string;
  enableTls: boolean;
}

export interface TestSmtpData {
  host: string;
  port: number;
  username: string;
  password: string;
}

export interface SendTestEmailData {
  testEmail: string;
}