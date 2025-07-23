import { App, Layout, Typography } from "antd";
import { type JSX } from "react";
import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
}

const { Header, Content } = Layout;

export function AppLayout({ children }: Props): JSX.Element {
  return (
    <App>
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <Typography.Title level={3} className={styles.title}>
            Лента новостей
          </Typography.Title>
        </Header>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </App>
  );
}
