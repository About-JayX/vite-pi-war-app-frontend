# 1.Yarn命令

```
1.yarn dev 运行本地
2.yarn build 打包生产部署
3.yarn start 运行生产部署
```

# next配置

```
export default {
  output: 'export', 打包生产html到out目录、不需要打包到out目录直接删除或隐藏
  swcMinify: true,
  compiler: {
    styledComponents: true,
    removeConsole: !isProd,
  },
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

```

2.电报机器人


| 令牌来访问 HTTP API                                      | 机器人链接        | 机器人用户名 |
| -------------------------------------------------------- | ----------------- | ------------ |
| 7353766521:AAE2gk3Vcq9cPldK43YgAEyT0OfzM_rusNI7402702813 | t.me/PixelManRBot | PixelManR    |
