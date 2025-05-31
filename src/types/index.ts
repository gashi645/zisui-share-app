export interface User {
  id: string;
  username: string;
  profileImage?: string;
  bio?: string;
  createdAt: Date;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ingredients: Ingredient[];
  steps: Step[];
  category: Category;
  authorId: string;
  createdAt: Date;
  likes: string[]; // Array of user IDs who liked the recipe
}

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
}

export interface Step {
  id: string;
  order: number;
  description: string;
  imageUrl?: string;
}

export type Category = 'japanese' | 'western' | 'chinese' | 'dessert' | 'other';

export type SortOption = 'popular' | 'newest';

export interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface RecipeContextType {
  recipes: Recipe[];
  likeRecipe: (recipeId: string, userId: string) => void;
  unlikeRecipe: (recipeId: string, userId: string) => void;
  addRecipe: (recipe: Omit<Recipe, 'id' | 'createdAt' | 'likes'>) => void;
  getRecipeById: (id: string) => Recipe | undefined;
  getUserRecipes: (userId: string) => Recipe[];
  getUserLikedRecipes: (userId: string) => Recipe[];
  filterRecipes: (query: string, category?: Category, sortBy?: SortOption) => Recipe[];
}