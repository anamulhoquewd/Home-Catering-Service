import { z } from "zod";



const signinSchema = z.object({
  
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, "Password must be at least 8 characters."),
 
});

export default signinSchema;

export type SigninSchema = z.infer<typeof signinSchema>;
