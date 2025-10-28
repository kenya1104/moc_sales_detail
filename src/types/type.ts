export interface MaterialDetailProps {
  materialId: string;
  onBack: () => void;
}

export interface Material {
    id: string;
    origin: string; // 産地
    category: string; // 野菜・果物の一般名称
    variety: string; // 品種名
    season: string; // 出荷時期
    growingMethod: string;
    appeals: string[];
    imageUrl: string;
    available?: boolean; // 在庫状況（デフォルト: true）
    description?: string; // 商品説明
    rating?: number; // 評価（1-5）
  }

export interface MaterialImage {
  materialId: string;
  url: string;
  alt: string;
}

export interface MaterialCharacteristics {
  title: string;
  description: string;
}

export interface MaterialOriginCharacteristics {
    title: string;
    description: string;
  }

export interface MaterialGrowingCharacteristics {
  title: string;
  description: string;
}


export interface Product {
  id: string;
  grade: string; // 階級 (A~C)
  size: string; // サイズ (SS~LL)
  format: string; // 形態
  price: number; // 参考価格
  inStock: boolean;
}

export interface ProducerGroup {
  name: string;
  prefecture: string; // 都道府県
  city: string; // 市区町村
  memberCount: number; // 構成員数
  farmArea: string; // 圃場面積
  description: string;
}


export interface sales_history{
  start_date: string; // 販売開始日
  end_date: string; // 販売終了日
  quantity: string; // 販売総量
}

export interface sales_floor_history{
  headerIcon: string; // ヘッダー画像
  retail_name: string; // 小売店舗
  start_date: string; // 販売開始日
  end_date: string; // 販売終了日
  quantity: string; // 販売量
  floor_area: string; // 売場面積
  description: string; // 備考
}
