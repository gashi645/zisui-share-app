import React, { useState } from 'react';
import { Category, SortOption } from '../../types';
import Input from '../common/Input';
import Button from '../common/Button';

interface RecipeFiltersProps {
  onFilter: (query: string, category?: Category, sortBy?: SortOption) => void;
}

const RecipeFilters: React.FC<RecipeFiltersProps> = ({ onFilter }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(query, category, sortBy);
  };

  const handleReset = () => {
    setQuery('');
    setCategory(undefined);
    setSortBy('newest');
    onFilter('', undefined, 'newest');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <Input
              type="text"
              placeholder="料理名や材料で検索"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              fullWidth
            />
          </div>

          <div>
            <select
              className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={category || ''}
              onChange={(e) => setCategory(e.target.value as Category || undefined)}
            >
              <option value="">すべてのカテゴリー</option>
              <option value="japanese">和食</option>
              <option value="western">洋食</option>
              <option value="chinese">中華</option>
              <option value="dessert">デザート</option>
              <option value="other">その他</option>
            </select>
          </div>

          <div>
            <select
              className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="popular">人気順</option>
              <option value="newest">新着順</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <Button type="button" variant="outlined" onClick={handleReset}>
            リセット
          </Button>
          <Button type="submit">
            検索
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RecipeFilters;