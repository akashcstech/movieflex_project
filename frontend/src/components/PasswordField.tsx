import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordFieldProps {
    label: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;
    showStrength?: boolean;
}

const getStrength = (password: string) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
};

const strengthConfig = [
    { label: "", color: "bg-muted" },
    { label: "Very Weak", color: "bg-primary" },
    { label: "Weak", color: "bg-primary" },
    { label: "Fair", color: "bg-amber-500" },
    { label: "Strong", color: "bg-emerald-500" },
    { label: "Very Strong", color: "bg-emerald-400" },
];

const PasswordField = ({
    label,
    placeholder = "Enter password",
    value,
    onChange,
    error,
    required,
    showStrength = false,
}: PasswordFieldProps) => {
    const [visible, setVisible] = useState(false);
    const [focused, setFocused] = useState(false);
    const strength = getStrength(value);

    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground/80">
                {label}
                {required && <span className="text-primary ml-1">*</span>}
            </label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Lock size={16} />
                </span>
                <input
                    type={visible ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className={`w-full glass-input rounded-lg pl-10 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none ${error ? "border-primary/60" : ""
                        } ${focused ? "ring-2 ring-primary/20" : ""}`}
                    required={required}
                />
                <button
                    type="button"
                    onClick={() => setVisible(!visible)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    {visible ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
            {error && <p className="text-xs text-primary">{error}</p>}
            {showStrength && value.length > 0 && (
                <div className="space-y-1.5 pt-1">
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className={`strength-bar flex-1 ${i <= strength ? strengthConfig[strength].color : "bg-muted/30"
                                    }`}
                            />
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {strengthConfig[strength].label}
                    </p>
                </div>
            )}
        </div>
    );
};

export default PasswordField;
