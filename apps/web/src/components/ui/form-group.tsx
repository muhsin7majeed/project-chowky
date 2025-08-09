import { Label } from "./label";

interface FormGroupProps {
  label: string;
  inputId: string;
  required?: boolean;
  description?: string;
  // biome-ignore lint/suspicious/noExplicitAny: #YOLO
  errors?: string | any[];
  children: React.ReactNode;
}

const FormGroup = ({ label, inputId, required, description, errors, children }: FormGroupProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label htmlFor={inputId} className="flex items-center gap-1">
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </Label>
      )}

      {children}

      {description && <p className="text-sm text-muted-foreground">{description}</p>}

      {errors && (
        <p className="text-sm text-destructive" role="alert">
          {Array.isArray(errors)
            ? errors.map((error) => (
                <span className="block" key={error.message}>
                  {error.message}
                </span>
              ))
            : errors}
        </p>
      )}
    </div>
  );
};

export default FormGroup;
