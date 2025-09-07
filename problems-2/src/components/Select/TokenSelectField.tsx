import { getTokenIcon } from "@/utils/utils";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";
import { Badge } from "../ui/badge";

interface TokenSelectFieldProps {
  options: string[];
  label: string;
  name: string;
  disabled?: boolean;
  error?: string;
  balance?: number;
}

const TokenSelectField = ({
  options,
  label,
  name,
  disabled = false,
  error,
  balance,
}: TokenSelectFieldProps) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const selectedValue = watch(name);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="space-y-2">
          <Label htmlFor={`${name}-token`}>{label}</Label>
          <Select
            value={field.value}
            onValueChange={field.onChange}
            disabled={disabled}
          >
            <SelectTrigger
              className={`${error ? "border-red-500" : ""} w-full`}
            >
              <SelectValue placeholder="Select token..." />
            </SelectTrigger>
            <SelectContent className="h-[400px]">
              {options.map((token) => (
                <SelectItem
                  key={`${name}-token-${Math.random()}`}
                  value={token}
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src={getTokenIcon(token)}
                      alt={token}
                      className="w-4 h-4"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <span>{token}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Error message */}
          {errors[name] && (
            <p className="text-sm text-red-600">
              {String(errors[name]?.message)}
            </p>
          )}

          {/* Balance display */}
          {balance !== undefined && selectedValue && (
            <div className="flex items-center justify-between p-2 bg-muted rounded-md text-sm">
              <span className="text-muted-foreground">Balance:</span>
              <Badge variant="secondary">
                {balance.toLocaleString()} {selectedValue}
              </Badge>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default TokenSelectField;
