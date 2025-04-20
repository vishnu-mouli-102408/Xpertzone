import { CreateEmailOptions } from "resend";

export interface ResendEmailOptions
  extends Omit<CreateEmailOptions, "to" | "from"> {
  email: string;
  from?: string;
}
