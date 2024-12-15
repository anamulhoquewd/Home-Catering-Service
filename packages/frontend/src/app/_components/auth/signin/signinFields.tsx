import { Button } from "@/components/ui/button";
import { FC } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";

interface SigninComponentProps {
  onSubmit: (values: any) => void;
  form: any;
}
const SigninFields: FC<SigninComponentProps> = ({ onSubmit, form }) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500 cursor-pointer">
                Email
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="anam@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="after:content-['*'] after:ml-0.5 after:text-red-500 cursor-pointer">
                Password
              </FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       
        <Button type="submit" variant={"primary"} className="w-full">
          Sign In
        </Button>
      </form>

      <Link
        href="/auth/signup"
        className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary mt-6"
      >
        <UtensilsCrossed className="h-4 w-4" /> Sign Up
      </Link>
    </Form>
  );
};

export default SigninFields;
