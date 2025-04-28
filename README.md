# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

# コーディングルール

## 命名規則

### /types

- `PascalCase` で命名を行う
- ファイル名と export する型の名前は一致させる
- ファイル名は `型名`+`.d.ts`とする
- 基本的に単数形の型で定義する
  - `Voxels`という型は定義してはいけない
  - `Voxel`という型を定義して、複数個を並べたい場合は`Voxel[]`として使う
- 可能な限り型の包含関係が分かりやすいように命名を行う
- 分かりにくいと判断した場合は最も上位の型（App.tsx やコンポーネントや関数から参照されるであろう型）に対して構造をコメントで残しておく
- `Data`や`Type`と言った言葉を使用する必要はない。それが型であることはファイル名や文法から自明であるためである。
- 値が階層構造を取っている場合は`Value`を用いる
