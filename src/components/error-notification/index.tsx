import { parseRtkError } from "@/utils/parse-rtk-error";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { App } from "antd";
import { useCallback, useEffect } from "react";

interface Props {
  error?: FetchBaseQueryError | SerializedError;
}

export function ErrorNotification({ error: e }: Props): null {
  const { notification: n } = App.useApp();

  const handleError = useCallback(() => e && n.error(parseRtkError(e)), [e, n]);

  useEffect(handleError, [handleError]);

  return null;
}
