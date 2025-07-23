import { ErrorNotification } from "@/components/error-notification";
import { Loader } from "@/components/loader";
import { PostsCard } from "@/components/post-card";
import { useGetPostsQuery } from "@/hooks/use-get-posts-query";
import { Fragment, useMemo, useState } from "react";
import {
  AutoSizer,
  CellMeasurer,
  InfiniteLoader,
  List,
  type Index,
} from "react-virtualized";
import { useCellMeasurer } from "./hooks";
import styles from "./styles.module.css";

const ITEMS_PER_PAGE = 10;
const LOAD_THRESHOLD = 3;

export function PostList() {
  const [skip, setSkip] = useState(0);
  const { data, isFetching, error } = useGetPostsQuery({ skip });

  const { cache, handleRegisterListRef } = useCellMeasurer(isFetching);
  const posts = useMemo(() => data?.posts || [], [data?.posts]);
  const total = useMemo(() => data?.total || 0, [data?.total]);

  const isRowLoaded = (p: Index) => !!posts[p.index];

  const loadMoreRows = () => {
    if (!isFetching && skip <= total) setSkip((prev) => prev + ITEMS_PER_PAGE);
    return Promise.resolve();
  };

  return (
    <Fragment>
      <Loader isLoading={isFetching} />
      <ErrorNotification error={error} />
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={total}
        threshold={LOAD_THRESHOLD}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ height, width }) => (
              <List
                ref={handleRegisterListRef(registerChild)}
                className={styles.list}
                onRowsRendered={onRowsRendered}
                height={height}
                width={width}
                rowCount={posts.length}
                rowHeight={cache.rowHeight}
                deferredMeasurementCache={cache}
                overscanRowCount={0}
                rowRenderer={({ index, key, style, ...props }) => (
                  <CellMeasurer
                    {...props}
                    key={key}
                    rowIndex={index}
                    cache={cache}
                  >
                    {({ registerChild }) => (
                      <PostsCard
                        post={posts[index]}
                        registerChild={registerChild}
                        style={style}
                      />
                    )}
                  </CellMeasurer>
                )}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    </Fragment>
  );
}
