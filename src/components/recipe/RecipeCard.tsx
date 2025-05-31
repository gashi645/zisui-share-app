import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Recipe } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useRecipes } from '../../context/RecipeContext';
import Card from '../common/Card';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { likeRecipe, unlikeRecipe } = useRecipes();
  
  const isLiked = currentUser ? recipe.likes.includes(currentUser.id) : false;
  
  const handleClick = () => {
    navigate(`/recipes/${recipe.id}`);
  };
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (isLiked) {
      unlikeRecipe(recipe.id, currentUser.id);
    } else {
      likeRecipe(recipe.id, currentUser.id);
    }
  };
  
  const getCategoryLabel = (category: Recipe['category']) => {
    const categories = {
      japanese: '和食',
      western: '洋食',
      chinese: '中華',
      dessert: 'デザート',
      other: 'その他'
    };
    return categories[category];
  };
  
  return (
    <Card className="h-full" onClick={handleClick}>
      <div className="relative">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white bg-opacity-80 px-2 py-1 rounded text-xs font-medium">
          {getCategoryLabel(recipe.category)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 line-clamp-1">{recipe.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {new Date(recipe.createdAt).toLocaleDateString('ja-JP')}
          </span>
          
          <button 
            onClick={handleLike}
            className="flex items-center gap-1 focus:outline-none"
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            <Heart 
              size={18} 
              className={`transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
            <span className="text-sm">{recipe.likes.length}</span>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default RecipeCard;