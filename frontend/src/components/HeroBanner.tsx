import { Movie, BACKDROP_BASE } from "@/lib/tmdb";
import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface HeroBannerProps {
    movie: Movie | null;
    loading: boolean;
}

const HeroBanner = ({ movie, loading }: HeroBannerProps) => {
    if (loading || !movie) {
        return (
            <div className="relative h-[85vh] w-full bg-secondary">
                <div className="absolute bottom-[20%] left-6 md:left-12 space-y-4 max-w-xl">
                    <Skeleton className="h-10 w-80 bg-muted" />
                    <Skeleton className="h-20 w-full bg-muted" />
                    <div className="flex gap-3">
                        <Skeleton className="h-10 w-28 bg-muted" />
                        <Skeleton className="h-10 w-32 bg-muted" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-[85vh] w-full">
            <img
                src={`${BACKDROP_BASE}${movie.backdrop_path}`}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />

            <div className="absolute bottom-[20%] left-6 md:left-12 space-y-4 max-w-xl z-10">
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground drop-shadow-lg">
                    {movie.title}
                </h1>
                <p className="text-sm md:text-base text-foreground/80 line-clamp-3 leading-relaxed">
                    {movie.overview}
                </p>
                <div className="flex gap-3">
                    <Button className="bg-foreground text-background hover:bg-foreground/80 font-semibold gap-2 px-6">
                        <Play className="w-5 h-5 fill-current" /> Play
                    </Button>
                    <Button variant="secondary" className="bg-muted-foreground/30 text-foreground hover:bg-muted-foreground/50 font-semibold gap-2 px-6">
                        <Info className="w-5 h-5" /> More Info
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
