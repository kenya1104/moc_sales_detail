import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Trash2, Edit, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

interface Product {
  id: string;
  variety: string; // 品種名
  price: number;
  category: string; // 野菜の一般名称
  description: string;
  origin: string; // 産地
  season: string; // 出荷時期
}

const initialProducts: Product[] = [
  { 
    id: "1", 
    variety: "ふじ", 
    price: 380, 
    category: "りんご", 
    description: "甘みと酸味のバランスが良い定番品種", 
    origin: "青森県",
    season: "11月〜2月"
  },
  { 
    id: "2", 
    variety: "章姫", 
    price: 580, 
    category: "いちご", 
    description: "大粒で甘みが強く、果汁たっぷり", 
    origin: "静岡県",
    season: "12月〜4月"
  },
  { 
    id: "3", 
    variety: "レタス", 
    price: 180, 
    category: "レタス", 
    description: "シャキシャキとした食感で瑞々しい", 
    origin: "長野県",
    season: "通年"
  },
  { 
    id: "4", 
    variety: "桃太郎", 
    price: 280, 
    category: "トマト", 
    description: "甘みと酸味のバランスが良い大玉トマト", 
    origin: "熊本県",
    season: "6月〜9月"
  },
];

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    variety: "",
    price: "",
    category: "",
    description: "",
    origin: "",
    season: "",
  });

  const categories = [
    "りんご", "みかん", "いちご", "ぶどう", "もも", "なし", "バナナ", "キウイ",
    "トマト", "きゅうり", "なす", "ピーマン", "レタス", "キャベツ", "白菜", "大根",
    "にんじん", "たまねぎ", "じゃがいも", "さつまいも", "ほうれん草", "小松菜", "その他"
  ];

  const handleSave = () => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...editingProduct, ...formData, price: Number(formData.price) }
          : p
      ));
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        variety: formData.variety,
        price: Number(formData.price),
        category: formData.category,
        description: formData.description,
        origin: formData.origin,
        season: formData.season,
      };
      setProducts([...products, newProduct]);
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      variety: product.variety,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      origin: product.origin,
      season: product.season,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const resetForm = () => {
    setFormData({ variety: "", price: "", category: "", description: "", origin: "", season: "" });
    setEditingProduct(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2>青果商品管理</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4 mr-2" />
              商品追加
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "商品編集" : "商品追加"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="variety">品種名</Label>
                <Input
                  id="variety"
                  value={formData.variety}
                  onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                  placeholder="例：ふじ、章姫、桃太郎"
                />
              </div>
              <div>
                <Label htmlFor="category">カテゴリ（野菜・果物名）</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="カテゴリを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price">単価（円/kg）</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="origin">産地</Label>
                <Input
                  id="origin"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  placeholder="例：青森県、静岡県"
                />
              </div>
              <div>
                <Label htmlFor="season">出荷時期</Label>
                <Input
                  id="season"
                  value={formData.season}
                  onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                  placeholder="例：11月〜2月、通年"
                />
              </div>
              <div>
                <Label htmlFor="description">商品説明</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="商品の特徴や味の説明"
                />
              </div>
              <Button onClick={handleSave} className="w-full">
                {editingProduct ? "更新" : "追加"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>商品一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>品種名</TableHead>
                <TableHead>カテゴリ</TableHead>
                <TableHead>単価（円/kg）</TableHead>
                <TableHead>産地</TableHead>
                <TableHead>出荷時期</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.variety}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>¥{product.price.toLocaleString()}</TableCell>
                  <TableCell>{product.origin}</TableCell>
                  <TableCell>{product.season}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}