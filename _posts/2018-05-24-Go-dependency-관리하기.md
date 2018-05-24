---
layout: post
title:  Go dependency 관리하기 - godep
date:   2018-05-24 16:00:00 +0900
categories: [go]
---

## 오픈소스 라이브러리

개발 하다보면 누군가 구현해 놓은 좋은 라이브러리들을 사용할 때가 많습니다.
하지만 특정 버전의 라이브러리를 쓰길 원할 때가 있습니다. 또한 신규 버전의 라이브러리와 구버전의 라이브러리를
모두 사용하고 싶을 때가 있습니다. 

## godep으로 관리하기

godep은 개발하는 프로젝트의 dependency를 관리해줍니다. 먼저 godep을 설치 합니다.

```text
> go get github.com/tools/godep
```

간단한 프로그램을 작성해봤습니다.

```go
package main

import (
	"log"

	"github.com/dgraph-io/badger"
)

func main() {
	opts := badger.DefaultOptions
	opts.Dir = "./"
	opts.ValueDir = "./"
	db, err := badger.Open(opts)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	err = db.Update(func(txn *badger.Txn) error {
		return txn.Set([]byte("age"), []byte("42"))
	})
	if err != nil {
		log.Fatal(err)
	}

	err = db.View(func(txn *badger.Txn) error {
		itm, rerr := txn.Get([]byte("age"))
		if rerr != nil {
			return rerr
		} else {
			v, rerr := itm.Value()
			if rerr != nil {
				return rerr
			}
			log.Printf("value is %s\n", v)
		}
		return nil
	})
}
```

main의 내용이 크게 의미있는건 없습니다. 여기서 중요한건 `"github.com/dgraph-io/badger"`을 사용한다는 것입니다. `badger`는 로컬 컴퓨터에 key/value 데이터 store를 만들어주는 라이브러리 입니다. 

```text
C:\GoCode
|-- bin
|-- pkg
|-- src
    |-- MyProject
        |-- main.go
```

프로젝트 구조가 위와 같을 때

```text
> cd C:\GoCode\src\MyProject
```

현재 위치를 바꿉니다.
그리고 아래와 같이 실행합니다.

```text
> godep.exe save
```

godep은 `C:\GoCode\bin`에 위치 합니다. 
만약에 `C:\GoCode\bin`가 PATH에 없다면 아래와 같이 입력하던가 PATH에 추가해줍니다.

```text
> C:\GoCode\bin\godep save
```

그러면 프로젝트 폴더에 두개의 하위 폴더가 생성됩니다.

```text
C:\GoCode
|-- bin
|-- pkg
|-- src
    |-- MyProject
        |-- Godeps
        |-- vendor
        |-- main.go
```

`Godeps`폴더는 종속적인 라이브러리 정보가 들어 있고, `vendor`에는 종속적인 라이브러리 소스가 들어가게 됩니다. Godeps와 vendor는 SCM에 추가해 줍니다.
종속적인 라이브러리는 원래 `$GOPATH\src\`에 있으며 단순 빌드를 할 경우 그 위치에 있는 라이브러리를 참조 합니다. 그러나 우리는 godeps로 따로 뽑아놓은 버전의 라이브러리를 사용할 겁니다. godeps로 뽑아놓은 라이브러리로 빌드하려면 아래와 같습니다.

```text
> godep go build
```

godep으로 빌드 하면 save한 라이브러리를 참조하여 빌드 합니다.

vendor의 라이브러리를 GOPATH로 복구할 수도 있습니다.

```text
> godep restore
```

이렇게 하면 vendor의 내용이 $GOPATH로 복구가 됩니다.

끝 :)