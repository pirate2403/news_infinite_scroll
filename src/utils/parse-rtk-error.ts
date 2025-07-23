import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface ParsedError {
  message: string;
  description: string;
}

export function parseRtkError(
  error: FetchBaseQueryError | SerializedError = {}
): ParsedError {
  if ("status" in error) {
    return {
      message: `Ошибка HTTP: ${error.status}`,
      description: JSON.stringify(error.data),
    };
  } else {
    return {
      message: error.name || "Неизвестная ошибка",
      description: error.message || "Описание отсутствует",
    };
  }
}
