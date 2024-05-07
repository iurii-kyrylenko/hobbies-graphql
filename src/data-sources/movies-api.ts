import { RESTDataSource } from '@apollo/datasource-rest';

interface MovieEntry {
    overview: string;
    poster_path: string;
}

interface TMDBResult {
    movie_results: MovieEntry[];
    tv_results: MovieEntry[];
}

const getResultFromTmdbFind = (tmdb: TMDBResult) => {
    return getResultFromTmdb([...tmdb.movie_results, ...tmdb.tv_results]);
};

const getResultFromTmdb = (entries: MovieEntry[]) => {
    if (!entries.length) {
        return { found: false, plot: null, poster: null };
    }
    const entry = entries[0];
    return { found: true, plot: entry.overview, poster: getPosterUrl(entry.poster_path) };
};

const getPosterUrl = (path: string) => {
    // Supported formats:
    // w92, w154, w185, w342, w500, w780, original
    return `${process.env.TMDB_IMAGE_STORE}w185${path}`;
};

export class MoviesAPI extends RESTDataSource {
    override baseURL = process.env.TMDB_API;

    async getMovieInfo(imdbId: string) {
        const data = await this.get<TMDBResult>(`find/${imdbId}`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                external_source: "imdb_id",
            },
        });

        return getResultFromTmdbFind(data);
    };
}
