import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string().regex(/^\d{11}$/, {
    message: "Phone number must be 11 digits and only contain numbers.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, "Password must be at least 8 characters."),
  role: z.enum(["manager", "delivery_man", "admin", "customer"], {
    required_error: "Please select a role.",
  }),
  avatar: z.instanceof(File).optional().or(z.literal("")),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  isActive: z.boolean(),
});

export default registerSchema;
