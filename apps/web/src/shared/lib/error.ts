import axios from "axios";
import type { ApiResponse } from "@/shared/api";

export interface ApiErrorDetails {
  code?: string;
  status?: number;
  message: string;
}

export const getApiError = (error: unknown, fallbackMessage: string): ApiErrorDetails => {
  if (axios.isAxiosError<ApiResponse<null>>(error)) {
    const code = error.response?.data?.error?.code;
    const status = error.response?.status;
    const responseMessage = error.response?.data?.error?.message ?? error.response?.data?.message;

    if (typeof responseMessage === "string" && responseMessage.trim().length > 0) {
      return {
        code,
        status,
        message: responseMessage,
      };
    }

    if (error.message.trim().length > 0) {
      return {
        code,
        status,
        message: error.message,
      };
    }

    return {
      code,
      status,
      message: fallbackMessage,
    };
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return {
      code: undefined,
      message: error.message,
    };
  }

  return {
    code: undefined,
    message: fallbackMessage,
  };
};

export const getErrorMessage = (error: unknown, fallbackMessage: string): string =>
  getApiError(error, fallbackMessage).message;
