$#!/bin/zsh

# 提示用户输入远程仓库名称
read -p "远程仓库url: " remote_url

git remote remove origin

git remote add origin $remote_url

git pull 

read -p "分支名: " branch 

git branch --set-upstream-to=origin/$branch main

