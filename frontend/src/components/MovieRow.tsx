import { useRef } from "react";
import { Movie } from "@/lib/tmdb";
import MovieCard, { MovieCardSkeleton } from "./MovieCard";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface MovieRowProps {
    title: string;
    movies: Movie[];
    loading: boolean;
    error?: string | null;
}

const MovieRow = ({ title, movies, loading, error }: MovieRowProps) => {
    const rowRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        if (rowRef.current) {
            const amount = rowRef.current.clientWidth * 0.75;
            rowRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
        }
    };

    if (error) {
        return (
            <div className="px-6 md:px-12 mb-8">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error loading {title}</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    if (!loading && (!movies || movies.length === 0)) {
        return null;
    }

    return (
        <div className="px-6 md:px-12 mb-8 group/row">
            <h2 className="text-lg md:text-xl font-bold text-foreground mb-3">{title}</h2>
            <div className="relative">
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-background/60 opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center hover:bg-background/80"
                >
                    <ChevronLeft className="w-8 h-8 text-foreground" />
                </button>

                <div
                    ref={rowRef}
                    className="flex gap-2 overflow-x-scroll scrollbar-hide py-4 px-1"
                >
                    {loading
                        ? Array.from({ length: 8 }).map((_, i) => <MovieCardSkeleton key={i} />)
                        : movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                </div>

                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-background/60 opacity-0 group-hover/row:opacity-100 transition-opacity flex items-center justify-center hover:bg-background/80"
                >
                    <ChevronRight className="w-8 h-8 text-foreground" />
                </button>
            </div>
        </div>
    );
};

export default MovieRow;
