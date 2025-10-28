import { useState, useMemo } from "react";
import { Input } from "./ui/input.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.tsx";
import { Badge } from "./ui/badge.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select.tsx";
import { Search, MapPin, Calendar } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback.tsx";
import type {Material} from "../types/type.ts";
import materialsData from "../data/materials.json";

interface MaterialCatalogProps {
  onSelectMaterial: (materialId: string) => void;
}

export default function MaterialCatalog({ onSelectMaterial }: MaterialCatalogProps) {
  // materials.jsonのデータをMaterial型に変換
  const catalogMaterials: Material[] = useMemo(() => {
    return materialsData.map((material) => ({
      id: material.id,
      origin: material.origin,
      category: material.category,
      variety: material.title,
      price: material.price,
      season: material.season,
      content: material.content,  
      growingMethod: material.growingMethod,
      appeals: material.deliverySet || [],
      imageUrl: material.category.toLowerCase(),
      available: true,
      description: material.producerGroup?.description || "",
    }));
  }, []);

  const [materials] = useState<Material[]>(catalogMaterials);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [sortBy, setSortBy] = useState("variety");

  const categories = [
    "すべて", "りんご", "みかん", "いちご", "ぶどう", "もも", "なし", 
    "トマト", "きゅうり", "なす", "ピーマン", "レタス", "キャベツ"
  ];

  const filteredMaterials = materials
    .filter(material => 
      material.variety.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (material.description && material.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      material.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(material => 
      selectedCategory === "すべて" || material.category === selectedCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return a.variety.localeCompare(b.variety);
      }
    });

  return (
    <div className="space-y-6">
      <div className="space-y-4">        
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
        {filteredMaterials.map((material) => (
          <Card 
            key={material.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelectMaterial(material.id)}
          >
            <div className="aspect-video bg-muted relative">
              <ImageWithFallback
                src={`https://images.unsplash.com/400x300/?${material.imageUrl}`}
                alt={material.variety}
                className="w-full h-full object-cover"
              />
              {!material.available && (
                <div className="absolute top-2 right-2">
                  <Badge variant="destructive">出荷停止中</Badge>
                </div>
              )}
            </div>
            
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{material.variety}</CardTitle>
                <Badge variant="outline">{material.category}</Badge>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{material.origin}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{material.season}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex justify-between items-center">
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">該当する商品が見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
}