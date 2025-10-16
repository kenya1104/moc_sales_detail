import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { LogOut, User, Settings } from "lucide-react";
import ProductManagement from "./ProductManagement";

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Settings className="w-6 h-6 text-purple-600" />
                <h1 className="text-2xl">青果管理システム</h1>
              </div>
              <Badge variant="outline">管理者</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>システム管理者</span>
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
          <div className="border-l-4 border-purple-500 pl-4">
            <h2>青果商品管理</h2>
            <p className="text-sm text-muted-foreground">
              青果の品種情報、価格、産地、出荷時期の管理ができます
            </p>
          </div>
          <ProductManagement />
        </div>
      </main>
    </div>
  );
}