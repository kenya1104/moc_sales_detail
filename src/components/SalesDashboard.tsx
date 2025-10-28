import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { LogOut, User, TrendingUp } from "lucide-react";
import SalesManagement from "./SalesManagement";

interface SalesDashboardProps {
  onLogout: () => void;
}

export default function SalesDashboard({ onLogout }: SalesDashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <h1 className="text-2xl">営業管理システム</h1>
              </div>
              <Badge variant="outline">営業担当者</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>営業担当者</span>
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
        <div className="space-y-6">
          <div className="border-l-4 border-green-500 pl-4">
            <h2>商談・引合管理</h2>
            <p className="text-sm text-muted-foreground">
              商談の進捗管理、成約確度の追跡、顧客情報の管理ができます
            </p>
          </div>
          <SalesManagement />
        </div>
      </main>
    </div>
  );
}