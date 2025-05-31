import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Pencil } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRecipes } from '../context/RecipeContext';
import Button from '../components/common/Button';
import RecipeGrid from '../components/recipe/RecipeGrid';

const UserProfilePage: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { getUserRecipes } = useRecipes();
  const navigate = useNavigate();
  
  if (!isAuthenticated || !currentUser) {
    navigate('/login');
    return null;
  }
  
  const userRecipes = getUserRecipes(currentUser.id);
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-32"></div>
          
          <div className="px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-end -mt-16 mb-4">
              <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-white">
                {currentUser.profileImage ? (
                  <img 
                    src={currentUser.profileImage} 
                    alt={currentUser.username} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-full h-full p-4 text-gray-300" />
                )}
              </div>
              
              <div className="md:ml-4 mt-4 md:mt-0">
                <h1 className="text-2xl font-bold">{currentUser.username}</h1>
                <p className="text-gray-500 text-sm">
                  登録日: {new Date(currentUser.createdAt).toLocaleDateString('ja-JP')}
                </p>
              </div>
              
              <div className="md:ml-auto mt-4 md:mt-0">
                <Button
                  variant="outlined"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Pencil size={16} />
                  プロフィール編集
                </Button>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-4">
              <p className="text-gray-700">
                {currentUser.bio || 'プロフィールはまだ設定されていません。'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">投稿したレシピ</h2>
            <Link to="/new-recipe">
              <Button variant="primary" size="sm">
                新しいレシピを投稿
              </Button>
            </Link>
          </div>
          
          {userRecipes.length > 0 ? (
            <RecipeGrid recipes={userRecipes} />
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 mb-4">まだレシピを投稿していません。</p>
              <Link to="/new-recipe">
                <Button>
                  最初のレシピを投稿する
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;