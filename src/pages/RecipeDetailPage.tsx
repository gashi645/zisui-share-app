import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, Clock, ChevronLeft, User } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import { mockUsers } from '../data/mockData';

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecipeById, likeRecipe, unlikeRecipe } = useRecipes();
  const { currentUser, isAuthenticated } = useAuth();
  const [showLikes, setShowLikes] = useState(false);
  
  const recipe = getRecipeById(id || '');
  
  if (!recipe) {
    return <div className="container mx-auto px-4 py-8">レシピが見つかりませんでした。</div>;
  }
  
  const author = mockUsers.find(user => user.id === recipe.authorId);
  const isLiked = currentUser ? recipe.likes.includes(currentUser.id) : false;
  
  const handleLike = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (isLiked) {
      unlikeRecipe(recipe.id, currentUser!.id);
    } else {
      likeRecipe(recipe.id, currentUser!.id);
    }
  };
  
  const toggleLikes = () => {
    setShowLikes(!showLikes);
  };
  
  const likedUsers = recipe.likes.map(userId => 
    mockUsers.find(user => user.id === userId)
  ).filter(Boolean);
  
  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      japanese: '和食',
      western: '洋食',
      chinese: '中華',
      dessert: 'デザート',
      other: 'その他'
    };
    return categories[category] || category;
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-orange-500 mb-4"
        >
          <ChevronLeft size={20} />
          <span>戻る</span>
        </button>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Recipe header */}
          <div className="relative">
            <img 
              src={recipe.imageUrl} 
              alt={recipe.title} 
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium">
              {getCategoryLabel(recipe.category)}
            </div>
          </div>
          
          <div className="p-6">
            {/* Title and actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h1 className="text-3xl font-bold mb-4 md:mb-0">{recipe.title}</h1>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 py-2 px-4 rounded-full border transition-colors ${
                    isLiked 
                      ? 'bg-red-50 border-red-500 text-red-500' 
                      : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={isLiked ? 'fill-red-500 text-red-500' : ''} size={20} />
                  <span>{recipe.likes.length}</span>
                </button>
              </div>
            </div>
            
            {/* Author and date */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 mr-3">
                  {author?.profileImage ? (
                    <img 
                      src={author.profileImage} 
                      alt={author.username} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-full h-full p-2 text-gray-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{author?.username || '不明なユーザー'}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(recipe.createdAt).toLocaleDateString('ja-JP')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center text-gray-500">
                <Clock size={18} className="mr-1" />
                <span className="text-sm">約20分</span>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-gray-700 mb-8">{recipe.description}</p>
            
            {/* Likes */}
            {recipe.likes.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">いいね!</h3>
                  <button 
                    onClick={toggleLikes}
                    className="text-sm text-orange-500 hover:underline"
                  >
                    {showLikes ? '閉じる' : 'すべて表示'}
                  </button>
                </div>
                
                {showLikes ? (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    {likedUsers.map(user => user && (
                      <div key={user.id} className="flex items-center py-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 mr-3">
                          {user.profileImage ? (
                            <img 
                              src={user.profileImage} 
                              alt={user.username} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-full h-full p-1 text-gray-500" />
                          )}
                        </div>
                        <span>{user.username}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex -space-x-2">
                    {likedUsers.slice(0, 3).map(user => user && (
                      <div key={user.id} className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                        {user.profileImage ? (
                          <img 
                            src={user.profileImage} 
                            alt={user.username} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <User size={16} className="text-gray-500" />
                          </div>
                        )}
                      </div>
                    ))}
                    {recipe.likes.length > 3 && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs">
                        +{recipe.likes.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {/* Ingredients */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">材料</h2>
              <div className="bg-orange-50 rounded-lg p-4">
                <ul className="divide-y divide-orange-100">
                  {recipe.ingredients.map(ingredient => (
                    <li key={ingredient.id} className="py-2 flex justify-between">
                      <span>{ingredient.name}</span>
                      <span className="text-gray-600">{ingredient.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Steps */}
            <div>
              <h2 className="text-xl font-bold mb-4">作り方</h2>
              <ol className="space-y-6">
                {recipe.steps.map(step => (
                  <li key={step.id} className="flex">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center mr-4 flex-shrink-0">
                      {step.order}
                    </div>
                    <div>
                      <p className="text-gray-700">{step.description}</p>
                      {step.imageUrl && (
                        <img 
                          src={step.imageUrl} 
                          alt={`Step ${step.order}`} 
                          className="mt-2 rounded-lg max-w-xs"
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            
            {/* Action buttons */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={handleLike}
                className="flex items-center justify-center gap-2"
                fullWidth
              >
                <Heart className={isLiked ? 'fill-white' : ''} size={20} />
                <span>{isLiked ? 'いいね済み' : 'いいね'}</span>
              </Button>
              
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                fullWidth
              >
                他のレシピを見る
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;