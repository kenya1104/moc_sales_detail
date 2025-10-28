import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { LogOut, User, ShoppingBag, Calendar, MapPin } from "lucide-react";
import MaterialCatalog from "./MaterialCatalog";
import MaterialCalendar from "./MaterialCalendar";
import MaterialDetail from "./MaterialDetail";

interface CustomerDashboardProps {
  onLogout: () => void;
}

type ViewType = "catalog" | "calendar" | "detail";

export default function CustomerDashboard({ onLogout }: CustomerDashboardProps) {
  const [activeView, setActiveView] = useState<ViewType>("catalog");
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);

  const handleShowDetail = (materialId: string) => {
    setSelectedMaterialId(materialId);
    setActiveView("detail");
  };

  const handleBack = () => {
    setActiveView("catalog");
  };

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
        {/* ナビゲーションボタン */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeView === "catalog" ? "default" : "outline"}
            onClick={() => setActiveView("catalog")}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            産地カタログ
          </Button>
          <Button
            variant={activeView === "calendar" ? "default" : "outline"}
            onClick={() => setActiveView("calendar")}
          >
            <Calendar className="w-4 h-4 mr-2" />
            産地カレンダー
          </Button>
          {activeView === "detail" && (
            <Button
              variant="default"
              className="flex items-center"
            >
              <MapPin className="w-4 h-4 mr-2" />
              産地詳細
            </Button>
          )}
        </div>

        {/* ビューの表示 */}
        <div className="space-y-6">
          {activeView === "catalog" && (
            <>
              <div className="border-l-4 border-blue-500 pl-4">
                <h2>産地カタログ</h2>
                <p className="text-sm text-muted-foreground">
                  青果の品目×産地ごとの一覧
                </p>
              </div>
              <MaterialCatalog onSelectMaterial={handleShowDetail} />
            </>
          )}

          {activeView === "calendar" && (
            <>
              <div className="border-l-4 border-green-500 pl-4">
                <h2>産地カレンダー</h2>
                <p className="text-sm text-muted-foreground">
                  青果の品目×産地ごとの年間出荷スケジュール
                </p>
              </div>
              <MaterialCalendar onSelectMaterial={handleShowDetail} />
            </>
          )}

          {activeView === "detail" && selectedMaterialId && (
            <>
              <div className="border-l-4 border-orange-500 pl-4">
                <h2>産地詳細</h2>
                <p className="text-sm text-muted-foreground">
                  産地の詳細情報や商品一覧
                </p>
              </div>
              <MaterialDetail 
                materialId={selectedMaterialId} 
                onBack={handleBack} 
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}