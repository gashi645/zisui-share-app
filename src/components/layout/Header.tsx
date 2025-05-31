import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, UserCircle, LogOut, PlusCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-orange-500">自炊レシピ</span>
          </Link>

          {/* Search on larger screens */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="料理名や材料で検索..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Navigation for larger screens */}
          <nav className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/new-recipe">
                  <Button variant="primary\" size="sm\" className="flex items-center gap-1">
                    <PlusCircle size={18} />
                    レシピ投稿
                  </Button>
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-orange-500">
                    <UserCircle size={24} />
                    <span>{currentUser?.username}</span>
                  </button>
                  <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                    >
                      マイプロフィール
                    </Link>
                    <Link
                      to="/my-recipes"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                    >
                      投稿したレシピ
                    </Link>
                    <Link
                      to="/liked-recipes"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                    >
                      いいねしたレシピ
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50"
                    >
                      ログアウト
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined" size="sm">
                    ログイン
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    新規登録
                  </Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 hover:text-orange-500 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {/* Search on mobile */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="料理名や材料で検索..."
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            <div className="space-y-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="block py-2 text-gray-700 hover:text-orange-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <UserCircle size={20} />
                      <span>{currentUser?.username}</span>
                    </div>
                  </Link>
                  <Link
                    to="/new-recipe"
                    className="block py-2 text-gray-700 hover:text-orange-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <PlusCircle size={20} />
                      <span>レシピ投稿</span>
                    </div>
                  </Link>
                  <Link
                    to="/my-recipes"
                    className="block py-2 text-gray-700 hover:text-orange-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    投稿したレシピ
                  </Link>
                  <Link
                    to="/liked-recipes"
                    className="block py-2 text-gray-700 hover:text-orange-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    いいねしたレシピ
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left py-2 text-gray-700 hover:text-orange-500"
                  >
                    <LogOut size={20} />
                    <span>ログアウト</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block py-2 text-gray-700 hover:text-orange-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ログイン
                  </Link>
                  <Link
                    to="/register"
                    className="block py-2 text-gray-700 hover:text-orange-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    新規登録
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;