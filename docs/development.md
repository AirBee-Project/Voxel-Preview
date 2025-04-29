# Git のルール

## branch について

- release
- main
- dev-`PascalCase`
- fix-`PascalCase`

の 4 種類の branch で開発を行う。

- 不要になった dev や fix の branch は必ず削除すること

## 新機能の開発を行う場合

- 基本的には`main`から branch を切る。
- dev-`PascalCase`で branch を命名。
- 名前は何の機能を開発しているのか分かりやすいように
  - 略称は使ってはならない
  - `dev-Login`,`dev-NewLayout`など
  - `Create`,`Make`などは開発 branch であることが分かっているので、書く必要がない
- 開発が終了したら`main`に PR を送る

## 特定の機能を修理する場合

- 既存の機能を修理する場合は main`から branch を切る。
- fix-`PascalCase`で branch を命名。
- 開発が終了したら`main`に PR を送る

## main

- main に新機能、修理が蓄積される
- 適切なタイミングで release にマージされる

## release

- ここにマージされると自動的に CD/CI でリリースが行われる
