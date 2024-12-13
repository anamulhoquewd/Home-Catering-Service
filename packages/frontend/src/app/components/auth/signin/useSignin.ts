import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signinSchema, { SigninSchema } from "./signinSchema";

const useSignup = () => {
  const form = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SigninSchema) => {
    console.log("values", values);
    form.reset();
  };

  return { form, onSubmit };
};

export default useSignup;
