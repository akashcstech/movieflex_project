import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-3 transition-colors duration-300 ${scrolled ? "bg-background" : "bg-transparent"
                }`}
        >
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary">
                MOVIEFLIX
            </h1>
            <div className="flex items-center gap-6 text-sm font-medium text-foreground/80">
                <span className="hidden md:inline hover:text-foreground cursor-pointer transition-colors">Home</span>
                <span className="hidden md:inline hover:text-foreground cursor-pointer transition-colors">TV Shows</span>
                <span className="hidden md:inline hover:text-foreground cursor-pointer transition-colors">Movies</span>
                <span className="hidden md:inline hover:text-foreground cursor-pointer transition-colors">New & Popular</span>
                <span className="hidden md:inline hover:text-foreground cursor-pointer transition-colors">My List</span>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                    title="Logout"
                >
                    <LogOut size={16} />
                    <span className="hidden sm:inline">Logout</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
