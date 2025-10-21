import React, { useState } from "react";
import { Card } from "./ui/card";
import productData from "../data/product.json";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Calendar,
  Package,
  LayoutGrid,
} from "lucide-react";
import type {
  Product,
  ProductDetailProps,
  ProductImage,
  SKU,
  ProducerGroup,
  ProductCharacteristics,
  OriginCharacteristics,
  GrowingCharacteristics,
  sales_history,
} from "../types/product";
import { Dialog, DialogContent } from "./ui/dialog";

export default function MaterialDetailSales({
    productId,
  }: ProductDetailProps) {
    const [expandedImage, setExpandedImage] = useState<{
      url: string;
      alt: string;
    } | null>(null);

    // サンプルデータ
    const productDataTyped = productData as typeof productData & {
      productCharacteristics: ProductCharacteristics[];
      originCharacteristics: OriginCharacteristics[];
      growingCharacteristics: GrowingCharacteristics[];
      salesHistory: sales_history[];
      salesFloorHistory: Array<{
        headerIcon: string;
        retail_name: string;
        start_date: string;
        end_date: string;
        quantity: string;
        floor_area: string;
        description: string;
      }>;
    };
    
    const product = {
        id: productId,
        ...productDataTyped,
        images: productDataTyped.images as ProductImage[],
        skus: productDataTyped.skus as SKU[],
        producerGroup: productDataTyped.producerGroup as ProducerGroup,
      };
      
    return (
        <>
            <h3 className="text-2xl mb-4">販売実績</h3>
            <div className="grid grid-cols-2 gap-6">
                {product.salesFloorHistory && product.salesFloorHistory.map((history, index) => (
                    <Card key={index} className="p-6">
                    <div className="space-y-5">
                        {/* タイトル（小売り店） */}
                        <h4 className="text-xl font-semibold">
                        {history.retail_name}
                        </h4>         
                        {/* ヘッダー画像 */}
                        <div
                        className="w-32 h-32 bg-gray-100 flex items-center justify-center"
                        onClick={() => setExpandedImage({
                            url: history.headerIcon,
                            alt: history.retail_name
                        })}
                        >
                        <ImageWithFallback
                            src={history.headerIcon}
                            alt={history.retail_name}
                            className="w-full h-full object-cover"
                        />
                        </div>

                        {/* 詳細情報グリッド */}
                        <div className="grid grid-cols-2 gap-4">
                        {/* 販売期間 */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">販売期間</span>
                            </div>
                            <div className="text-base">
                            {new Date(history.start_date).toLocaleDateString('ja-JP', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                            <br />
                            〜 {new Date(history.end_date).toLocaleDateString('ja-JP', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                            </div>
                        </div>

                        {/* 販売量 */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                            <Package className="w-4 h-4" />
                            <span className="text-sm">販売量</span>
                            </div>
                            <div className="text-base font-semibold">
                            {history.quantity}
                            </div>
                        </div>

                        {/* 売場面積 */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                            <LayoutGrid className="w-4 h-4" />
                            <span className="text-sm">売場面積</span>
                            </div>
                            <div className="text-base font-semibold">
                            {history.floor_area}
                            </div>
                        </div>
                        </div>                
                    </div>
                    </Card>
                ))}
            </div>

        {/* 画像拡大表示ダイアログ */}
        <Dialog open={!!expandedImage} onOpenChange={() => setExpandedImage(null)}>
            <DialogContent className="max-w-5xl w-full p-0">
            {expandedImage && (
                <div className="relative w-full">
                <ImageWithFallback
                    src={expandedImage.url}
                    alt={expandedImage.alt}
                    className="w-full h-auto"
                />
                </div>
            )}
            </DialogContent>
        </Dialog>
        </>
    );
}
