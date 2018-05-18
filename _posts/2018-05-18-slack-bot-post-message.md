---
layout: post
title: slackbot Web API를 이용한 PostMessage 사용하기
date:   2018-05-18 11:00:00 +0900
categories: [go, slack]
---

### RealTime Message API와 차이점
일전에 해봤던 RealTime Message API는 슬랙봇이 항상 온라인 상태입니다.
누군가 말을 하는 것을 항상 듣고 있고, 특정 단어에 반응하도록 만들었습니다.
여기서 사용해볼 API는 단순히 메시지를 채널에 보내고 끝나는 형식입니다.

예를들어,
아침 7시마다 날씨를 알려주는 프로그램을 만들 수도 있고,
웹크롤러를 만들어 필요한 내용을 찾을 때마다 알려주는 프로그램을 만들 수도 있습니다.

하지만 여기서는 간단하게 기존에 만들어놨던 봇을 이용해 메시지를 어떻게 던지는지 
예제를 작성해보겠습니다.

```text
C:\
|-- GoCode
    |-- src
        |-- rtm_slack
            |-- PostMessage
                | -- main.go
```

위와 같이 PostMessage 폴더를 만들고 아래 `main.go` 파일을 만들었습니다.
`main.go`의 소스는 아래와 같습니다.

```golang
package main

import (
	"fmt"
	"test/rtm_slack/def"

	"github.com/nlopes/slack"
)

func main() {
	api := slack.New(def.APIToken)
	params := slack.PostMessageParameters{}
	attachment := slack.Attachment{
		Color:      "#2eb886",
		AuthorName: "william",
		Pretext:    "[TV]나의 아저씨가 남긴것..",
		Text:       "나의 아저씨 결말까지...",
		Footer:     "TV리포트",
		Title:      "나의 아저씨 기사",
		TitleLink:  "http://www.tvreport.co.kr/?c=news&m=newsview&idx=1057739",
	}
	params.Attachments = []slack.Attachment{attachment}
	// params.AsUser = true
	params.Username = "연예봇"
	params.IconEmoji = ":+1:"
	channelID, timestamp, err := api.PostMessage(def.ChannelID, "이것을 원하셨습니까?", params)
	if err != nil {
		fmt.Printf("%s\n", err)
		return
	}
	fmt.Printf("Message successfully sent to channel %s at %s", channelID, timestamp)
}
```

이전에 RealTime Message API 예제보다 짧고 쉽습니다. 하나씩 보겠습니다.

```golang
api := slack.New(def.APIToken)
```

봇을 만들때 받아놨던 봇 API Token을 입력하여 api 인스턴스를 하나 만듭니다.

```golang
	params := slack.PostMessageParameters{}
	attachment := slack.Attachment{
		Color:      "#2eb886",
		AuthorName: "william",
		Pretext:    "[TV]나의 아저씨가 남긴것..",
		Text:       "나의 아저씨 결말까지...",
		Footer:     "TV리포트",
		Title:      "나의 아저씨 기사",
		TitleLink:  "http://www.tvreport.co.kr/?c=news&m=newsview&idx=1057739",
	}
	params.Attachments = []slack.Attachment{attachment}
	// params.AsUser = true
	params.Username = "연예봇"
	params.IconEmoji = ":+1:"
```

첫째줄 parameter 변수 `params`를 하나 만듭니다.
두번째줄에 보낼 내용을 `attachment`를 만듭니다. 
11번째줄에 `params.Attachments`에 `attachment`를 추가합니다.
주석처리가 된 `// params.AsUser = true`가 있는데 `AsUser`는 기본값이 `false` 입니다.
`true`가 되면 slack bot 설정 페이지에서 설정했던 이름과 프로필사진(혹은 이모찌 아이콘)으로 출력이 되며,
`false`일 경우 `UserName`과 `IconEmoji` 설정한 것과 같이 채널에 출력됩니다.

```golang
	channelID, timestamp, err := api.PostMessage(def.ChannelID, "이것을 원하셨습니까?", params)
	if err != nil {
		fmt.Printf("%s\n", err)
		return
	}
```

보낼 데이터는 PostMessage 함수를 이용하여 보내고 에러가 있는지 검사하는 코드입니다.
이제 프로그램을 실행해보면 아래와 같이 나옵니다.

![결과물](/assets/postmessage.png)