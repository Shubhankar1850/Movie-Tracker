// Define All frequently used types here
export interface Rating {
    Source: string;
    Value: string;
  }
  
export interface MovieDetails {
    Title: string;
    Year: string;
    Rated?: string;
    Released?: string;
    Runtime?: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language?: string;
    Country?: string;
    Awards?: string;
    Poster: string;
    Ratings: Rating[];
    Metascore?: string;
    imdbRating?: string;
    imdbVotes?: string;
    imdbID?: string;
    Type?: string;
    DVD?: string;
    BoxOffice?: string;
    Production?: string;
    Website?: string;
  }

export type Movie = {
    imdbID : string,
    Poster : string,
    Title: string,
    Year: string,
    Type: string
}
export type FavoriteMovie = {
  imdbID: string;
};