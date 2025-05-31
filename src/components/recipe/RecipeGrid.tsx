import React from 'react';
import { Recipe } from '../../types';
import RecipeCard from './RecipeCard';

interface RecipeGridProps {
  recipes: Recipe[];
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes }) => {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">レシピが見つかりませんでした。</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.map(recipe => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeGrid;