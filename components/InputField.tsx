import {
    Field,
    FieldDescription,
    FieldLabel
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const InputField = ({ label, type = "text", placeholder, desc="", className = "" }: InputFiledProps) => {
    return (
        <Field className={className}>
            <FieldLabel htmlFor={label} className="md:text-sm text-[14px]">{label}</FieldLabel>
            <Input
                id={label}
                type={type}
                placeholder={placeholder}
                className="placeholder:text-sm focus-visible:border-sky-500 focus-visible:ring-sky-500/40 focus-visible:ring-2"
            />
            <FieldDescription className="md:text-sm text-xs">
                {desc}
            </FieldDescription>
        </Field>
    )
}

export default InputField;