# API

バックエンドは[Cloud Functions for Firebase](https://firebase.google.com/docs/functions?hl=ja)を用いる。

各APIのエンドポイントは`/api/:stage/`というURLから始まる。`stage`は`prodction`/`staging`/`development`が入り、ステージを分岐する。

なお、`stage`が、上記のいずれでもなかった場合は

- code: `invalid-argument`
- message: `Invalid Stage`

を返却する。

## onCall `room`

ルーム作成し、ルームIDを返す。

IDは`Realtime Database`で自動生成されるものを用いる。

### レスポンス

#### 成功

- status: `201`

```json
{
  "roomId": "{roomId}"
}
```

## onCall `enter`

ルームへの入場を宣言する。

リクエストが適切な場合、以下を設定。

- user.nameをリクエスト`name`から設定
- user.pointsを`0`に設定
- user.stateを`pending`に設定
- user.secretを`crypto.randomBytes->toString`で生成・設定

### リクエスト

```json
{
  "roomId": "{roomId}",
  "name": "{userName}"
}
```

### レスポンス

#### 成功

- status: `201`

```json
{}
```

#### エラー

|type|code|message|備考|
|---|---|---|---|
|`:roomId`が存在しない|`not-found`|Room Not Found||
|`name`が不正|`out-of-range`|Invalid Name|`name`は1字以上かつ20字以下である必要が有る|
|`name`が重複|`already-exists`|Conflict Name|`name`はルーム内で一意である必要が有る|
|すでに入室済み|`already-exists`|Already Entered|`Room.users`に`uid`が存在していない必要が有る|

## onCall `ready`

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
  "roomId": "{roomId}",
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
|`:roomId`が存在しない|`not-found`|Room Not Found||
|ルーム内にユーザが存在しない|`permission-denied`|Invalid Request||
|`RoomState`が`playing`|`failed-precondition`|Playing Room|`RoomState`が`waiting`のときのみreadyできる|
|すでにReady済み|`failed-precondition`|Already Ready|`UserState`が`pending`のときのみreadyできる|

## onCall `answer`

`writer`でないユーザーが回答する。

`writer`以外の全員が`pending`になるか正答が出たとき以下を設定。

- `currentRound.winner`を回答者に設定
- 回答者にポイントを付与
- `UserState`が`pending`のユーザー数×倍率のポイントを`writer`に付与
- 全員の`UserState`を`pending`に設定

回答に成功したとき、正答、誤答に関わらず`UserState`を`pending`にする。

### リクエスト

```json
{
  "roomId": "{roomId}",
  "answer": "{answerUserId}"
}
```

### レスポンス

#### 成功

- status: `200`

```json
{
  "correct": "{isCorrectAnswer: bool}"
}
```

#### エラー

|type|code|message|備考|
|---|---|---|---|
|`:roomId`が存在しない|`not-found`|Room Not Found||
|ルーム内にユーザが存在しない|`permission-denied`|Invalid Request||
|`answer`が不正|`invalid-argument`|Invalid Answer||
|自身を回答|`invalid-argument`|Self Answer|`uid`と`answer`は異なる必要がある|

## onRequest `POST /api/report`

レポートを投稿する。

### リクエスト

```json
{
  "content": "{reportContent}"
}
```

### レスポンス

#### 成功

- status: `201`
