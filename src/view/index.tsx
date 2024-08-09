import { Text } from '@/components/text'
import { HeaderTitle, Title } from '@/components/title'
import { useAppSelector } from '@/store/hook'
import '@/style/home.css'
import { semicolon } from '@/utils'
import { useTranslation } from 'react-i18next'
import { CardActions, CardContent, Container } from '@material-ui/core'
import Button from '@/components/button'
import { Card } from 'react-bootstrap'
import Loader from '@/components/loader'

export default function Home() {
  const { userReward } = useAppSelector(state => state.user)
  const { t } = useTranslation()
  const homeBntLang: any = t('home.bnt', { returnObjects: true })

  const getIcon = (key: any) => {
    let index

    switch (key) {
      case 'Telegram Premium': {
        index = 1
        break
      }
      case 'Account age': {
        index = 2
        break
      }
      case 'Invited friends': {
        index = 3
        break
      }
      default: {
        index = 1
        break
      }
    }
    return (
      <img src={`/home/${index}.svg`} alt="" className="w-[3rem] h-[3rem]" />
    )
  }
  const rewardLogs = () => {
    console.log(userReward, 'userReward')

    let newArr: any = []

    userReward.activityLogs &&
      userReward.activityLogs.forEach((item: any) => {
        let nItem = { ...item }
        if (item.key.includes('Binding')) {
          nItem.key = 'Binding rewards'
        }
        if (!newArr.length) {
          newArr.push(nItem)
        } else {
          let obj = newArr.find((child: any) => child.key === nItem.key)

          if (!obj) {
            newArr.push(nItem)
          } else {
            obj.value = String(Number(obj.value) + Number(nItem.value))
          }
        }
      })

    return newArr.map((item: any, index: any) => {
      if (item.key.includes('Binding')) {
        item.key = 'Binding rewards'
      }
      return (
        <div className="flex w-100 justify-between z-1" key={index}>
          <div className="self-center flex gap-3">
            <div>{getIcon(item.key)}</div>
            <Text className="self-center">{item.key}</Text>
          </div>
          <Text className={`self-center text-end`}>
            +{semicolon(item.value) || 0} PIS
          </Text>
        </div>
      )
    })
  }
  return (
    <Container maxWidth="xl" className="p-4 container">
      <div className="grid gap-6 w-100 justify-items-center home-bg">
        <div className="bg" />
        <div className="home-bg-1" />
        <div className="home-bg-2" />
        <div className="home-bg-3" />
        <div className="grid gap-6 justify-items-center z-[1]">
          <div className="pi-war-home-logo w-[14rem] h-[14rem]">
            <div className="logo-1" />
            <div className="logo-2" />
            <div className="logo-3" />
          </div>
          <Title className="pi-war-text-color mt-[-1rem]">
            {semicolon(
              (userReward &&
                userReward.userAccountInfo &&
                userReward.userAccountInfo.gold) ||
                0
            )}
            &nbsp;PIS
          </Title>
        </div>
        <Card className="w-full card">
          <CardContent className="text-center !pb-0">
            <Text className="whitespace-pre-line">{t('home.text')}</Text>
          </CardContent>
          <CardActions>
            {homeBntLang.map((item: any, index: number) => (
              <Button
                key={index}
                className="rounded-full"
                onClick={() => {
                  window.open(item.url)
                }}
              >
                {item.name}
              </Button>
            ))}
          </CardActions>
        </Card>
        <HeaderTitle className="text-left w-full">
          {t('public.myRewards')}
        </HeaderTitle>
        {userReward && userReward.activityLogs && userReward.activityLogs.length
          ? rewardLogs()
          : ''}
        <Loader />
      </div>
    </Container>
  )
}
