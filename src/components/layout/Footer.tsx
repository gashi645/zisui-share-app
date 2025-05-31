import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">自炊レシピ</h3>
            <p className="text-gray-300">
              自炊料理の写真とレシピを共有するコミュニティ
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">コンテンツ</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  ホーム
                </Link>
              </li>
              <li>
                <Link to="/popular" className="text-gray-300 hover:text-white">
                  人気レシピ
                </Link>
              </li>
              <li>
                <Link to="/latest" className="text-gray-300 hover:text-white">
                  新着レシピ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">カテゴリー</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/category/japanese" className="text-gray-300 hover:text-white">
                  和食
                </Link>
              </li>
              <li>
                <Link to="/category/western" className="text-gray-300 hover:text-white">
                  洋食
                </Link>
              </li>
              <li>
                <Link to="/category/chinese" className="text-gray-300 hover:text-white">
                  中華
                </Link>
              </li>
              <li>
                <Link to="/category/dessert" className="text-gray-300 hover:text-white">
                  デザート
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">アカウント</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white">
                  ログイン
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white">
                  新規登録
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} 自炊レシピ All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;