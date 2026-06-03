import ky from "ky"

const BASE_URL: string = "https://www.themealdb.com/api/json/v1/1"

export const api = ky.create({
  prefixUrl: BASE_URL,
  timeout: 10000,
  retry: 2,
});

interface Meal {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strYoutube: string
  [key: string]: string | null
}

interface MealsResponse {
  meals: Meal[] | null
}

export const searchMeals = async (query: string): Promise<Meal[]> => {
  const data = await api.get('search.php', {
    searchParams: { s: query }
  }).json<MealsResponse>()
  
  return data.meals || []
};



interface FilteredMeal {
    strMeal: string
    strMealThumb: string
    idMeal: string
}

interface CategoriesResponse {
    meals: FilteredMeal[] | null
}

export const getMeals = async (category: string): Promise<FilteredMeal[]> => {
  const data = await api.get('filter.php', { 
    searchParams: { c: category }
  }).json<CategoriesResponse>()
  
  return data.meals || []
}

