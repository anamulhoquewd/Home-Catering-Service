import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  avatar: z
    .any()
    .refine((files) => files?.length === 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    )
    .optional(),
  isActive: z.boolean().default(true),
});

export default registerSchema;

export type RegisterSchema = z.infer<typeof registerSchema>;
