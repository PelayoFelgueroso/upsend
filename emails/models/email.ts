export interface SmtpConfigTest {
  host: string;
  port: number;
  username: string;
  password: string;
}

export interface EmailOptions {
  recipient: string;
  subject: string;
  html: string;
  templateId?: string;
}

export interface TestConnectionResult {
  success: boolean;
  message: string;
  error?: string;
}
