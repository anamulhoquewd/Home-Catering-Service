import { Button } from "@/components/ui/button";
import { FC, useEffect } from "react";
import { Form } from "react-hook-form";
import {
  CheckboxInputField,
  FileInputField,
  SelectInputField,
  TextInputField,
} from "../inputFields";

interface SignupComponentProps {
  onSubmit: (data: any) => void;
  form: any;
  defaultValues?: any;
}
const SignUp: FC<SignupComponentProps> = ({
  onSubmit,
  form,
  defaultValues,
}) => {
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);
  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className={`p-1 mr-1.5 space-y-6`}
      >
        <TextInputField
          name="name"
          form={form}
          label="Name"
          placeholder="Enter your name"
        />
        <TextInputField
          name="phone"
          form={form}
          label="Phone"
          placeholder="Enter your phone number"
        />
        <TextInputField
          name="secondaryPhone"
          form={form}
          label="Secondary phone"
          placeholder="Enter your secondary phone number"
        />

        <SelectInputField
          disabled={true}
          name="role"
          form={form}
          label="Role"
          placeholder="Select a role"
          items={[
            { name: "Owner", value: "owner" },
            { name: "Manger", value: "manager" },
            { name: "Delivery Man", value: "delivery_man" },
            { name: "Customer", value: "customer" },
          ]}
        />

        <CheckboxInputField
          checkboxName="isActive"
          form={form}
          label="Active"
          message="Active or Inactive status of the user. Default is active."
        />

        <FileInputField
          name="avatar"
          form={form}
          label="Avatar"
          message="Upload a profile picture (optional)"
        />

        <Button type="submit">{"Submit"}</Button>
      </form>
    </Form>
  );
};

export default SignUp;
