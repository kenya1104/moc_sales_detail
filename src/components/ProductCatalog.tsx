import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search, ShoppingCart, Star, MapPin, Calendar } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import ProductDetail from "./ProductDetail";
import type {Product} from "../types/product.ts";


const catalogProducts: Product[] = [
  {
    id: "1",
    origin: "長野県",
    category: "ぶどう",
    variety: "クイーンリュージュ",
    price: 380,
    season: "10月〜11月",
    content: "長野県産 クイーンリュージュ 1房",
    growingMethod: "土壌",
    appeals: [],
    imageUrl: "fresh red apples fruit",
  },
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
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xl">
                    ¥{product.price.toLocaleString()}
                  </span>
                </div>
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