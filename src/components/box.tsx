import Header from "@/app/components/header";
import { Container } from "@material-ui/core";
import { PullRefresh, Toast } from "react-vant";

export default function Box({ children }: { children?: React.ReactNode }) {
  const onRefresh = (showToast: boolean) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (showToast) {
          Toast.info("刷新成功");
        }
        resolve(true);
      }, 1000);
    });
  };
  return (
    <PullRefresh
      onRefresh={() => onRefresh(true)}
      onRefreshEnd={() => console.log("onRefreshEnd")}
    >
      <Container maxWidth="xl" className="p-4">
        <Header />
        {children}
      </Container>
    </PullRefresh>
  );
}
