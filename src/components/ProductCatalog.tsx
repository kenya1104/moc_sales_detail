import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search, ShoppingCart, Star, MapPin, Calendar } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import ProductDetail from "./ProductDetail";

interface Product {
  id: string;
  variety: string; // 品種名
  price: number;
  description: string;
  category: string; // 野菜・果物の一般名称
  rating: number;
  reviews: number;
  available: boolean; // 在庫ではなく出荷可能かどうか
  imageUrl: string;
  origin: string; // 産地
  season: string; // 出荷時期
}

const catalogProducts: Product[] = [
  {
    id: "1",
    variety: "ふじ",
    price: 380,
    description: "甘みと酸味のバランスが良い定番品種。シャキシャキとした食感で日持ちも良好です。",
    category: "りんご",
    rating: 4.5,
    reviews: 128,
    available: true,
    imageUrl: "fresh red apples fruit",
    origin: "青森県",
    season: "11月〜2月"
  },
  {
    id: "2",
    variety: "章姫",
    price: 580,
    description: "大粒で甘みが強く、果汁たっぷりの高級いちご。そのまま食べても美味しい。",
    category: "いちご",
    rating: 4.7,
    reviews: 89,
    available: true,
    imageUrl: "fresh strawberries fruit",
    origin: "静岡県",
    season: "12月〜4月"
  },
  {
    id: "3",
    variety: "グリーンリーフ",
    price: 180,
    description: "シャキシャキとした食感で瑞々しい。サラダに最適な新鮮レタス。",
    category: "レタス",
    rating: 4.3,
    reviews: 56,
    available: true,
    imageUrl: "fresh lettuce vegetables",
    origin: "長野県",
    season: "通年"
  },
  {
    id: "4",
    variety: "桃太郎",
    price: 280,
    description: "甘みと酸味のバランスが良い大玉トマト。そのまま食べても調理にも適している。",
    category: "トマト",
    rating: 4.1,
    reviews: 34,
    available: true,
    imageUrl: "fresh tomatoes vegetables",
    origin: "熊本県",
    season: "6月〜9月"
  },
  {
    id: "5",
    variety: "シャインマスカット",
    price: 1280,
    description: "種なしで皮ごと食べられる高級ぶどう。上品な甘さと爽やかな香り。",
    category: "ぶどう",
    rating: 4.8,
    reviews: 92,
    available: false,
    imageUrl: "fresh grapes green fruit",
    origin: "山梨県",
    season: "8月〜10月"
  },
  {
    id: "6",
    variety: "加賀太きゅうり",
    price: 220,
    description: "太くて短い特徴的な形のきゅうり。肉厚でみずみずしく、歯ごたえ抜群。",
    category: "きゅうり",
    rating: 4.4,
    reviews: 67,
    available: true,
    imageUrl: "fresh cucumber vegetables",
    origin: "石川県",
    season: "7月〜9月"
  }
];

export default function ProductCatalog() {
  const [products] = useState<Product[]>(catalogProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [sortBy, setSortBy] = useState("variety");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const categories = [
    "すべて", "りんご", "みかん", "いちご", "ぶどう", "もも", "なし", 
    "トマト", "きゅうり", "なす", "ピーマン", "レタス", "キャベツ"
  ];

  const filteredProducts = products
    .filter(product => 
      product.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product => 
      selectedCategory === "すべて" || product.category === selectedCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return a.variety.localeCompare(b.variety);
      }
    });

  // Show detail view if a product is selected
  if (selectedProductId) {
    return (
      <ProductDetail
        productId={selectedProductId}
        onBack={() => setSelectedProductId(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2>青果カタログ</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="品種・カテゴリを検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="variety">品種名順</SelectItem>
              <SelectItem value="price-low">価格（安い順）</SelectItem>
              <SelectItem value="price-high">価格（高い順）</SelectItem>
              <SelectItem value="rating">評価順</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card 
            key={product.id} 
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedProductId(product.id)}
          >
            <div className="aspect-video bg-muted relative">
              <ImageWithFallback
                src={`https://images.unsplash.com/400x300/?${product.imageUrl}`}
                alt={product.variety}
                className="w-full h-full object-cover"
              />
              {!product.available && (
                <div className="absolute top-2 right-2">
                  <Badge variant="destructive">出荷停止中</Badge>
                </div>
              )}
            </div>
            
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{product.variety}</CardTitle>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews}件)
                </span>
              </div>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{product.origin}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{product.season}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {product.description}
              </p>
              
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xl">
                    ¥{product.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">/kg</span>
                </div>
                <Button 
                  disabled={!product.available}
                  variant={product.available ? "default" : "secondary"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProductId(product.id);
                  }}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.available ? "詳細を見る" : "出荷停止中"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">該当する商品が見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
}