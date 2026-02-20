import { Film } from "lucide-react";
import cinemaBg from "@/assets/cinema-bg.jpg";

interface AuthCardProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    delay: Math.random() * 15,
    duration: Math.random() * 10 + 12,
}));

const AuthCard = ({ children, title, subtitle }: AuthCardProps) => {
    return (
        <div className="min-h-screen relative flex items-center justify-center p-4">
            {/* Cinematic background */}
            <div
                className="cinema-bg"
                style={{ backgroundImage: `url(${cinemaBg})` }}
            />

            {/* Floating particles */}
            <div className="particles">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="particle"
                        style={{
                            width: p.size,
                            height: p.size,
                            left: `${p.left}%`,
                            animationDelay: `${p.delay}s`,
                            animationDuration: `${p.duration}s`,
                        }}
                    />
                ))}
            </div>

            {/* Auth card */}
            <div className="relative z-10 glass-card rounded-3xl w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden animate-fade-in">
                {/* Left - Cinematic branding */}
                <div className="relative hidden lg:flex flex-col items-center justify-center p-12 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-black/20" />
                    <div className="relative z-10 text-center space-y-6">
                        {/* Logo */}
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <Film className="text-primary" size={36} />
                            <h2 className="font-logo text-5xl tracking-widest text-primary">
                                MOVIEFLIX
                            </h2>
                        </div>

                        {/* Tagline */}
                        <h3 className="text-3xl font-bold font-display text-foreground leading-tight">
                            Unlimited Movies.
                            <br />
                            <span className="text-primary">Unlimited Thrill.</span>
                        </h3>

                        <p className="text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
                            Stream thousands of movies, TV shows, and exclusive originals.
                            Your next binge-worthy adventure starts here.
                        </p>

                        {/* Decorative element */}
                        <div className="flex items-center justify-center gap-2 pt-4">
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
                            <span className="text-xs text-muted-foreground uppercase tracking-[0.3em]">
                                Start Streaming
                            </span>
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
                        </div>
                    </div>
                </div>

                {/* Right - Form */}
                <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-2 mb-8">
                        <Film className="text-primary" size={24} />
                        <span className="font-logo text-3xl tracking-widest text-primary">
                            MOVIEFLIX
                        </span>
                    </div>

                    <h1 className="text-2xl font-bold font-display text-foreground mb-1">
                        {title}
                    </h1>
                    <p className="text-sm text-muted-foreground mb-8">{subtitle}</p>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthCard;
