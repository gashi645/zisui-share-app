import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Recipe, RecipeContextType, Category, SortOption } from '../types';
import { mockRecipes } from '../data/mockData';

const RecipeContext = createContext<RecipeContextType | null>(null);

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);

  const likeRecipe = (recipeId: string, userId: string) => {
    setRecipes(prevRecipes =>
      prevRecipes.map(recipe => {
        if (recipe.id === recipeId && !recipe.likes.includes(userId)) {
          return { ...recipe, likes: [...recipe.likes, userId] };
        }
        return recipe;
      })
    );
  };

  const unlikeRecipe = (recipeId: string, userId: string) => {
    setRecipes(prevRecipes =>
      prevRecipes.map(recipe => {
        if (recipe.id === recipeId) {
          return { ...recipe, likes: recipe.likes.filter(id => id !== userId) };
        }
        return recipe;
      })
    );
  };

  const addRecipe = (recipeData: Omit<Recipe, 'id' | 'createdAt' | 'likes'>) => {
    const newRecipe: Recipe = {
      ...recipeData,
      id: `${recipes.length + 1}`,
      createdAt: new Date(),
      likes: [],
    };
    setRecipes(prevRecipes => [...prevRecipes, newRecipe]);
  };

  const getRecipeById = (id: string) => {
    return recipes.find(recipe => recipe.id === id);
  };

  const getUserRecipes = (userId: string) => {
    return recipes.filter(recipe => recipe.authorId === userId);
  };

  const getUserLikedRecipes = (userId: string) => {
    return recipes.filter(recipe => recipe.likes.includes(userId));
  };

  const filterRecipes = (query: string, category?: Category, sortBy: SortOption = 'newest') => {
    let filteredRecipes = [...recipes];
    
    // Filter by search query (title or ingredients)
    if (query) {
      const lowerQuery = query.toLowerCase();
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(lowerQuery) || 
        recipe.ingredients.some(ing => ing.name.toLowerCase().includes(lowerQuery))
      );
    }
    
    // Filter by category
    if (category) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.category === category);
    }
    
    // Sort by selected option
    if (sortBy === 'popular') {
      filteredRecipes.sort((a, b) => b.likes.length - a.likes.length);
    } else if (sortBy === 'newest') {
      filteredRecipes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    
    return filteredRecipes;
  };

  const value: RecipeContextType = {
    recipes,
    likeRecipe,
    unlikeRecipe,
    addRecipe,
    getRecipeById,
    getUserRecipes,
    getUserLikedRecipes,
    filterRecipes,
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
};