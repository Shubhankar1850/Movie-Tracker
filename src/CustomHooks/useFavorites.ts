import { useState, useEffect } from 'react';
import { FavoriteMovie } from '../types/types';

const FAVORITE_KEY = 'favorite';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);

  // Loading from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITE_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);
  const addFavorite = (movie: FavoriteMovie) => {
    if (!favorites.find(fav => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
      localStorage.setItem(FAVORITE_KEY, JSON.stringify([...favorites, movie]));
    }
  };
  const removeFavorite = (imdbID: string) => {
    let updatedFavorites = favorites.filter(fav => fav.imdbID !== imdbID);
    setFavorites(updatedFavorites);
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(updatedFavorites));
  };
  const isFavorite = (imdbID: string) => {
    return favorites.some(fav => fav.imdbID === imdbID);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
