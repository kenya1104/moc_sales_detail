import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "./ui/dialog";
import productData from "../data/product.json";

import {
  Heart,
  MapPin,
  Calendar,
  Package,
  Truck,
  ArrowLeft,
  Store,
  LayoutGrid,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
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

export default function ProductDetail({
  productId,
  onBack,
}: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] =
    useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSKU, setSelectedSKU] =
    useState<string>("sku-1");
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
  };
  
  const product = {
    id: productId,
    ...productDataTyped,
    images: productDataTyped.images as ProductImage[],
    skus: productDataTyped.skus as SKU[],
    producerGroup: productDataTyped.producerGroup as ProducerGroup,
  };

  const selectedSKUData = product.skus.find(
    (sku) => sku.id === selectedSKU,
  );

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
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden">
            <ImageWithFallback
              src={product.images[selectedImageIndex].url}
              alt={product.images[selectedImageIndex].alt}
              className="w-full h-full object-cover"
            />
            {/* Favorite Button */}
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400"
                }`}
              />
            </button>
            {/* Overlay Text */}
            <div className="absolute top-8 left-8 text-white space-y-2">
              <div className="text-4xl leading-tight">
                {product.origin}
              </div>
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-[4/3] bg-muted rounded overflow-hidden border-2 transition-all ${
                  selectedImageIndex === index
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <ImageWithFallback
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-8">
          {/* Product Title */}
          <div>
            <h1 className="text-4xl mb-3">{product.title}</h1>
          </div>

          {/* Appeal Points */}
          <div className="space-y-4 bg-amber-50 p-4 rounded-lg">
            <h3 className="text-3xl text--600">アピールポイント</h3>
            <ul className="space-y-3">
              {product.deliverySet.map((item, index) => (
                <li key={index} className="text-2xl">{item}</li>
              ))}
            </ul>
          </div>


          <Separator />


          {/* SKU Lineup */}
          <div>
            <h3 className="text-2xl mb-5">商品一覧</h3>
            <div className="space-y-3">
              {product.skus.map((sku) => (
                <button
                  key={sku.id}
                  onClick={() =>
                    sku.inStock && setSelectedSKU(sku.id)
                  }
                  disabled={!sku.inStock}
                  className={`w-full p-5 rounded-lg border-2 transition-all text-left ${
                    selectedSKU === sku.id
                      ? "border-primary bg-primary/5"
                      : sku.inStock
                        ? "border-gray-200 hover:border-gray-300"
                        : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedSKU === sku.id
                            ? "border-primary"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedSKU === sku.id && (
                          <div className="w-3 h-3 rounded-full bg-primary" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-4 text-base">
                          <span>
                            <span className="text-muted-foreground">
                              階級:
                            </span>{" "}
                            {sku.grade}
                          </span>
                          <span>
                            <span className="text-muted-foreground">
                              サイズ:
                            </span>{" "}
                            {sku.size}
                          </span>
                          <span>
                            <span className="text-muted-foreground">
                              形態:
                            </span>{" "}
                            {sku.format}
                          </span>
                        </div>
                        {!sku.inStock && (
                          <div className="text-sm text-red-500">
                            売り切れ
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-lg">
                      ¥{sku.price.toLocaleString()}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="group" className="w-full">
            <TabsList className="w-full grid grid-cols-3 h-12">
              <TabsTrigger
                value="description"
                className="data-[state=active]:bg-amber-100 text-base"
              >
                商品説明
              </TabsTrigger>
              <TabsTrigger
                value="group"
                className="data-[state=active]:bg-amber-100 text-base"
              >
                産地・栽培
              </TabsTrigger>
              <TabsTrigger
                value="product"
                className="data-[state=active]:bg-amber-100 text-base"
              >
                売場
              </TabsTrigger>
            </TabsList>

            {/* 商品の特徴 */}
            <TabsContent
              value="description"
              className="mt-6 space-y-4"
            >
              <h3 className="text-2xl mb-4">商品の特徴</h3>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {product.productCharacteristics.map((item, index) => (
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
                    {product.season}
                  </p>
                </div>
                <Separator />


                <div>
                  <h4 className="text-xl mb-2">内容</h4>
                  <p className="text-base">
                    {product.content}
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="text-xl mb-2">種別</h4>
                  <p className="text-base whitespace-pre-line">
                    {product.varieties}
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="text-xl mb-2">産地</h4>
                  <p className="text-base">
                    {product.origin}
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="text-xl mb-2">栽培方法</h4>
                  <p className="text-base">
                    {product.growingMethod}
                  </p>
                </div>

                <Separator />

              </div>
            </TabsContent>

            {/* 産地・栽培 */}
            <TabsContent
              value="group"
              className="mt-6 space-y-4"
            >
              <h3 className="text-2xl mb-4">産地の特徴</h3>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {product.originCharacteristics.map((item, index) => (
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
                {product.growingCharacteristics.map((item, index) => (
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
                      {product.producerGroup.name}
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
                        {product.producerGroup.prefecture}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-base text-muted-foreground">
                        市区町村
                      </div>
                      <div className="text-xl">
                        {product.producerGroup.city}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-base text-muted-foreground">
                        構成員数
                      </div>
                      <div className="text-xl">
                        {product.producerGroup.memberCount}名
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-base text-muted-foreground">
                        圃場面積
                      </div>
                      <div className="text-xl">
                        {product.producerGroup.farmArea}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-base text-muted-foreground"> 生産者コメント</p>
                      <p className="text-base leading-relaxed">
                        {product.producerGroup.description}
                      </p>
                  </div>

                </div>
            </TabsContent>

            {/* 売場 */}
            <TabsContent
              value="product"
              className="mt-6 space-y-4"
            >
              <h3 className="text-2xl mb-4">販売実績</h3>
              <div className="grid grid-cols-2 gap-6">
                {product.salesHistory && product.salesHistory.map((history, index) => (
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
                      
                      <Separator></Separator>
                     
                      {/* 備考 */}
                      {history.description && (
                        <>
                          <Separator />
                          <div className="space-y-2">
                            <div className="text-sm text-muted-foreground">
                              備考
                            </div>
                            <p className="text-base leading-relaxed">
                              {history.description}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
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
    </div>
  );
}