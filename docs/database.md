# データベース

メインのデータベースには[Firebase Realtime Database](https://firebase.google.com/docs/database?hl=ja)を採用
（Firestoreを用いない理由としてはコードの更新が頻繁に行われドキュメント書き込み2万件/日の制限に容易に到達するため）。

サブのデータベースには[Cloud Firestore](https://firebase.google.com/docs/firestore?hl=ja)を採用。こちらはIssueなどレポートを保管する。

Realtime Databaseはドキュメント指向なNoSQLのデータベースでありJSONデータとして保存される。

## スキーマ

実装は[`types.ts`](../hosting/src/types/types.ts)を参考のこと。

特に明記しない限りRealtime Databaseを用いる。

### `/secrets/{userId}`: `string`

ここで定義されるシークレット値は、APIを利用する際にユーザーを識別・認証に用いる。

### `/{stage}/rooms/{roomId}`: `Room`

- `stage`には`production`/`staging`/`development`をとり、ステージを分割する。
- `roomId`ではRealtime Databaseから自動で割り当てられたユニークなIDを利用する。

```typescript
type Room = {
  currentRound: Round,
  users: Users,
  history: Round[],
  state: RoomState
};
```

### `/{stage}/rooms/{roomId}/currentRound`: `Round`

```typescript
type Round = {
  problemUrl: string,
  code: string,
  language: Language,
  writer?: UserID,
  winner?: UserID
};
```

### `/{stage}/rooms/{roomId}/users`: `RoomUsers`

```typescript
type RoomUsers = {
  [id: string]: User
};
```

#### `/{stage}/rooms/{roomId}/users/{userId}`: `User`

```typescript
type User = {
  name: string, // 0 < length <= 20
  points: number,
  state: UserState
};
type UserID = string; // firebase.User.uid
type UserState = 'pending' | 'ready' | 'playing';
```

### `/{stage}/rooms/{roomId}/state`: `RoomState`

```typescript
type RoomState = 'playing' | 'waiting'
```

### `/reports/{reportId}`: `Report`

**このレコードはFirestoreに保存する**

- `reportId`ではFirestoreから自動で割り当てられたユニークなIDを利用する。

```typescript
type Report = {
  createdAt: Date
  content: string // non empty
}
```
