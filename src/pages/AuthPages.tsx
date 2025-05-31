import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('ログインに失敗しました。ユーザー名またはパスワードが正しくありません。');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">ログイン</h2>
          <p className="mt-2 text-sm text-gray-600">
            アカウントをお持ちでない方は
            <Link to="/register" className="font-medium text-orange-500 hover:text-orange-600">
              新規登録
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">{error}</div>
          )}
          
          <div className="space-y-4">
            <Input
              label="ユーザー名"
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            
            <Input
              label="パスワード"
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </div>
          
          <div>
            <Button type="submit" fullWidth>
              ログイン
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            テスト用アカウント: username=tanaka_chef, password=任意
          </div>
        </form>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('パスワードが一致しません。');
      return;
    }
    
    try {
      await register(username, password);
      navigate('/');
    } catch (err) {
      setError('登録に失敗しました。ユーザー名がすでに使用されているか、入力情報が不正です。');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">新規登録</h2>
          <p className="mt-2 text-sm text-gray-600">
            すでにアカウントをお持ちの方は
            <Link to="/login" className="font-medium text-orange-500 hover:text-orange-600">
              ログイン
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">{error}</div>
          )}
          
          <div className="space-y-4">
            <Input
              label="ユーザー名"
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
            
            <Input
              label="パスワード"
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            
            <Input
              label="パスワード（確認）"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
            />
          </div>
          
          <div>
            <Button type="submit" fullWidth>
              登録する
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};