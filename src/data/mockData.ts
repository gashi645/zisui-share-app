import { User, Recipe, Category } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'tanaka_chef',
    profileImage: 'https://images.pexels.com/photos/3771118/pexels-photo-3771118.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: '普段は会社員。週末は料理を楽しんでいます。',
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    username: 'sato_cooking',
    profileImage: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: '簡単で美味しいレシピを投稿します！',
    createdAt: new Date('2023-02-20')
  },
  {
    id: '3',
    username: 'yamada_foods',
    profileImage: 'https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: '伝統的な和食からモダンな料理まで',
    createdAt: new Date('2023-03-10')
  }
];

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: '簡単肉じゃが',
    description: '忙しい平日でも作れる、定番の肉じゃがレシピです。',
    imageUrl: 'https://images.pexels.com/photos/5908226/pexels-photo-5908226.jpeg?auto=compress&cs=tinysrgb&w=800',
    ingredients: [
      { id: '1-1', name: '牛肉（切り落とし）', amount: '200g' },
      { id: '1-2', name: 'じゃがいも', amount: '3個' },
      { id: '1-3', name: 'にんじん', amount: '1本' },
      { id: '1-4', name: '玉ねぎ', amount: '1個' },
      { id: '1-5', name: '砂糖', amount: '大さじ2' },
      { id: '1-6', name: '醤油', amount: '大さじ3' },
      { id: '1-7', name: 'みりん', amount: '大さじ2' }
    ],
    steps: [
      { id: '1-s1', order: 1, description: 'じゃがいも、にんじん、玉ねぎを一口大に切る' },
      { id: '1-s2', order: 2, description: '鍋に油をひき、牛肉を炒める' },
      { id: '1-s3', order: 3, description: '野菜を加えて炒め、水を加える' },
      { id: '1-s4', order: 4, description: '調味料を加えて煮込む' },
      { id: '1-s5', order: 5, description: '野菜が柔らかくなったら完成' }
    ],
    category: 'japanese',
    authorId: '1',
    createdAt: new Date('2023-05-15'),
    likes: ['2', '3']
  },
  {
    id: '2',
    title: 'クリームパスタ',
    description: '濃厚なクリームソースが絶品のパスタです。',
    imageUrl: 'https://images.pexels.com/photos/5949887/pexels-photo-5949887.jpeg?auto=compress&cs=tinysrgb&w=800',
    ingredients: [
      { id: '2-1', name: 'パスタ', amount: '200g' },
      { id: '2-2', name: '生クリーム', amount: '200ml' },
      { id: '2-3', name: 'ベーコン', amount: '100g' },
      { id: '2-4', name: 'にんにく', amount: '1片' },
      { id: '2-5', name: '塩・こしょう', amount: '適量' },
      { id: '2-6', name: 'パルメザンチーズ', amount: '適量' }
    ],
    steps: [
      { id: '2-s1', order: 1, description: 'パスタを表示時間通りに茹でる' },
      { id: '2-s2', order: 2, description: 'フライパンにオリーブオイルとにんにくを入れて香りを出す' },
      { id: '2-s3', order: 3, description: 'ベーコンを加えて炒める' },
      { id: '2-s4', order: 4, description: '生クリームを加えて温める' },
      { id: '2-s5', order: 5, description: '茹で上がったパスタを加えて絡める' },
      { id: '2-s6', order: 6, description: '塩・こしょうで味を調え、チーズをかけて完成' }
    ],
    category: 'western',
    authorId: '2',
    createdAt: new Date('2023-06-10'),
    likes: ['1']
  },
  {
    id: '3',
    title: '基本のパンケーキ',
    description: 'ふわふわ食感の美味しいパンケーキです。',
    imageUrl: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=800',
    ingredients: [
      { id: '3-1', name: '薄力粉', amount: '150g' },
      { id: '3-2', name: '卵', amount: '2個' },
      { id: '3-3', name: '牛乳', amount: '200ml' },
      { id: '3-4', name: 'ベーキングパウダー', amount: '小さじ2' },
      { id: '3-5', name: '砂糖', amount: '大さじ2' },
      { id: '3-6', name: '塩', amount: 'ひとつまみ' },
      { id: '3-7', name: 'バター', amount: '20g' }
    ],
    steps: [
      { id: '3-s1', order: 1, description: 'ボウルに卵を割り入れ、砂糖と塩を加えて混ぜる' },
      { id: '3-s2', order: 2, description: '牛乳を加えて混ぜる' },
      { id: '3-s3', order: 3, description: '薄力粉とベーキングパウダーをふるい入れ、さっくり混ぜる' },
      { id: '3-s4', order: 4, description: 'フライパンを中火で熱し、バターを溶かす' },
      { id: '3-s5', order: 5, description: '生地を流し入れ、表面に泡が出てきたらひっくり返す' },
      { id: '3-s6', order: 6, description: '両面がきつね色になったら完成' }
    ],
    category: 'dessert',
    authorId: '3',
    createdAt: new Date('2023-07-20'),
    likes: ['1', '2']
  },
  {
    id: '4',
    title: '本格麻婆豆腐',
    description: '辛さと旨みが絶妙な本格麻婆豆腐レシピ',
    imageUrl: 'https://images.pexels.com/photos/5622835/pexels-photo-5622835.jpeg?auto=compress&cs=tinysrgb&w=800',
    ingredients: [
      { id: '4-1', name: '木綿豆腐', amount: '1丁' },
      { id: '4-2', name: '豚ひき肉', amount: '200g' },
      { id: '4-3', name: '長ねぎ', amount: '1本' },
      { id: '4-4', name: 'にんにく', amount: '2片' },
      { id: '4-5', name: '生姜', amount: '1片' },
      { id: '4-6', name: '豆板醤', amount: '大さじ1' },
      { id: '4-7', name: '甜麺醤', amount: '大さじ1' },
      { id: '4-8', name: '醤油', amount: '大さじ2' },
      { id: '4-9', name: '鶏がらスープ', amount: '200ml' },
      { id: '4-10', name: '片栗粉', amount: '大さじ1' }
    ],
    steps: [
      { id: '4-s1', order: 1, description: '豆腐を一口大に切り、熱湯で2分ほど茹でて水気を切る' },
      { id: '4-s2', order: 2, description: 'にんにく、生姜、長ねぎをみじん切りにする' },
      { id: '4-s3', order: 3, description: '中華鍋に油を熱し、にんにく、生姜を炒める' },
      { id: '4-s4', order: 4, description: 'ひき肉を加えて炒め、色が変わったら豆板醤、甜麺醤を加える' },
      { id: '4-s5', order: 5, description: '鶏がらスープを加え、豆腐を入れて煮込む' },
      { id: '4-s6', order: 6, description: '水溶き片栗粉でとろみをつけ、長ねぎを散らして完成' }
    ],
    category: 'chinese',
    authorId: '1',
    createdAt: new Date('2023-08-05'),
    likes: ['2']
  }
];