import { Movie, IMAGE_BASE } from "@/lib/tmdb";
import { Skeleton } from "@/components/ui/skeleton";

interface MovieCardProps {
    movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
    if (!movie.poster_path) return null;

    const posterUrl = `${IMAGE_BASE}/w500${movie.poster_path}`;

    return (
        <div className="flex-shrink-0 w-[140px] md:w-[180px] cursor-pointer transition-all duration-300 hover:scale-110 hover:z-30 rounded-md overflow-hidden relative group">
            <img
                src={posterUrl}
                alt={movie.title}
                className="w-full h-[210px] md:h-[270px] object-cover rounded-md shadow-lg transition-shadow group-hover:shadow-2xl"
                loading="lazy"
                onError={(e) => {
                    e.currentTarget.style.display = "none";
                }}
            />
        </div>
    );
};

export const MovieCardSkeleton = () => (
    <Skeleton className="flex-shrink-0 w-[140px] md:w-[180px] h-[210px] md:h-[270px] rounded-md bg-muted animate-pulse" />
);

export default MovieCard;
