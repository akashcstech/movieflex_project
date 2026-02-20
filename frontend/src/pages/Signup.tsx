import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, User, Phone } from "lucide-react";
import AuthCard from "@/components/AuthCard";
import InputField from "@/components/InputField";
import PasswordField from "@/components/PasswordField";

const Signup = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [signupError, setSignupError] = useState<string | null>(null);

    const validate = () => {
        const e: Record<string, string> = {};
        if (!username.trim()) e.username = "Username is required";
        if (!email.trim()) e.email = "Email is required";
        if (!phone.trim()) e.phone = "Phone is required";
        if (!password) e.password = "Password is required";
        if (password.length < 6) e.password = "Minimum 6 characters";
        if (password !== confirmPassword) e.confirmPassword = "Passwords do not match";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev: FormEvent) => {
        ev.preventDefault();
        setSignupError(null);
        if (!validate()) return;

        try {
            const response = await fetch("http://localhost:5000/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username.trim(),
                    email: email.trim(),
                    phone: phone.trim(),
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                setSignupError(data.message || "Signup failed. Please try again.");
                return;
            }

            navigate("/login");
        } catch (error) {
            console.error("Signup request failed", error);
            setSignupError("Something went wrong. Please try again.");
        }
    };

    return (
        <AuthCard title="Create Account" subtitle="Join us and get started">
            <form onSubmit={handleSubmit} className="space-y-3.5">
                <InputField
                    label="Username"
                    placeholder="johndoe"
                    value={username}
                    onChange={setUsername}
                    icon={<User size={16} />}
                    error={errors.username}
                    required
                />
                <InputField
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={setEmail}
                    icon={<Mail size={16} />}
                    error={errors.email}
                    required
                />
                <InputField
                    label="Phone"
                    type="tel"
                    placeholder="+1 234 567 890"
                    value={phone}
                    onChange={setPhone}
                    icon={<Phone size={16} />}
                    error={errors.phone}
                    required
                />
                <PasswordField
                    label="Password"
                    placeholder="Create a password"
                    value={password}
                    onChange={setPassword}
                    error={errors.password}
                    required
                    showStrength
                />
                <PasswordField
                    label="Confirm Password"
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    error={errors.confirmPassword}
                    required
                />

                {signupError && (
                    <p className="text-sm text-red-500 mt-1" role="alert">
                        {signupError}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full btn-glow bg-primary text-primary-foreground font-semibold py-3.5 rounded-full transition-all hover:brightness-110 text-base mt-2"
                >
                    Create Account
                </button>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthCard>
    );
};

export default Signup;
