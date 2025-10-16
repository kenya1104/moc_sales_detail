import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ShoppingBag, TrendingUp, Settings, Users, Building, UserCheck } from "lucide-react";

interface UserSelectionProps {
  onUserSelect: (userType: 'customer' | 'sales' | 'admin') => void;
}

export default function UserSelection({ onUserSelect }: UserSelectionProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl mb-4">営業管理システム</h1>
          <p className="text-muted-foreground mb-2">
            ご利用される機能を選択してください
          </p>
          <Badge variant="outline">v1.0</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onUserSelect('customer')}>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-lg">得意先様向け</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                青果カタログの閲覧、品種・価格・産地情報の確認ができます
              </p>
              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>商品カタログ閲覧</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span>価格・在庫確認</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <UserCheck className="w-4 h-4" />
                  <span>お問い合わせ</span>
                </div>
              </div>
              <Button className="w-full" onClick={() => onUserSelect('customer')}>
                青果カタログを見る
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onUserSelect('sales')}>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-lg">営業担当者向け</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                商談・引合の管理、進捗追跡、顧客情報の管理ができます
              </p>
              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>商談進捗管理</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>顧客情報管理</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <UserCheck className="w-4 h-4" />
                  <span>売上予測</span>
                </div>
              </div>
              <Button className="w-full" onClick={() => onUserSelect('sales')}>
                商談管理画面へ
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onUserSelect('admin')}>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Settings className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-lg">管理者向け</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                青果商品の管理、価格設定、産地・出荷時期の管理ができます
              </p>
              <div className="space-y-2 text-sm text-muted-foreground mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>商品情報管理</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span>価格・産地管理</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <UserCheck className="w-4 h-4" />
                  <span>システム設定</span>
                </div>
              </div>
              <Button className="w-full" onClick={() => onUserSelect('admin')}>
                管理画面へ
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>各機能は認証済みユーザーのみご利用いただけます</p>
        </div>
      </div>
    </div>
  );
}