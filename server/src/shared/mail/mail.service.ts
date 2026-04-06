import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { read, readFileSync } from "fs";
import { join } from "path";
import { Resend } from "resend";
import handlebars from "handlebars";
import { SendMailOptions } from "./interfaces";

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly resend: Resend;
  private templatesDir: string;
  constructor(private configService: ConfigService){
    const apiKey = process.env.RESEND_API_KEY || this.configService.get<string>('RESEND_API_KEY');

    if(!apiKey){
      this.logger.warn('Resend API key is not set. MailService will not function properly.');
    }
    this.resend = new Resend(apiKey);
    this.templatesDir = this.getTemplatesDirectory();
    this.logger.log(`Templates directory: ${this.templatesDir}`);
  }

  private getTemplatesDirectory(): string {
    const isDevelopment = process.env.NODE_ENV !== 'production';

    if(isDevelopment){
      return join(process.cwd(), 'src', 'shared', 'mail', 'templates');
    }

    return join(process.cwd(), 'dist', 'shared', 'mail', 'templates');
  }

  private compileTemplate(
    templateName: string,
    context: Record<string, any> = {},
  ): string {
    try {
      const templatePath = join(this.templatesDir, `${templateName}.hbs`);
      const templateContent = readFileSync(templatePath, 'utf-8');
      const template = handlebars.compile(templateContent);
      const html = template(context);
      return html;
    } catch (error) {
      this.logger.error(`Error compiling template ${templateName}:`, error);
      return `<p>Email content</p>`;
    }
  }

  async sendMail(options: SendMailOptions): Promise<void> {
    const { to, subject, template, context = {} } = options;
    const from = process.env.FROM_EMAIL || 'onboarding@resend.dev';

    try {
      const html = this.compileTemplate(template, context);
      
      console.log(`Attempting to send email to ${to} with subject: ${subject}`);

      const { data, error } = await this.resend.emails.send({
        from,
        to,
        subject,
        html,
      });

      if (error) {
        this.logger.error(`Error sending email to ${to}:`, error);
        throw  new Error(`Failed to send email: ${error.message}`);
      }
      
      this.logger.log(`Email sent successfully to ${to}: ${data?.id}`);
    } catch (error) {
      this.logger.error(`Unexpected error sending email:`, error);
      throw error;
    }
  }
}