#!/bin/zsh

remote_url=$1

if [ -z "$remote_url" ]; then
echo "请携带仓库地址"
exit 1
  # 当 $remote_url 为空时，将执行此处的代码
fi

git remote remove origin

git remote add origin $remote_url

git pull 

git branch --set-upstream-to=origin/main main

