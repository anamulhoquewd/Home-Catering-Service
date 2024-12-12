import { FC } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface TextInputFieldProps {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  disabled?: boolean;
  type?: string;
  error?: string;
}

export const TextInputField: FC<TextInputFieldProps> = ({
  form,
  name,
  label,
  placeholder,
  disabled = false,
  type = "text",
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              {...field}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface SelectInputFieldProps {
  form: any;
  name: string;
  label: string;
  placeholder: string;
  items: { name: string; value: string }[];
  disabled?: boolean;
}
export const SelectInputField: FC<SelectInputFieldProps> = ({
  form,
  name,
  label,
  placeholder,
  items,
  disabled = false,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface FileInputFieldProps {
  form: any;
  name: string;
  label: string;
  message: string;
  disabled?: boolean;
}
export const FileInputField: FC<FileInputFieldProps> = ({
  form,
  name,
  label,
  message,
  disabled = false,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                onChange(file);
              }}
              {...field}
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>{message}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface CheckboxInputFieldProps {
  form: any;
  checkboxName: string;
  label: string;
  message: string;
  disabled?: boolean;
}
export const CheckboxInputField: FC<CheckboxInputFieldProps> = ({
  form,
  checkboxName = "agreement",
  label,
  message,
  disabled = false,
}) => {
  return (
    <div className="mt-6">
      <div className="flex items-center space-x-2">
        <Input
          type="checkbox"
          {...form.register(checkboxName)}
          className="h-4 w-4 border-gray-300 rounded"
          id={checkboxName}
          disabled={disabled}
        />
        <label htmlFor={checkboxName} className="text-sm">
          {label}
        </label>
      </div>
      <small className="text-muted-foreground">{message}</small>
    </div>
  );
};
