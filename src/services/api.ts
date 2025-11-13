import ky from "ky"

const BASE_URL: string = "https://www.themealdb.com/api/json/v1/1"

export const api = ky.create({
  prefixUrl: BASE_URL,
  timeout: 10000,
  retry: 2,
});

interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  [key: string]: string | null;
}

interface MealsResponse {
  meals: Meal[] | null;
}

export const searchMeals = async (query: string): Promise<Meal[]> => {
  const data = await api.get('search.php', {
    searchParams: { s: query }
  }).json<MealsResponse>()
  
  return data.meals || []
};


export const getMealById = async (id: string): Promise<Meal | null> => {
  const data = await api.get('lookup.php', {
    searchParams: { i: id }
  }).json<MealsResponse>();
  
  return data.meals?.[0] || null;
};

export const getRandomMeal = async (): Promise<Meal | null> => {
  const data = await api.get('random.php').json<MealsResponse>();
  return data.meals?.[0] || null;
};

export const getMealsByCategory = async (category: string): Promise<Meal[]> => {
  const data = await api.get('filter.php', {
    searchParams: { c: category }
  }).json<{ meals: Meal[] }>();
  
  return data.meals || [];
};

export const getMealsByArea = async (area: string): Promise<Meal[]> => {
  const data = await api.get('filter.php', {
    searchParams: { a: area }
  }).json<{ meals: Meal[] }>();
  
  return data.meals || [];
};