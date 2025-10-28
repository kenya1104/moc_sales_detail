import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  MapPin,
  Calendar,
  TrendingUp,
  Warehouse,
  Store,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import salesHistoriesData from "../data/sales-hisotries.json";

interface SalesRecordDetailProps {
  recordId: string;
  onBack: () => void;
}

interface DistributionPhase {
  title: string;
  location: string;
  images: { url: string; alt: string }[];
  details: string[];
}

export default function SalesRecordDetail({
  recordId,
}: SalesRecordDetailProps) {
  // State for selected images for each phase
  const [selectedPhaseImages, setSelectedPhaseImages] = useState<{
    [key: number]: number;
  }>({ 0: 0, 1: 0, 2: 0 });

  // JSONファイルからデータを取得
  const salesHistoryData = (salesHistoriesData as any).salesHistory?.find(
    (history: any) => history.id === recordId
  );

  if (!salesHistoryData) {
    return <div>販売記録が見つかりません</div>;
  }

  const record = {
    id: salesHistoryData.id,
    retail_name: salesHistoryData.retail_name,
    start_date: salesHistoryData.start_date,
    end_date: salesHistoryData.end_date,
    total_quantity: salesHistoryData.total_quantity,
    floor_area: salesHistoryData.floor_area,
    description: salesHistoryData.description,
    distributionPhases: (salesHistoryData.distributionPhases || []) as DistributionPhase[],
  };

  return (
    <div className="space-y-8 pb-12">
 
      {/* Sales Summary */}
      <Card className="p-8 bg-amber-50 border-amber-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-base text-muted-foreground">
              <Calendar className="w-5 h-5" />
              <span>販売期間</span>
            </div>
            <div className="text-lg">
              {record.start_date}
              <br />〜 {record.end_date}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-base text-muted-foreground">
              <TrendingUp className="w-5 h-5" />
              <span>販売量</span>
            </div>
            <div className="text-lg">{record.total_quantity}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-base text-muted-foreground">
              <Store className="w-5 h-5" />
              <span>売場面積</span>
            </div>
            <div className="text-lg">{record.floor_area}</div>
          </div>
          <div className="space-y-2">
            <div className="text-base text-muted-foreground">備考</div>
            <div className="text-base">{record.description}</div>
          </div>
        </div>
      </Card>

      <Separator />

      {/* Distribution Flow */}
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl mb-2">流通遷移図</h2>
          <p className="text-base text-muted-foreground">
            産地から売場まで、商品がどのように流通するかを示しています
          </p>
        </div>

        <div className="space-y-8">
          {record.distributionPhases.map((phase, index) => (
            <div key={index}>
              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Images */}
                  <div className="relative space-y-4 p-4">
                    {/* Main Image */}
                    <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={
                          phase.images[selectedPhaseImages[index] || 0]
                            .url
                        }
                        alt={
                          phase.images[selectedPhaseImages[index] || 0]
                            .alt
                        }
                        className="w-full h-full object-cover"
                      />
                      {/* Phase Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className="text-base px-4 py-2 bg-amber-600">
                          {index === 0 && "産地"}
                          {index === 1 && "倉庫"}
                          {index === 2 && "売場"}
                        </Badge>
                      </div>
                    </div>

                    {/* Thumbnail Images */}
                    <div className="grid grid-cols-3 gap-2">
                      {phase.images.map((image, imgIndex) => (
                        <button
                          key={imgIndex}
                          onClick={() =>
                            setSelectedPhaseImages((prev) => ({
                              ...prev,
                              [index]: imgIndex,
                            }))
                          }
                          className={`aspect-[4/3] bg-muted rounded overflow-hidden border-2 transition-all ${
                            (selectedPhaseImages[index] || 0) ===
                            imgIndex
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

                  {/* Content */}
                  <div className="p-8 bg-white">
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          {index === 0 && (
                            <MapPin className="w-7 h-7 text-amber-600" />
                          )}
                          {index === 1 && (
                            <Warehouse className="w-7 h-7 text-amber-600" />
                          )}
                          {index === 2 && (
                            <Store className="w-7 h-7 text-amber-600" />
                          )}
                          <h3 className="text-2xl">{phase.title}</h3>
                        </div>
                        <p className="text-base leading-relaxed">
                          場所：{phase.location}
                        </p>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        {phase.details.map((detail, detailIndex) => (
                          <div
                            key={detailIndex}
                            className="flex items-start gap-3"
                          >
                            <span className="text-amber-600 flex-shrink-0 mt-1 text-lg">
                              •
                            </span>
                            <span className="text-base">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Arrow between phases */}
              {index < record.distributionPhases.length - 1 && (
                <div className="flex justify-center py-4">
                  <div className="text-amber-600">
                    <svg
                      width="24"
                      height="48"
                      viewBox="0 0 24 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0L12 40M12 40L6 34M12 40L18 34"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
