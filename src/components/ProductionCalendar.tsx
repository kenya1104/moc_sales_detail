import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar, MapPin, Package } from "lucide-react";

interface ProductionPeriod {
  startMonth: number;
  startPeriod: '上旬' | '中旬' | '下旬';
  endMonth: number;
  endPeriod: '上旬' | '中旬' | '下旬';
  totalVolume: number; // トン単位
}

interface Product {
  id: string;
  variety: string;
  category: string;
  origin: string;
  price: number;
  productionPeriods: ProductionPeriod[];
}

const calendarProducts: Product[] = [
  {
    id: "1",
    variety: "ふじ",
    category: "りんご",
    origin: "青森県",
    price: 380,
    productionPeriods: [
      {
        startMonth: 11,
        startPeriod: "上旬",
        endMonth: 2,
        endPeriod: "下旬",
        totalVolume: 1200
      }
    ]
  },
  {
    id: "2",
    variety: "章姫",
    category: "いちご",
    origin: "静岡県",
    price: 580,
    productionPeriods: [
      {
        startMonth: 12,
        startPeriod: "中旬",
        endMonth: 4,
        endPeriod: "上旬",
        totalVolume: 300
      }
    ]
  },
  {
    id: "3",
    variety: "グリーンリーフ",
    category: "レタス",
    origin: "長野県",
    price: 180,
    productionPeriods: [
      {
        startMonth: 1,
        startPeriod: "上旬",
        endMonth: 12,
        endPeriod: "下旬",
        totalVolume: 800
      }
    ]
  },
  {
    id: "4",
    variety: "桃太郎",
    category: "トマト",
    origin: "熊本県",
    price: 280,
    productionPeriods: [
      {
        startMonth: 6,
        startPeriod: "上旬",
        endMonth: 9,
        endPeriod: "下旬",
        totalVolume: 450
      }
    ]
  },
  {
    id: "5",
    variety: "シャインマスカット",
    category: "ぶどう",
    origin: "山梨県",
    price: 1280,
    productionPeriods: [
      {
        startMonth: 8,
        startPeriod: "上旬",
        endMonth: 10,
        endPeriod: "中旬",
        totalVolume: 150
      }
    ]
  },
  {
    id: "6",
    variety: "加賀太きゅうり",
    category: "きゅうり",
    origin: "石川県",
    price: 220,
    productionPeriods: [
      {
        startMonth: 7,
        startPeriod: "上旬",
        endMonth: 9,
        endPeriod: "上旬",
        totalVolume: 200
      }
    ]
  },
  {
    id: "7",
    variety: "王林",
    category: "りんご",
    origin: "青森県",
    price: 350,
    productionPeriods: [
      {
        startMonth: 10,
        startPeriod: "上旬",
        endMonth: 12,
        endPeriod: "上旬",
        totalVolume: 1000
      }
    ]
  },
  {
    id: "8",
    variety: "あまおう",
    category: "いちご",
    origin: "福岡県",
    price: 680,
    productionPeriods: [
      {
        startMonth: 1,
        startPeriod: "上旬",
        endMonth: 5,
        endPeriod: "下旬",
        totalVolume: 400
      }
    ]
  },
  {
    id: "9",
    variety: "白鳳",
    category: "もも",
    origin: "山梨県",
    price: 450,
    productionPeriods: [
      {
        startMonth: 7,
        startPeriod: "上旬",
        endMonth: 8,
        endPeriod: "下旬",
        totalVolume: 180
      }
    ]
  },
  {
    id: "10",
    variety: "夏すずみ",
    category: "きゅうり",
    origin: "群馬県",
    price: 200,
    productionPeriods: [
      {
        startMonth: 5,
        startPeriod: "上旬",
        endMonth: 8,
        endPeriod: "中旬",
        totalVolume: 350
      }
    ]
  },
  {
    id: "11",
    variety: "コシヒカリ新米",
    category: "米",
    origin: "新潟県",
    price: 520,
    productionPeriods: [
      {
        startMonth: 9,
        startPeriod: "中旬",
        endMonth: 10,
        endPeriod: "下旬",
        totalVolume: 2500
      }
    ]
  },
  {
    id: "12",
    variety: "みかん",
    category: "柑橘類",
    origin: "愛媛県",
    price: 320,
    productionPeriods: [
      {
        startMonth: 10,
        startPeriod: "下旬",
        endMonth: 12,
        endPeriod: "下旬",
        totalVolume: 800
      },
      {
        startMonth: 2,
        startPeriod: "上旬",
        endMonth: 3,
        endPeriod: "中旬",
        totalVolume: 200
      }
    ]
  }
];

const months = [
  '1月', '2月', '3月', '4月', '5月', '6月',
  '7月', '8月', '9月', '10月', '11月', '12月'
];

const periods = ['上旬', '中旬', '下旬'];

// 期間をインデックス（0-35）に変換
const periodToIndex = (month: number, period: '上旬' | '中旬' | '下旬'): number => {
  const monthIndex = month - 1;
  const periodIndex = periods.indexOf(period);
  return monthIndex * 3 + periodIndex;
};

// 出荷期間をインデックス配列に変換
const parseProductionPeriods = (productionPeriods: ProductionPeriod[]): Array<{ index: number; volume: number; periodInfo: ProductionPeriod }> => {
  const result: Array<{ index: number; volume: number; periodInfo: ProductionPeriod }> = [];
  
  productionPeriods.forEach(period => {
    const startIndex = periodToIndex(period.startMonth, period.startPeriod);
    const endIndex = periodToIndex(period.endMonth, period.endPeriod);
    
    let indices: number[] = [];
    if (startIndex <= endIndex) {
      // 年をまたがない場合
      indices = Array.from({ length: endIndex - startIndex + 1 }, (_, i) => startIndex + i);
    } else {
      // 年をまたぐ場合
      indices = [
        ...Array.from({ length: 36 - startIndex }, (_, i) => startIndex + i),
        ...Array.from({ length: endIndex + 1 }, (_, i) => i)
      ];
    }
    
    // 期間内の各インデックスに収量を分散
    const volumePerPeriod = period.totalVolume / indices.length;
    indices.forEach(index => {
      result.push({
        index,
        volume: volumePerPeriod,
        periodInfo: period
      });
    });
  });
  
  return result;
};

// カテゴリ別の基本色を定義
const getCategoryBaseColor = (category: string): string => {
  const colors: { [key: string]: string } = {
    'りんご': 'red',
    'いちご': 'pink',
    'ぶどう': 'purple',
    'もも': 'orange',
    'トマト': 'red',
    'きゅうり': 'green',
    'レタス': 'emerald',
    '米': 'yellow',
    '柑橘類': 'orange',
    'default': 'gray'
  };
  return colors[category] || colors.default;
};

// 収量に基づく色の濃淡を計算
const getVolumeIntensity = (volume: number, maxVolume: number): string => {
  const ratio = Math.max(0.2, Math.min(1, volume / maxVolume)); // 最小20%、最大100%
  if (ratio <= 0.3) return '100'; // 薄い
  if (ratio <= 0.6) return '300'; // 中間
  if (ratio <= 0.8) return '500'; // 濃い
  return '700'; // 最も濃い
};

export default function ProductionCalendar() {
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const [selectedOrigin, setSelectedOrigin] = useState("すべて");

  const categories = ["すべて", ...Array.from(new Set(calendarProducts.map(p => p.category)))];
  const origins = ["すべて", ...Array.from(new Set(calendarProducts.map(p => p.origin)))];

  const filteredProducts = calendarProducts.filter(product => {
    return (selectedCategory === "すべて" || product.category === selectedCategory) &&
           (selectedOrigin === "すべて" || product.origin === selectedOrigin);
  });

  // 全商品の最大収量を計算（色の濃淡計算用）
  const maxVolume = Math.max(
    ...filteredProducts.flatMap(product => 
      product.productionPeriods.map(period => period.totalVolume)
    )
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="カテゴリで絞り込み" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedOrigin} onValueChange={setSelectedOrigin}>
            <SelectTrigger>
              <SelectValue placeholder="産地で絞り込み" />
            </SelectTrigger>
            <SelectContent>
              {origins.map(origin => (
                <SelectItem key={origin} value={origin}>{origin}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>年間出荷スケジュール（上中下旬別）</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[1400px]">
              {/* ヘッダー行 */}
              <div className="grid grid-cols-[250px_repeat(36,1fr)] gap-1 mb-4">
                <div className="p-2 font-medium bg-muted rounded">商品情報</div>
                {months.map((month, monthIndex) => (
                  periods.map((period, periodIndex) => (
                    <div key={`${monthIndex}-${periodIndex}`} className="p-1 text-center text-xs bg-muted rounded">
                      <div>{month}</div>
                      <div className="text-xs opacity-70">{period}</div>
                    </div>
                  ))
                ))}
              </div>
              
              {/* 商品行 */}
              <div className="space-y-2">
                {filteredProducts.map((product) => {
                  const productionData = parseProductionPeriods(product.productionPeriods);
                  const baseColor = getCategoryBaseColor(product.category);
                  
                  return (
                    <div key={product.id} className="grid grid-cols-[250px_repeat(36,1fr)] gap-1 items-center">
                      {/* 商品情報 */}
                      <div className="p-3 bg-card border rounded">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Badge className={`bg-${baseColor}-100 text-${baseColor}-800`}>
                              {product.category}
                            </Badge>
                          </div>
                          <div className="text-sm">
                            {product.variety}
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{product.origin}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ¥{product.price}/kg
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Package className="w-3 h-3" />
                            <span>{product.productionPeriods.reduce((sum, period) => sum + period.totalVolume, 0)}トン</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* 期間ごとの出荷状況 */}
                      {Array.from({ length: 36 }, (_, index) => {
                        const periodData = productionData.find(data => data.index === index);
                        
                        return (
                          <div key={index} className="p-1 h-12 flex items-center justify-center">
                            {periodData && (
                              <div className="relative w-full h-8 rounded overflow-hidden group">
                                <div 
                                  className={`w-full h-full bg-${baseColor}-${getVolumeIntensity(periodData.volume, maxVolume)} 
                                             border border-current/20 rounded transition-all duration-200
                                             hover:scale-105 cursor-pointer`}
                                  title={`収量: ${periodData.volume.toFixed(1)}トン`}
                                >
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className={`w-1 h-1 bg-${baseColor}-900 rounded-full opacity-60`}></div>
                                  </div>
                                </div>
                                
                                {/* ツールチップ風の情報表示 */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                                               bg-black text-white text-xs rounded px-2 py-1 opacity-0 
                                               group-hover:opacity-100 transition-opacity duration-200 
                                               pointer-events-none z-10 whitespace-nowrap">
                                  収量: {periodData.volume.toFixed(1)}トン
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
              
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">該当する商品が見つかりませんでした。</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>凡例（カテゴリ）</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {categories.filter(c => c !== "すべて").map(category => {
                const baseColor = getCategoryBaseColor(category);
                return (
                  <div key={category} className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded bg-${baseColor}-300`}></div>
                    <span className="text-sm">{category}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>収量の濃淡</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>収量（トン）</span>
                <span>色の濃さ</span>
              </div>
              {[
                { range: '低収量', color: 'bg-gray-100', intensity: '100' },
                { range: '中収量', color: 'bg-gray-300', intensity: '300' },
                { range: '高収量', color: 'bg-gray-500', intensity: '500' },
                { range: '最高収量', color: 'bg-gray-700', intensity: '700' }
              ].map(item => (
                <div key={item.range} className="flex items-center justify-between">
                  <span className="text-sm">{item.range}</span>
                  <div className={`w-8 h-4 rounded ${item.color}`}></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}