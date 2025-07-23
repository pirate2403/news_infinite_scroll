import { useCallback, useEffect, useRef } from "react";
import {
  CellMeasurerCache,
  List,
  type CellMeasurerCacheParams,
} from "react-virtualized";

type ListRef = List | null;

const MEASURER_PARAMS: CellMeasurerCacheParams = {
  fixedWidth: true,
  defaultHeight: 200,
};

export function useCellMeasurer(isFetchingData: boolean) {
  const listRef = useRef<ListRef>(null);
  const cacheRef = useRef<CellMeasurerCache>(
    new CellMeasurerCache(MEASURER_PARAMS)
  );

  const recomputeListHeight = useCallback(() => {
    if (isFetchingData) return;
    cacheRef.current.clearAll();
    listRef.current?.recomputeRowHeights();
  }, [isFetchingData]);

  const handleRegisterListRef = (fn?: (r: ListRef) => void) => {
    return (r: ListRef) => {
      listRef.current = r;
      fn?.(r);
    };
  };

  useEffect(recomputeListHeight, [recomputeListHeight]);

  return {
    cache: cacheRef.current,
    handleRegisterListRef,
  };
}
