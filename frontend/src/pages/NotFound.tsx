import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <p className="text-xl text-muted-foreground mb-8">Page not found</p>
            <Link
                to="/login"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:brightness-110 transition-all"
            >
                Go to Login
            </Link>
        </div>
    );
};

export default NotFound;
