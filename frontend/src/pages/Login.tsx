import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import AuthCard from "@/components/AuthCard";
import InputField from "@/components/InputField";
import PasswordField from "@/components/PasswordField";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loginError, setLoginError] = useState<string | null>(null);

    const validate = () => {
        const e: Record<string, string> = {};
        if (!email.trim()) e.email = "Email or username is required";
        if (!password) e.password = "Password is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev: FormEvent) => {
        ev.preventDefault();
        setLoginError(null);
        if (!validate()) return;

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: email.trim(),
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                setLoginError(data.message || "Login failed. Please check your credentials.");
                return;
            }

            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            navigate("/home");
        } catch (error) {
            console.error("Login request failed", error);
            setLoginError("Something went wrong. Please try again.");
        }
    };

    return (
        <AuthCard title="Welcome Back" subtitle="Sign in to your account">
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                    label="Email or Username"
                    placeholder="you@example.com"
                    value={email}
                    onChange={setEmail}
                    icon={<Mail size={16} />}
                    error={errors.email}
                    required
                />
                <PasswordField
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={setPassword}
                    error={errors.password}
                    required
                />

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                            className="rounded border-border bg-input accent-primary w-4 h-4"
                        />
                        Remember me
                    </label>
                    <button type="button" className="text-primary hover:underline">
                        Forgot password?
                    </button>
                </div>

                {loginError && (
                    <p className="text-sm text-red-500 mt-1" role="alert">
                        {loginError}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full btn-glow bg-primary text-primary-foreground font-semibold py-3.5 rounded-full transition-all hover:brightness-110 text-base mt-2"
                >
                    Sign In
                </button>

                <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-primary hover:underline font-medium">
                        Create one
                    </Link>
                </p>
            </form>
        </AuthCard>
    );
};

export default Login;
