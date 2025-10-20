export interface ProductDetailProps {
  productId: string;
  onBack: () => void;
}

export interface Product {
    id: string;
    origin: string; // 産地
    category: string; // 野菜・果物の一般名称
    variety: string; // 品種名
    price: number;
    season: string; // 出荷時期
    content: string;
    growingMethod: string;
    appeals: [];
    imageUrl: string;
  }

export interface ProductImage {
  url: string;
  alt: string;
}

export interface SKU {
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
  headerIcon: string; // ヘッダー画像
  retail_name: string; // 小売店舗
  start_date: string; // 販売開始日
  end_date: string; // 販売終了日
  quantity: string; // 販売量
  floor_area: string; // 売場面積
  description: string; // 備考
}

export interface ProductCharacteristics {
  title: string;
  description: string;
}

export interface OriginCharacteristics {
    title: string;
    description: string;
  }

export interface GrowingCharacteristics {
  title: string;
  description: string;
}

