import React, { useState } from "react";
import productData from "../data/product.json";
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

export default function MaterialDetailProducts({
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
        <div className="space-y-8">
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
        </div>
  );
}