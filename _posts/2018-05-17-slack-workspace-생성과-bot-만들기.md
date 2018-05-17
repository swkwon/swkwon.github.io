---
layout: post
title: 슬랙과 슬랙봇
categories: [slack]
---

## 슬랙봇을 만들어 보자

슬랙에 커스터마이즈 슬랙봇을 붙이고 싶을때 슬랙의 Real Time Message API를 이용하여 나에게 맞는 슬랙봇을 만들 수 있습니다.

### 슬랙봇 만들기
슬랙봇을 만들기 전에 봇 app을 추가해주어야 합니다.
`[workspace].slack.com/apps`로 이동하면 app을 다운로드 받을 수 있습니다.
봇앱은 workspace에 한번만 설치하면 나중에 봇을 계속 추가할 수 있습니다.

![addbot]({{site.url}}/assets/add_bots.png)

봇을 만들때 봇이 참여할 채널을 설정해도 되고, 만들어진 채널에 봇을 추가해도 됩니다.

![api token]({{site.url}}/assets/api_token.png)

봇을 만들었을 때 API Token이 생성되는데 보안에 유지하도록 합니다.

봇을 생성하고 채널에 참여시키는 작업이 완료 되었습니다. 이제 API Token을 이용해서 봇이 내 반응하도록 해보겠습니다.

### Golang으로 봇만들기
슬랫봇 프로젝트 폴더를 하나 생성합니다.
main 함수가 들어갈 파일 이름으로 slackbot.go를 하나 만듭니다.

디렉토리 구조
```
rtm_slack
|-- slackbot.go
|-- def
    |-- def.go
|-- parser
    |-- parser.go
```

rtm_slack 프로젝트 폴더 밑에 slackbot.go파일을 만들고, def폴더와 parser 폴더를 만들었습니다.
def.go는 상수를 정의할 파일이고, parser.go는 슬랫봇이 메시지를 받아서 명령을 듣고 응답을 할 함수를 만들 것입니다.

slackbot과 연결을 하기 위해 websocket으로 직접 연결할 수도 있으나 편의상 누군가 만들어 놓은 슬랙 라이브러리를 사용해 보겠습니다.
라이브러리를 받겠습니다.

```bash
shell> go get -u github.com/nlopes/slack
```

먼저 def.go를 보겠습니다.

```golang
package def

const (
	APIToken  = "xoxb-****-****-****-****"
	ChannelID = "C*********"
)
```

봇을 생성했을 때 슬랙에서 받아놓은 APIToken을 입력합니다.
봇이 참여한 ChannelID도 입력합니다. ChannelID는 slack 채팅 패이지에서 채널 이름위에 마우스를 올려놓으면 아래 브라우저 아래 URL이 표시되는데 ChannelID로 되어 있습니다.

slack.go를 보겠습니다.

```golang
package main

import (
	"fmt"
	"log"
	"os"

	"test/rtm_slack/def"
	"test/rtm_slack/parser"

	"github.com/nlopes/slack"
)

func main() {
	api := slack.New(def.APIToken)
	logger := log.New(os.Stdout, "slack-bot: ", log.Lshortfile|log.LstdFlags)
	slack.SetLogger(logger)
	api.SetDebug(false)
	rtm := api.NewRTM()
	go rtm.ManageConnection()

	for msg := range rtm.IncomingEvents {
		switch ev := msg.Data.(type) {
		case *slack.HelloEvent:
			// Ignore hello

		case *slack.ConnectedEvent:
			fmt.Println("Infos:", ev.Info)
			fmt.Println("Connection counter:", ev.ConnectionCount)

		case *slack.MessageEvent:
			fmt.Printf("Message: %s\n", ev.Text)
			parser.ParseMessage(rtm, ev.Text)
		default:
		}
	}
}
```

import 부분은 크게 세가지로 분류 할 수 있습니다. `fmt`, `log`, `os`는 golang에서 제공하는 패키지 입니다.
`test/rtm_slack/def`와 `test/rtm_slack/parser`는 프로젝트에서 생성한 패키지입니다.
`github.com/nlopes/slack`은 위에서 받아놓은 슬랙봇 라이브러리 입니다.

```golang
api := slack.New(def.APIToken)
```
슬랙봇 라이브러리를 이용하여 새로운 api를 생성합니다.
```golang
	logger := log.New(os.Stdout, "slack-bot: ", log.Lshortfile|log.LstdFlags)
	slack.SetLogger(logger)
	api.SetDebug(false)
```
logger 세팅입니다.

```golang
	rtm := api.NewRTM()
	go rtm.ManageConnection()
```
첫번째 줄은 RealTime Message API를 사용할 수 있게 초기화 하였습니다. 두번째 줄은 goroutine을 이용하여 커넥션 관리를 합니다.
```golang
	for msg := range rtm.IncomingEvents {
		switch ev := msg.Data.(type) {

		case *slack.ConnectedEvent:
			fmt.Println("Infos:", ev.Info)
			fmt.Println("Connection counter:", ev.ConnectionCount)

		case *slack.MessageEvent:
			fmt.Printf("Message: %s\n", ev.Text)
			parser.ParseMessage(rtm, ev.Text)
		default:
		}
	}
```
첫번째 case는 연결이 되었을 때 발생하는 이벤트 입니다.
두번째 case는 슬랙봇이 메시지를 받았을 때 처리하는 부분입니다.
```golang
parser.ParseMessage(rtm, ev.Text)
```
RealTime Message API 인스턴스와 받은 메시지를 ParseMessage 함수로 보내고 있습니다. 

이제 parse.go를 보겠습니다.

```golang
package parser

import (
	"strings"
	"test/rtm_slack/def"

	"github.com/nlopes/slack"
)

func sendMessage(rtm *slack.RTM, msg string) {
	rtm.SendMessage(rtm.NewOutgoingMessage(msg, def.ChannelID))
}

func ParseMessage(rtm *slack.RTM, message string) {
	if strings.HasPrefix(message, "윌리엄") == true {
		sendMessage(rtm, "Hello!")
	}
}
```

받은 메시지에 윌리엄이라는 단어가 시작하면 봇이 반응하도록 하였습니다.

```golang
	if strings.HasPrefix(message, "윌리엄") == true {
		sendMessage(rtm, "Hello!")
	}
```
message가 윌리엄으로 시작하면 `Hello!`를 응답합니다.

![응답]({{site.url}}/assets/res_bot.png)

간단하게 커스터마이즈한 봇을 만들었습니다.

[슬랙봇 rtm_slack은 여기에서 받을 수 있습니다.](https://github.com/swkwon/rtm_slack)