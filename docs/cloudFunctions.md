# Cloud Functions

バックエンドは[Cloud Functions for Firebase](https://firebase.google.com/docs/functions?hl=ja)を用いる。

本ページはHTTPトリガーを除く、Cloud Functionsの設計書である。

HTTPトリガーの設計については[API](./api.md)のページを参照のこと。

## Authenticationトリガー

## user.onCreate

ユーザー作成時に動作する。

Realtime Database上`/secrets/{userId}`にユーザーシークレットを`Crypto`モジュールから設定する。

## user.onDelete

ユーザー削除時に動作する。

Realtime Database上`/secrets/{userId}`を削除する。
