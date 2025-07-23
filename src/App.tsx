import { AppLayout } from "@/components/app-layout";
import { PostList } from "@/containers/post-list";
import type { JSX } from "react";

function App(): JSX.Element {
  return (
    <AppLayout>
      <PostList />
    </AppLayout>
  );
}

export default App;
