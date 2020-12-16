# Svelte + Firebase Template
## 使用技術
- TypeScript
- Firebase
- Svelte
- [Svelte Materialify](https://svelte-materialify.vercel.app/) (Vuetifyみたいなやつ)

## 使い方
`src/env.ts`にFirebaseのconfigを書きます
```bash
yarn insatll
yarn dev // => localhost:5000 を開く
```

## ディレクトリ構成

### src/routes.ts

ルーティングはこのファイルに記述します

### src/routes/

ページコンポーネントはこのディレクトリ以下に記述します。
ログインページでしか使わないコンポーネントなどは、`src/login/_components/`以下に配置しましょう。
その場合、ログインページは`src/login/index.svelte`に記述しましょう

### src/models/

Rails の Model のようなものです。データに関するロジックは`.svelte`には書かずに、モデルファイルに書くようにしましょう。
