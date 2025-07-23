import { Spin } from "antd";
import { type JSX } from "react";

interface Props {
  isLoading: boolean;
}

export function Loader({ isLoading }: Props): JSX.Element | null {
  if (!isLoading) return null;

  return <Spin size="large" fullscreen />;
}
