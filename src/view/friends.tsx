import Button from "@/components/button";
import { HeaderTitle, Title } from "@/components/title";
import { useAppSelector } from "@/store/hook";
import { Avatar, CardHeader, Container } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import invite from "@/config/invite";
import { getTextColorForBackground, semicolon, stringToColor } from "@/utils";
import { Text } from "@/components/text";

export default function Friends() {
  const { t } = useTranslation();

  const { telegramUserData, friendRank } = useAppSelector(
    (state) => state.user
  );

  const invited = () => {
    const shareUrl = `https://t.me/share/url?url=https://t.me/${invite.botName}/pidWar/?startapp=${telegramUserData.Invitation_code}&text=${invite.text}`;
    window.open(shareUrl, "_blank");

    // const shareUrl = `https://t.me/share/url?url=https://t.me/${invite.botName}/join?t=${telegramUserData.Invitation_code}&text=${invite.text}`
    // window.open(shareUrl, '_blank');

    // const shareUrl = `https://t.me/share/url?url=https://t.me/${invite.botName}/app?t=${telegramUserData.Invitation_code}&text=${invite.text}`
    // window.open(shareUrl, '_blank');
  };
  return (
    <Container maxWidth="sm" className="p-4 pb-0">
      <div className="grid grid-flow-row grid-rows-[1fr,auto] h-full justify-between relative">
        <div class="min-h-[calc(100vh-160px)]">
          <div className="grid w-full gap-6 overflow-hidden h-fit">
            <Title className="whitespace-pre-line text-center">
              {t("friends.title")}
            </Title>
            <HeaderTitle className="text-left w-full">
              {friendRank.total || 0} {t("public.friends")}
            </HeaderTitle>
            {friendRank.friends &&
              friendRank.friends.length > 0 &&
              friendRank.friends.map((item: any, index: number) => (
                <CardHeader
                  key={index}
                  className="w-full !p-0"
                  avatar={
                    <Avatar
                      aria-label="recipe"
                      style={{
                        background: stringToColor(item.invited_by_userName),
                        color: getTextColorForBackground(
                          item.invited_by_userName
                        ).textColor,
                      }}
                    >
                      {(item.invited_by_userName &&
                        item.invited_by_userName.slice(0, 2).toUpperCase()) ||
                        ""}
                    </Avatar>
                  }
                  action={
                    <Text>+{semicolon(item.reward_amount || 0) }&nbsp;PIS</Text>
                  }
                  title={<Text>{item.invited_by_userName || ""}</Text>}
                />
              ))}
          </div>
        </div>

        <div className="w-full bg-black sticky bottom-[0] z-1">
          <Button onClick={invited} className="w-full">
            {t("public.inviteFriends")}
          </Button>
        </div>
      </div>
    </Container>
  );
}
