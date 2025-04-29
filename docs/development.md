# Git のルール

## branch について

以下の 4 種類の branch を使用して開発を行う：

- `release`
- `main`
- `dev-PascalCase`
- `fix-PascalCase`

### 運用ルール

- 不要になった `dev` や `fix` の branch は必ず削除すること。

## 新機能の開発を行う場合

- 基本的には `main` から branch を切る。
- 命名規則：`dev-PascalCase`
- 名前は何の機能を開発しているのかが分かるようにすること。

  - 略称は使用しない。
  - 例：`dev-Login`, `dev-NewLayout`
  - `Create`, `Make` などの汎用語は不要。開発 branch であることはプレフィックスで明示されているため。

- 開発が終了したら `main` に Pull Request（PR）を送る。

## 特定の機能を修理する場合

- 既存の機能を修理する場合は `main` から branch を切る。
- 命名規則：`fix-PascalCase`
  - 例：`fix-LoginError`, `fix-HeaderOverlap`
- 開発が終了したら `main` に Pull Request（PR）を送る。

## main

- 新機能や修正がマージされていく主要な branch。
- 適切なタイミングで `release` branch にマージされる。

## release

- この branch にマージされると、自動的に CI/CD によって本番環境へリリースが行われる。

## バージョンの採番

バージョンは SemVer（セマンティック バージョニング）に従って、`vMAJOR.MINOR.PATCH` 形式で管理する。

### 各バージョン番号の意味

- **MAJOR**：後方互換性のない変更を加えたときに上げる（例：仕様変更、大幅な構造変更）。
- **MINOR**：後方互換性を保ったまま、新機能を追加したときに上げる。
- **PATCH**：バグ修正や軽微な変更（UI 微調整など）を行ったときに上げる。

## 補足

- 作業完了後の不要な branch の整理（削除）を忘れずに行うこと。
- Pull Request には、目的や変更内容を簡潔に記述する。
