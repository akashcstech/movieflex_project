import { useEffect, useState } from "react";
import { Movie, getTrending, getPopular, getTopRated, getUpcoming } from "@/lib/tmdb";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MovieRow from "@/components/MovieRow";

const Home = () => {
    const [trending, setTrending] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            setError(null);
            try {
                const [t, p, tr, u] = await Promise.all([
                    getTrending(),
                    getPopular(),
                    getTopRated(),
                    getUpcoming()
                ]);

                setTrending(t || []);
                setPopular(p || []);
                setTopRated(tr || []);
                setUpcoming(u || []);
            } catch (err: any) {
                console.error("Initialization error:", err);
                setError(err.message || "Failed to load movies. Please check your connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    const heroMovie = trending.length > 0
        ? trending.find((m) => m.backdrop_path) || trending[0]
        : null;

    return (
        <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />

            <HeroBanner movie={heroMovie} loading={loading} />

            <div className="-mt-32 relative z-10 pb-10 space-y-6">
                <MovieRow
                    title="Trending Now"
                    movies={trending}
                    loading={loading}
                    error={error}
                />
                <MovieRow
                    title="Popular on MovieFlix"
                    movies={popular}
                    loading={loading}
                />
                <MovieRow
                    title="Top Rated"
                    movies={topRated}
                    loading={loading}
                />
                <MovieRow
                    title="Upcoming"
                    movies={upcoming}
                    loading={loading}
                />
            </div>
        </main>
    );
};

export default Home;
