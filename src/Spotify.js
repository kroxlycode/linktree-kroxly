import { FaSpotify, FaPlay } from "react-icons/fa";
import { useEffect, useState, useCallback } from "react";

function formatDuration(durationMs) {
    const totalSeconds = Math.floor(durationMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours > 0 ? `${hours}:` : ''}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default function UserActivity() {
    const refreshToken = 'your_refresh_token';
    const clientId = 'your_client_id';
    const clientSecret = 'your_client_secret';
    const [spotifyActivity, setSpotifyActivity] = useState(null);
    const [spotifyProgress, setSpotifyProgress] = useState(0);
    const [fetching, setFetching] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [spotifyToken, setSpotifyToken] = useState(null);
    const [error, setError] = useState(null);

    const fetchAccessToken = async () => {
        try {
            const response = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "refresh_token",
                    refresh_token: refreshToken,
                    client_id: clientId,
                    client_secret: clientSecret,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setSpotifyToken(data.access_token);
                setError(null);
                return data.access_token;
            } else {
                setError("Error fetching access token.");
                return null;
            }
        } catch {
            setError("Error occurred while fetching access token.");
            return null;
        }
    };

    const fetchSpotifyActivity = useCallback(async () => {
        if (fetching) return;
        setFetching(true);

        let token = spotifyToken;
        if (!spotifyToken) {
            token = await fetchAccessToken();
        }

        try {
            const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const contentType = response.headers.get("Content-Type");
                if (contentType && contentType.includes("application/json")) {
                    const data = await response.json();
                    setSpotifyActivity(data);
                    setError(null);
                } else {
                    setSpotifyActivity(null);
                }
            } else if (response.status === 204) {
                setSpotifyActivity(null);
            } else if (response.status === 401) {
                const newToken = await fetchAccessToken();
                if (newToken) {
                    setSpotifyToken(newToken); 
                    fetchSpotifyActivity(); 
                }
            } else if (response.status === 429) {
                setError("Rate limit exceeded. Please try again later.");
            } else {
                setError(`Error fetching Spotify activity: ${response.status}`);
            }
        } catch {
            setError("Error occurred while fetching Spotify activity.");
        } finally {
            setFetching(false);
        }
    }, [spotifyToken, fetching]);

    useEffect(() => {
        fetchSpotifyActivity();

        const interval = setInterval(fetchSpotifyActivity, 5000);
        return () => clearInterval(interval);
    }, [spotifyToken, fetchSpotifyActivity]);

    useEffect(() => {
        if (spotifyActivity?.is_playing) {
            const progress = spotifyActivity.progress_ms || 0;
            setSpotifyProgress(progress);
            setIsPaused(false);

            const interval = setInterval(() => {
                setSpotifyProgress(prev => {
                    const newProgress = prev + 1000;
                    return newProgress >= (spotifyActivity.item.duration_ms || 0) ? 0 : newProgress;
                });
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setIsPaused(true);
        }
    }, [spotifyActivity]);

    useEffect(() => {
        fetchAccessToken();
        const tokenRefreshInterval = setInterval(fetchAccessToken, 3600000);

        return () => clearInterval(tokenRefreshInterval);
    }, []);

    const spotifyDuration = spotifyActivity?.item?.duration_ms;
    const formattedArtists = spotifyActivity?.item?.artists?.map(artist => artist.name).join(", ") || "Unknown Artist";

    const handleCardClick = () => {
        window.open(`https://open.spotify.com/track/${spotifyActivity?.item?.id}`, "_blank");
    };

    return (
        <div className="flex h-full min-h-[200px] flex-col justify-stretch gap-5">
            {error && (
                <div className="text-red-500">
                    {error}
                </div>
            )}
            {!spotifyActivity && (
                <a
                    href="https://open.spotify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex h-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-3 pb-3"
                >
                    <FaSpotify className="absolute top-3 left-3 h-8 w-8" />
                    <p className="text-xl font-bold text-center">Not currently listening to any song on Spotify</p>
                </a>
            )}
            {spotifyActivity && (
                <div
                    className="relative flex h-full items-end gap-3 overflow-hidden rounded-3xl border border-white/10 bg-white/5 px-3 pb-3 cursor-pointer"
                    onClick={handleCardClick}
                    style={{
                        backgroundImage: `url(${spotifyActivity.item.album.images[0].url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.9,
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <FaSpotify className="h-8 w-8 shrink-0 mb-3" />
                    <div className="w-full">
                        <p className="text-xs font-bold text-grey-300">Listening to</p>
                        <p className="text-md font-bold">{spotifyActivity.item.name}</p>
                        <p className="text-grey-300 text-sm">by {formattedArtists}</p>
                        <div className="relative mt-2 flex items-center">
                            <span className="text-sm text-gray-250">{formatDuration(spotifyProgress)}</span>
                            <div className="relative flex-grow mx-2 h-2 bg-gray-700 rounded-full">
                                <div
                                    className="absolute top-0 left-0 h-full bg-green-400 rounded-full"
                                    style={{
                                        width: spotifyDuration
                                            ? `${(spotifyProgress / spotifyDuration) * 100}%`
                                            : '0%',
                                    }}
                                ></div>
                            </div>
                            <span className="text-sm text-gray-250">
                                {formatDuration(spotifyDuration)}
                            </span>
                        </div>
                    </div>
                    {isPaused && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <FaPlay className="h-10 w-10 text-white" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
