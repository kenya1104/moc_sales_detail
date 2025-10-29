import { useState } from "react";
import productsData from "../data/products.json";
import type { MaterialDetailProps } from "../types/type";

export default function MaterialDetailProducts({materialId}: MaterialDetailProps) {
  const [selectedSKU, setSelectedSKU] = useState<string>("sku-1");
  
  // materialIdに基づいて商品一覧を取得
  const products = (productsData as any[]).filter(
    (product: any) => product.materialId === materialId
  );


  // 商品データが見つからない場合
  if (products.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <p className="text-muted-foreground">この商材の規格データが見つかりません</p>
        </div>
      </div>
    );
  }

  return (
        <div className="space-y-8">
          <div>
            <div className="space-y-3">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() =>
                    product.inStock && setSelectedSKU(product.id)
                  }
                  disabled={!product.inStock}
                  className={`w-full p-5 rounded-lg border-2 transition-all text-left ${
                    selectedSKU === product.id
                      ? "border-primary bg-primary/5"
                      : product.inStock
                        ? "border-gray-200 hover:border-gray-300"
                        : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedSKU === product.id
                            ? "border-primary"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedSKU === product.id && (
                          <div className="w-3 h-3 rounded-full bg-primary" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-2xl mb-5">{product.label}</h3>
                        <div>
                          <span className="text-muted-foreground">出荷年:</span>
                          <span className="text-base">{product.shipping_year}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">出荷予定時期:</span>
                          <span className="text-base">{product.shipping_start_season} 〜 {product.shipping_end_season}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground">
                              規格・サイズ:
                            </span>{" "}
                            {product.size}
                        </div>
                        <div>
                            <span className="text-muted-foreground">
                              形態（量目）:
                            </span>{" "}
                            {product.unit_format}
                        </div>
                        <div>
                            <span className="text-muted-foreground">
                              入り数:
                            </span>{" "}
                            {product.quantity}
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              出荷形態:
                            </span>{" "}
                            {product.shipping_format}
                          </div>
                          <div>
                            <span>
                              <span className="text-muted-foreground">
                                最大数量:
                              </span>{" "}
                              {product.shipping_max_quantity}
                            </span>
                            <span>
                              <span className="text-muted-foreground">
                                最小数量:
                              </span>{" "}
                              {product.shipping_min_quantity}
                            </span>
                          </div>
                        {!product.inStock && (
                          <div className="text-sm text-red-500">
                            売り切れ
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
  );
}