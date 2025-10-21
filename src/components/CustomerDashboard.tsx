import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LogOut, User, ShoppingBag, Calendar } from "lucide-react";
import ProductCatalog from "./ProductCatalog";
import ProductionCalendar from "./ProductionCalendar";

interface CustomerDashboardProps {
  onLogout: () => void;
}

export default function CustomerDashboard({ onLogout }: CustomerDashboardProps) {
  const [activeTab, setActiveTab] = useState("catalog");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
                <h1 className="text-2xl">青果情報システム</h1>
              </div>
              <Badge variant="outline">得意先様</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>ゲスト様</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('ja-JP', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  weekday: 'long'
                })}
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                ログアウト
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="catalog" className="flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4" />
              <span>カタログ</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>産地カレンダー</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h2>カタログ</h2>
              <p className="text-sm text-muted-foreground">
                青果の産地情報や商品情報が確認できます
              </p>
            </div>
            <ProductCatalog />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h2>産地カレンダー</h2>
              <p className="text-sm text-muted-foreground">
                青果の年間出荷スケジュールをガントチャート形式で確認できます
              </p>
            </div>
            <ProductionCalendar />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}