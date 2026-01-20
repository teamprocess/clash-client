// 공통 Response
export interface ApiResponse<T = unknown> {
  data: T | null;
  success: boolean;
  message?: string;
  error?: ErrorResponse;
}

export interface ErrorResponse {
  message: string;
  code?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
