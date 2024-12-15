import { UtensilsCrossed } from "lucide-react";
import SigninFields from "./signinFields";
import useSignup from "./useSignin";

function SigninComponent() {
  const { form, onSubmit } = useSignup();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center flex-col justify-center gap-3">
          <UtensilsCrossed className="h-10 w-10 text-primary" />
          <h1 className="text-2xl text-primary font-bold mb-6 text-center">
            Welcome Back!
          </h1>
        </div>
        <SigninFields form={form} onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export default SigninComponent;
