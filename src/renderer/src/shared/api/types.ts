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

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
