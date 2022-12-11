# ConDog-Everything

## ディレクトリ構成

```
  root/
    ├ apps/
    │  └ web-main/
    │       └ package.json
    |
    └ packages/
          ├ eslint-config/ # packages 内のみで使われる共通の eslint の設定
          │ └ package.json
          |
          └ tsconfig/ # packages 内のみで使われる共通の tsの設定ファイル
               └ package.json
```

## npm scripts

```json
  "scripts": {
    "dev:app": "@condog-app/web-main を起動します",
    "build": "全ての app, package をビルドします",
    "lint": "全ての app, package の lint を実行します",
    "lint:fix": "全ての app, package の lint:fix を実行します",
    "format": "プロジェクトのコード全体のフォーマットチェックをします",
    "format:fix": "プロジェクトのコード全体をフォーマットします",
    "type-check": "全ての app, package の type-check を実行します"
  },
```

## セットアップ

### Husky を動かす。

```
hint: The '.husky/pre-commit' hook was ignored because it's not set as executable.
hint: You can disable this warning with `git config advice.ignoredHook false`.
```

上記のようなエラーが出る場合は以下のコマンドを実行し、実行権限を許可してください。

```
chmod ug+x .husky/*
```
