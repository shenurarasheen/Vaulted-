import {
    Field,
    FieldDescription,
    FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const InputField = ({ label, type = "text", field, placeholder, handleInputChange,  desc="", className = "" }: InputFiledProps) => {
    return (
        <Field className={className}>
            <FieldLabel htmlFor={label} className="md:text-sm text-[14px]">{label}</FieldLabel>
            <Input
                id={label}
                type={type}
                placeholder={placeholder}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className="placeholder:text-sm focus-visible:border-sky-500 focus-visible:ring-sky-500/40 focus-visible:ring-2"
                required
            />
            <FieldDescription className="md:text-[123x] text-xs">
                {desc}
            </FieldDescription>
        </Field>
    )
}

export default InputField;