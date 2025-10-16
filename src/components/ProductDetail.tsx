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
import productData from "../data/product.json";

import {
  Heart,
  MapPin,
  Calendar,
  Package,
  Truck,
  ArrowLeft,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
}

interface ProductImage {
  url: string;
  alt: string;
}

interface SKU {
  id: string;
  grade: string; // 階級 (A~C)
  size: string; // サイズ (SS~LL)
  format: string; // 形態
  price: number; // 参考価格
  inStock: boolean;
}

interface ProducerGroup {
  name: string;
  prefecture: string; // 都道府県
  city: string; // 市区町村
  memberCount: number; // 構成員数
  farmArea: string; // 圃場面積
  description: string;
  growingCharacteristics: Array<{
    title: string;
    description: string;
  }>;
}

export default function ProductDetail({
  productId,
  onBack,
}: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] =
    useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSKU, setSelectedSKU] =
    useState<string>("sku-1");

  // サンプルデータ
  const product = {
    id: productId,
    ...productData,
    images: productData.images as ProductImage[],
    skus: productData.skus as SKU[],
    producerGroup: productData.producerGroup as ProducerGroup,
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
            <h1 className="text-4xl mb-3">{product.variety}</h1>
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

          {/* Origin and Season */}
          <div className="flex flex-col gap-3 text-base">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span className="text-muted-foreground">
                {product.season}
              </span>
            </div>
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
                商品詳細
              </TabsTrigger>
            </TabsList>

            {/* 商品の特徴 */}
            <TabsContent
              value="description"
              className="mt-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {product.productInfo.characteristics.map((item, index) => (
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
            </TabsContent>

            {/* 産地・栽培 */}
            <TabsContent
              value="group"
              className="mt-6 space-y-4"
            >
              <h3 className="text-2xl mb-4">産地特徴</h3>
                <div className="text-base leading-relaxed">
                  {product.productInfo.originCharacteristics}
                </div>
                <Separator />

              <div className="space-y-4 mb-4">
                <h3 className="text-2xl mb-4">栽培特徴</h3>
                {/* Growing Method Card */}
                {product.producerGroup.growingCharacteristics.map((item, index) => (
                  <Card key={index} className="p-8 mb-4">
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



            {/* 商品詳細 */}
            <TabsContent
              value="product"
              className="mt-6 space-y-4"
            >
              <div className="space-y-8">
                {/* Content */}
                <div>
                  <h4 className="text-xl mb-3">内容</h4>
                  <p className="text-base">
                    {product.productInfo.content}
                  </p>
                </div>

                <Separator />

                {/* Varieties */}
                <div>
                  <h4 className="text-xl mb-3">種別</h4>
                  <p className="text-base whitespace-pre-line">
                    {product.productInfo.varieties}
                  </p>
                </div>

                <Separator />

                {/* Origin */}
                <div>
                  <h4 className="text-xl mb-3">産地</h4>
                  <p className="text-base">
                    {product.productInfo.origin}
                  </p>
                </div>

                <Separator />

                {/* Origin */}
                <div>
                  <h4 className="text-xl mb-3">栽培方法</h4>
                  <p className="text-base">
                    {product.productInfo.growingMethod}
                  </p>
                </div>

                <Separator />

              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}