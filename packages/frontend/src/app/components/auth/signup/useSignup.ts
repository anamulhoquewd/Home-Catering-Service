import { useForm } from "react-hook-form";
import registerSchema, { RegisterSchema } from "./signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const useSignup = () => {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      address: "",
      role: "customer",
      isActive: true,
    },
  });

  const onSubmit = async (values: RegisterSchema) => {
    console.log("values", values);
    form.reset();
  };

  return { form, onSubmit };
};

export default useSignup;
