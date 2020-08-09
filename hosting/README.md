# code jinro (frontend)

code jinroのフロントエンドを管理するディレクトリ。

`create-react-app`により`React`+`TypeScript`で構築。

## ディレクトリ構成

- `/src`: ソースファイル群
- `/public`: 静的ファイル群
- `/build`: 生成ファイル群(Hosting対象)

## 利用方法

- `npm start`: 開発サーバー起動，フロントエンドのみの動作確認
- `npm run build`: プロダクションビルド生成
- `npm run build:staging`: ステージングビルド生成
- `npm run lint`: Lintチェック
- `npm run lint:fix`: Lintチェック及び自動修正
