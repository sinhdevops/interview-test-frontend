import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface AmountInputValidationProps extends React.ComponentProps<"input"> {
  name: string;
  label?: string;
}

function AmountInputValidation({
  name,
  label,
  ...passProps
}: AmountInputValidationProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="space-y-2">
          {label && (
            <Label htmlFor={label.toLowerCase().replace(" ", "-")}>
              {label}
            </Label>
          )}
          <Input
            id={name}
            type="number"
            step="any"
            min="0"
            className={errors[name] ? "border-red-500" : ""}
            {...field}
            {...passProps}
          />
          {errors[name] && (
            <p className="text-sm text-red-600">
              {errors[name].message as string}
            </p>
          )}
        </div>
      )}
    />
  );
}

export default AmountInputValidation;
