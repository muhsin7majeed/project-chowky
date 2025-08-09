import type { GenericLabelValue } from "@/types/common";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface CustomSelectProps<T> {
  options: GenericLabelValue<T>[];
  value: T | undefined;
  onChange: (value: T | undefined) => void;
  placeholder?: string;
}

const CustomSelect = <T,>({ options, value, onChange, placeholder = "Select an option" }: CustomSelectProps<T>) => {
  return (
    <Select value={(value as string) || ""} onValueChange={(value) => onChange(value as T)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {options.map((option, index) => (
          <SelectItem key={`${option.value}-${index}`} value={option.value as never}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
