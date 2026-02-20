import { useState } from "react";

interface InputFieldProps {
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    icon?: React.ReactNode;
    error?: string;
    required?: boolean;
}

const InputField = ({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    icon,
    error,
    required,
}: InputFieldProps) => {
    const [focused, setFocused] = useState(false);

    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground/80">
                {label}
                {required && <span className="text-primary ml-1">*</span>}
            </label>
            <div className="relative">
                {icon && (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {icon}
                    </span>
                )}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={`w-full glass-input rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none ${icon ? "pl-10" : ""
                        } ${error ? "border-primary/60" : ""} ${focused ? "ring-2 ring-primary/20" : ""
                        }`}
                    required={required}
                />
            </div>
            {error && <p className="text-xs text-primary">{error}</p>}
        </div>
    );
};

export default InputField;
