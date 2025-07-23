import type { Post } from "@/api";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { Card, Flex, Typography } from "antd";
import { type CSSProperties, type JSX } from "react";

interface Props {
  post: Post;
  style?: CSSProperties;
  registerChild?: (element?: Element | null) => void;
}

export function PostsCard({ post, registerChild, style }: Props): JSX.Element {
  return (
    <Card ref={registerChild} title={post.title} style={style}>
      <Flex gap={14} vertical justify="space-between">
        <Flex gap={4} wrap justify="space-between">
          <Typography.Text>Теги: {post.tags.join(", ")}</Typography.Text>
          <Flex gap={8}>
            <Flex gap={2}>
              <LikeOutlined />
              <Typography.Text>{post.reactions.likes}</Typography.Text>
            </Flex>
            <Flex gap={2}>
              <DislikeOutlined />
              <Typography.Text>{post.reactions.dislikes}</Typography.Text>
            </Flex>
          </Flex>
        </Flex>
        <Typography.Paragraph>{post.body}</Typography.Paragraph>
      </Flex>
    </Card>
  );
}
