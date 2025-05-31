import React, { useState } from 'react';
import { Category, SortOption } from '../types';
import { useRecipes } from '../context/RecipeContext';
import RecipeGrid from '../components/recipe/RecipeGrid';
import RecipeFilters from '../components/recipe/RecipeFilters';

const HomePage: React.FC = () => {
  const { filterRecipes } = useRecipes();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  
  const handleFilter = (newQuery: string, newCategory?: Category, newSortBy?: SortOption) => {
    setQuery(newQuery);
    setCategory(newCategory);
    setSortBy(newSortBy || 'newest');
  };
  
  const filteredRecipes = filterRecipes(query, category, sortBy);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">あなたの料理を共有しよう</h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            自炊料理の写真を撮って、レシピを投稿。みんなと料理のアイデアを共有しましょう。
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <RecipeFilters onFilter={handleFilter} />
        
        {/* Featured categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">カテゴリーから探す</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'japanese', name: '和食', image: 'https://images.pexels.com/photos/8951199/pexels-photo-8951199.jpeg?auto=compress&cs=tinysrgb&w=300' },
              { id: 'western', name: '洋食', image: 'https://images.pexels.com/photos/5949887/pexels-photo-5949887.jpeg?auto=compress&cs=tinysrgb&w=300' },
              { id: 'chinese', name: '中華', image: 'https://images.pexels.com/photos/5622835/pexels-photo-5622835.jpeg?auto=compress&cs=tinysrgb&w=300' },
              { id: 'dessert', name: 'デザート', image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=300' },
            ].map(cat => (
              <div 
                key={cat.id}
                className="relative rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-shadow"
                onClick={() => handleFilter('', cat.id as Category, sortBy)}
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">{cat.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recipe grid */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {category ? `${query ? `「${query}」の` : ''}${getCategoryLabel(category)}のレシピ` : 
                query ? `「${query}」の検索結果` : 'すべてのレシピ'}
            </h2>
            <div className="text-sm text-gray-500">
              {filteredRecipes.length}件のレシピ
            </div>
          </div>
          
          <RecipeGrid recipes={filteredRecipes} />
        </div>
      </div>
    </div>
  );
};

// Helper function to get category label
const getCategoryLabel = (category: Category) => {
  const categories = {
    japanese: '和食',
    western: '洋食',
    chinese: '中華',
    dessert: 'デザート',
    other: 'その他'
  };
  return categories[category];
};

export default HomePage;