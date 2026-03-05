export type ProductCategory = "INSIGNIA" | "NAMEPLATE" | "BANNER";
export type ProductCurrency = "TOKEN" | "COOKIE";

export interface Product {
  id: number;
  title: string;
  category: ProductCategory;
  image: string;
  type: ProductCurrency;
  price: number;
  discount: number;
  popularity: number;
  season: string | null; // null이 들어올 수 있으므로 허용
  is_seasonal: boolean;
  created_at: string;
}

export interface ProductListResponse {
  data: {
    products: Product[];
  };
  message: string;
  success: boolean;
}

export const popularityProductsMock: ProductListResponse = {
  data: {
    products: [
      {
        id: 101,
        title: "전설의 용사 휘장",
        category: "INSIGNIA",
        image: "...",
        type: "TOKEN",
        price: 50000,
        discount: 10,
        popularity: 9999,
        season: "2026 WINTER",
        is_seasonal: true,
        created_at: "2026-01-10T10:00:00Z",
      },
      {
        id: 102,
        title: "심플 블랙 이름표",
        category: "NAMEPLATE",
        image: "...",
        type: "COOKIE",
        price: 10000,
        discount: 0,
        popularity: 8500,
        season: null,
        is_seasonal: false,
        created_at: "2026-01-09T14:20:00Z",
      },
      {
        id: 103,
        title: "우주 정복 배너",
        category: "BANNER",
        image: "...",
        type: "TOKEN",
        price: 25000,
        discount: 20,
        popularity: 7200,
        season: null,
        is_seasonal: false,
        created_at: "2026-01-09T11:00:00Z",
      },
      {
        id: 104,
        title: "반짝이는 보석 휘장",
        category: "INSIGNIA",
        image: "...",
        type: "COOKIE",
        price: 15000,
        discount: 5,
        popularity: 6800,
        season: "2025 FALL",
        is_seasonal: true,
        created_at: "2026-01-08T09:30:00Z",
      },
      {
        id: 105,
        title: "네온 라이트 이름표",
        category: "NAMEPLATE",
        image: "...",
        type: "TOKEN",
        price: 12000,
        discount: 0,
        popularity: 5400,
        season: null,
        is_seasonal: false,
        created_at: "2026-01-07T18:45:00Z",
      },
      {
        id: 106,
        title: "불타는 지옥 배너",
        category: "BANNER",
        image: "...",
        type: "COOKIE",
        price: 18000,
        discount: 15,
        popularity: 4900,
        season: "2026 SPRING",
        is_seasonal: true,
        created_at: "2026-01-07T13:10:00Z",
      },
      {
        id: 107,
        title: "기본 기사단 휘장",
        category: "INSIGNIA",
        image: "...",
        type: "COOKIE",
        price: 5000,
        discount: 0,
        popularity: 3200,
        season: null,
        is_seasonal: false,
        created_at: "2026-01-06T15:20:00Z",
      },
      {
        id: 108,
        title: "귀여운 고양이 배너",
        category: "BANNER",
        image: "...",
        type: "TOKEN",
        price: 9000,
        discount: 10,
        popularity: 2800,
        season: null,
        is_seasonal: false,
        created_at: "2026-01-06T10:00:00Z",
      },
      {
        id: 109,
        title: "프로게이머 이름표",
        category: "NAMEPLATE",
        image: "...",
        type: "COOKIE",
        price: 11000,
        discount: 30,
        popularity: 1500,
        season: null,
        is_seasonal: false,
        created_at: "2026-01-05T21:00:00Z",
      },
      {
        id: 110,
        title: "영광의 승리 휘장",
        category: "INSIGNIA",
        image: "...",
        type: "TOKEN",
        price: 30000,
        discount: 0,
        popularity: 900,
        season: null,
        is_seasonal: false,
        created_at: "2026-01-05T14:30:00Z",
      },
    ],
  },
  message: "추천 상품 목록 조회를 성공했습니다.",
  success: true,
};
