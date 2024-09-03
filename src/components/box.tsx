import Header from "@/app/components/header";
import { Container } from "@material-ui/core";
import { PullRefresh, Toast } from "react-vant";
import { useTranslation } from "react-i18next";

export default function Box({ children }: { children?: React.ReactNode }) {
  const { t } = useTranslation();

  const onRefresh = (showToast: boolean) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (showToast) {
          Toast.info(t("message.refresh.success"));
        }
        resolve(true);
      }, 1000);
    });
  };
  return (
    <PullRefresh
      onRefresh={() => onRefresh(true)}
      onRefreshEnd={() => console.log("onRefreshEnd")}
      pullingText={() => t("message.refresh.pulling")}
      loosingText={t("message.refresh.release")}
      loadingText={t("message.refresh.loading")}
    >
      <Container maxWidth="xl" className="p-4">
        <Header />
        {children}
      </Container>
    </PullRefresh>
  )
}
