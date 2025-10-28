import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import MaterialImages from "../data/material-images.json"

interface MaterialDetailImagesProps {
    materialId: string;
}

export default function MaterialDetailImages ({ materialId }: MaterialDetailImagesProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    
    // 指定されたmaterialIdの画像データを取得
    const materialData = MaterialImages.find((m) => m.materialId === materialId);
    const images = materialData?.images || [];

    // 画像がない場合は何も表示しない
    if (images.length === 0) {
        return null;
    }

    return(
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden">
            <ImageWithFallback
                src={images[selectedImageIndex].url}
                alt={images[selectedImageIndex].alt}
                className="w-full h-full object-cover"
            />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-5 gap-2">
            {images.map((image, index) => (
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
    )
}