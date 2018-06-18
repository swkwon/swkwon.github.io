---
layout: post
title:  Git branch
date:   2018-06-18 10:00:00 +0900
categories: [git]
---

## git branch 만들기
```bash
$ git branch [branch name]
```

## branch 전환
```bash
$ git checkout -b [branch name]
```
`-b` 옵션은 생성과 함께 전환합니다. `-b` 옵션이 없을 경우 생성만 합니다.

## branch 병합
branch에서 master로 병합해보겠습니다. branch 이름은 job이라고 칭하겠습니다.
```bash
$ git checkout master
```
일단 master branch로 전환합니다.

```bash
$ git merge job
```

## branch 삭제하기
```bash
$ git branch -d [branch name]
```

## 원격 저장소의 branch를 가져올때
먼저 git remote update를 해줍니다.
```bash
$ git remote update
```

## 원격 저장소의 branch를 보고 싶을 때
```bash
$ git branch -r
```
`-r`옵션을 주면 됩니다.

## 원격 저장소와 로컬 저장소 모든 branch 를 보고 싶을 때
```bash
$ git branch -a
```
`-a` 옵션을 주면 됩니다.

## 원격 저장소의 branch를 가져오기
```bash
$ git checkout -t origin/develop
```

## 원격 저장소의 branch 이름을 다르게 가져오고 싶다면
```bash
$ git checkout -b [생성할 branch 이름] [원격 저장소의 branch 이름] 
```
