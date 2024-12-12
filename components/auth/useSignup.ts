import { useForm } from "react-hook-form";
import registerSchema from "./signupSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type MySchemaType = z.infer<typeof registerSchema>;

const useSignup = () => {
  const form = useForm<MySchemaType>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      isActive: true,
      role: "customer",
      avatar: undefined,
      password: "",
    },
  });

  const onSubmit = async (values: MySchemaType) => {
    console.log(values);
  };

  return { form, onSubmit };
};

export default useSignup;
