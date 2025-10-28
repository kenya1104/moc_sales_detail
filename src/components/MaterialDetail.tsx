import { useState } from "react";
import { Button } from "./ui/button.tsx";
import { Card } from "./ui/card.tsx";
import { Badge } from "./ui/badge.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs.tsx";
import {
  MapPin,
  ArrowLeft,
  Download,
  ExternalLink,
} from "lucide-react";
import { Separator } from "./ui/separator.tsx";
import type {
  MaterialDetailProps,
  MaterialCharacteristics,
  MaterialOriginCharacteristics,
  MaterialGrowingCharacteristics,
} from "../types/type.ts";

import materialsData from "../data/materials.json";
import MaterialDetailProducts from "./MaterialDetailProducts.tsx";
import MaterialDetailImages from "./MaterialDetailImages.tsx";
import salesHistoriesData from "../data/sales-hisotries.json";
import salesContentsData from "../data/sales-contents.json";
import SalesRecodrDetail from "./SalesRecordDetail.tsx";



export default function MaterialDetail({
  materialId,
  onBack,
}: MaterialDetailProps) {
  const [showSalesDetail, setShowSalesDetail] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  // サンプルデータ
  const materialDataItem = materialsData.find(m => m.id === materialId);
  console.log(materialDataItem);
  
  if (!materialDataItem) {
    return <div>商品が見つかりません</div>;
  }

  // 販売実績データを取得
  const salesHistory = (salesHistoriesData as any).materialId === materialId 
    ? (salesHistoriesData as any).salesHistory || []
    : [];
  
  const material = {
    id: materialId,
    title: materialDataItem.title,
    origin: materialDataItem.origin,
    category: materialDataItem.category,
    varieties: materialDataItem.varieties,
    price: materialDataItem.price,
    season: materialDataItem.season,
    content: materialDataItem.content,
    growingMethod: materialDataItem.growingMethod,
    deliverySet: materialDataItem.deliverySet,
    producerGroup: materialDataItem.producerGroup,
    materialCharacteristics: materialDataItem.materialCharacteristics,
    materialOriginCharacteristics: materialDataItem.materialOriginCharacteristics,
    materialGrowingCharacteristics: materialDataItem.materialGrowingCharacteristics,
    salesHistory: salesHistory,
  };

  // 販売実績詳細画面を表示する場合
  if (showSalesDetail && selectedRecordId) {
    return (
      <div className="space-y-6 pb-12">
        <Button
          variant="ghost"
          onClick={() => {
            setShowSalesDetail(false);
            setSelectedRecordId(null);
          }}
          className="mb-4 text-base"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          商品詳細に戻る
        </Button>
        <SalesRecodrDetail recordId={selectedRecordId} onBack={() => {
          setShowSalesDetail(false);
          setSelectedRecordId(null);
        }} />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4 text-base"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        カタログに戻る
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div className="space-y-8">
          <MaterialDetailImages materialId={materialId} />
        </div>


        {/* Right Column - Product Info */}
        <div className="space-y-8">
          {/* Product Title */}
          <div>
            <h1 className="text-4xl mb-3">{material.title}</h1>
          </div>

          {/* Appeal Points */}
          <div className="space-y-4 bg-amber-50 p-4 rounded-lg">
            <h3 className="text-3xl text--600">アピールポイント</h3>
            <ul className="space-y-3">
              {material.deliverySet.map((item, index) => (
                <li key={index} className="text-2xl">{item}</li>
              ))}
            </ul>
          </div>


          <Separator />


          {/* SKU Lineup */}
          <MaterialDetailProducts 
            materialId={material.id}
            onBack={onBack}
          />

          {/* Tab area */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">商品</TabsTrigger>
              <TabsTrigger value="group">産地・栽培</TabsTrigger>
              <TabsTrigger value="sales">販売</TabsTrigger>
            </TabsList>

            {/* 商品特徴 */}
            <TabsContent
              value="description"
              className="mt-6 space-y-4"
            >
              <h3 className="text-2xl mb-4">商品の特徴</h3>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {material.materialCharacteristics.map((item: MaterialCharacteristics, index: number) => (
                  <Card key={index} className="p-6">
                    <div className="space-y-4">
                      <h5 className="text-2xl font-semibold">
                        {item.title}
                      </h5>
                      <p className="text-lg leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
              <Separator />

              <h3 className="text-2xl mb-4">商品詳細</h3>
              <div className="space-y-4">
              
                
              {/* Origin and Season */}
                <div>
                  <h4 className="text-xl mb-2">販売期間</h4>
                  <p className="text-base">
                    {material.season}
                  </p>
                </div>
                <Separator />

                <div>
                  <h4 className="text-xl mb-2">種別</h4>
                  <p className="text-base whitespace-pre-line">
                    {material.varieties}
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="text-xl mb-2">産地</h4>
                  <p className="text-base">
                    {material.origin}
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="text-xl mb-2">栽培方法</h4>
                  <p className="text-base">
                    {material.growingMethod}
                  </p>
                </div>

                <Separator />

              </div>
            </TabsContent>

            {/* 産地・栽培特徴 */}
            <TabsContent
              value="group"
              className="mt-6 space-y-4"
            >
              <h3 className="text-2xl mb-4">産地の特徴</h3>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {material.materialOriginCharacteristics.map((item: MaterialOriginCharacteristics, index: number) => (
                  <Card key={index} className="p-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              ))}
              </div>
              <Separator />

              <h3 className="text-2xl mb-4">栽培の特徴</h3>
              {/* Growing Method Card */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {material.materialGrowingCharacteristics.map((item: MaterialGrowingCharacteristics, index: number) => (
                  <Card key={index} className="p-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>

              <Separator />
              <h3 className="text-2xl mb-4">産地グループ</h3>
              {/* Producer Group Card */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <h3 className="text-2xl">
                      {material.producerGroup.name}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-muted-foreground">                       
                        <span className="text-base">
                          都道府県
                        </span>
                      </div>
                      <div className="text-xl">
                        {material.producerGroup.prefecture}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-base text-muted-foreground">
                        市区町村
                      </div>
                      <div className="text-xl">
                        {material.producerGroup.city}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-base text-muted-foreground">
                        構成員数
                      </div>
                      <div className="text-xl">
                        {material.producerGroup.memberCount}名
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-base text-muted-foreground">
                        圃場面積
                      </div>
                      <div className="text-xl">
                        {material.producerGroup.farmArea}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-base text-muted-foreground"> 生産者コメント</p>
                      <p className="text-base leading-relaxed">
                        {material.producerGroup.description}
                      </p>
                  </div>

                </div>
            </TabsContent>

            {/* 販売実績 */}
            <TabsContent
              value="sales"
              className="mt-6 space-y-4"
            >

            {/* 実績（売場別） */}
            <h3 className="text-2xl mb-4">販売実績</h3>
              {salesHistory.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  {salesHistory.map((history: any, index: number) => (
                    <Card 
                      key={index} 
                      className="p-8 cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => {
                        if (history.id && history.distributionPhases) {
                          setSelectedRecordId(history.id);
                          setShowSalesDetail(true);
                        }
                      }}
                     >
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold">
                        {history.retail_name}
                      </h3>
                      <div className="space-y-2">
                        <p className="text-base leading-relaxed">
                          販売期間：{history.start_date} ~ {history.end_date}
                        </p>
                        <p className="text-base leading-relaxed">
                          販売量：{history.total_quantity}
                        </p>
                        <p className="text-base leading-relaxed">
                          売場面積：{history.floor_area}
                        </p>
                        <p className="text-base leading-relaxed text-muted-foreground">
                          {history.description}
                        </p>
                      </div>
                      {history.distributionPhases && (
                        <p className="text-sm text-amber-600">
                          クリックして詳細を表示
                        </p>
                      )}
                    </div>

                  </Card>
                ))}
                </div>
              ) : (
                <Card className="p-8">
                  <p className="text-base text-muted-foreground text-center">
                    販売実績データはまだありません
                  </p>
                </Card>
              )}

            <Separator />

            {/* 販促 */}
            <h3 className="text-2xl mb-4">販促</h3>
            <p className="text-base text-muted-foreground mb-6">
              売場POPやHPなど、商品に関連するコンテンツを管理しています
            </p>

            {(() => {
              // materialIdに基づいてcontentsを取得
              const contents = (salesContentsData as any).materialId === materialId 
                ? ((salesContentsData as any).contents || [])
                : [];
              
              // salesHistoryからretail_nameを取得するためのマップ
              const historyMap = new Map(
                salesHistory.map((history: any) => [history.id, history.retail_name])
              );

              return contents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contents.map((content: any) => (
                    <Card
                      key={content.id}
                      className="p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div>
                            <h4 className="text-lg mb-1">{content.title}</h4>
                            <div className="flex items-center gap-3">
                              <Badge variant="outline" className="text-sm">
                                {content.type}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                作成日: {content.createdDate}
                              </span>
                            </div>
                            {content.recordId && historyMap.has(content.recordId) && (
                              <p className="text-sm text-muted-foreground mt-2">
                                {String(historyMap.get(content.recordId) || '')}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-sm"
                              disabled={!content.url || content.url === '#'}
                              onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                if (content.url && content.url !== '#') {
                                  const link = document.createElement('a');
                                  link.href = content.url;
                                  link.download = content.title;
                                  link.click();
                                }
                              }}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              ダウンロード
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-sm"
                              disabled={!content.url || content.url === '#'}
                              onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                if (content.url && content.url !== '#') {
                                  window.open(content.url, '_blank', 'noopener,noreferrer');
                                }
                              }}
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              開く
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8">
                  <p className="text-base text-muted-foreground text-center">
                    販促コンテンツはまだありません
                  </p>
                </Card>
              );
            })()}
            
            </TabsContent>
          </Tabs>
        </div>
      </div>


    </div>
  );
}