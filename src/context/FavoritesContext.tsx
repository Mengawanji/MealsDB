import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

interface Meal {
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strInstructions: string;
  idMeal: string;
  [key: string]: any;
}

interface FavoritesContextType {
  favorites: Meal[];
  toggleFavorite: (meal: Meal) => void;
  isFavorite: (idMeal: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Meal[]>(() => {
    try {
      const stored = localStorage.getItem("favoriteMeals");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = useCallback((meal: Meal) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.idMeal === meal.idMeal);
      const updated = exists
        ? prev.filter((m) => m.idMeal !== meal.idMeal)
        : [...prev, meal];
      try {
        localStorage.setItem("favoriteMeals", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  const isFavorite = useCallback(
    (idMeal: string) => favorites.some((m) => m.idMeal === idMeal),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}