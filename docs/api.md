# API

バックエンドは[Cloud Functions for Firebase](https://firebase.google.com/docs/functions?hl=ja)を用いる。

各APIのエンドポイントは`/api/:stage/`というURLから始まる。`stage`は`prodction`/`staging`/`dev`が入り、ステージを分岐する。

なお、`stage`が、上記のいずれでもなかった場合は

- status: `400`
- message: `Invalid stage`

を返却する。

## `GET /api/:stage/roomid`

ルーム作成し、ルームIDを返す。

IDは`Realtime Database`で自動生成されるものを用いる。

### レスポンス

```json
{
  "id": "{roomId}"
}
```

## `POST /api/:stage/:roomId/enter`

ルームへの入場を宣言する。

リクエストが適切な場合、以下を設定。

- user.nameをリクエスト`name`から設定
- user.pointsを`0`に設定
- user.stateを`pending`に設定
- user.secretを`crypto.randomBytes->toString`で生成・設定

### リクエスト

```json
{
  "uid": "{userId}",
  "name": "{userName}"
}
```

### レスポンス

#### 成功

- status: `200`

```json
{}
```

#### エラー

|type|code|message|備考|
|---|---|---|---|
|`:roomId`が存在しない|404|Room Not Found||
|`uid`が存在しない|401|Unauthenticated User||
|`name`が不正|400|Invalid Name|`name`は1字以上かつ20字以下である必要が有る|
|`name`が重複|409|Conflict Name|`name`はルーム内で一意である必要が有る|
|すでに入室済み|400|Already Entered|`Room.users`に`uid`が存在していない必要が有る|

## `PUT /api/:stage/:roomId/ready`

自身の`UserState`を`ready`にする。

全員の`UserState`が`ready`になったとき以下を設定。

- `History`に`currentRound`をプッシュ
- `currentRound`の初期化
  - `problemUrl`を設定
  - `code`をクリア
  - `writer`をランダムに設定
  - `winner`をクリア

### リクエスト

```json
{
  "uid": "{userId}",
  "secret": "{userSecret}"
}
```

### レスポンス

#### 成功

- status: `200`

```json
{}
```

#### エラー

|type|code|message|備考|
|---|---|---|---|
|`:roomId`が存在しない|404|Room Not Found||
|`uid`が存在しない|401|Unauthenticated User||
|`secret`が誤っている|401|Invalid Secret||
|`RoomState`が`playing`|400|Playing Room|`RoomState`が`waiting`のときのみreadyできる|
|すでにReady済み|400|Already Ready|`UserState`が`pending`のときのみreadyできる|

## `POST /api/:stage/:roomId/answer`

`writer`でないユーザーが回答する。

### リクエスト

```json
{
  "uid": "{userId}",
  "answer": "{answerUser}"
}
```
