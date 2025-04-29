# コーディングルール

## 命名規則

- 単語は短縮せず、すべて記述する
- **抽象的な型 → 具体的な型 → コンポーネント** の順番を意識する
- 型とコンポーネントの名前は可能な限り一致させる
- 大きく作って後から汎用性のあるものを分割する
- 繰り返しは避ける
- **複数形は禁止**、すべて**単数形**で命名する（複数表現は型情報で区別）

## ディレクトリごとの命名ルール

### `/types`

- **命名:** `PascalCase`
- **ファイル名:** 型名と一致、`型名.d.ts`
- **型:** 基本単数形
  - ❌ `Voxels`
  - ✅ `Voxel`
  - 配列は `Voxel[]` のように表現
- 型の包含関係を意識した命名を行う
- 分かりにくい構造の場合、最上位型にコメントを残す
- `Data`や`Type`といった冗長な接尾辞は不要
- 階層構造を持つ場合、`Definition`を使用

### `/components`

- **命名:** `PascalCase`
- **ファイル名:** コンポーネント名と一致
- **補足:** コンポーネントであることはエディタ表示で自明のため、ファイル名に記載しない

### 関数

- **命名:** `camelCase`
- **型 + 処理内容**を意識する
  - 例: `型A[] → 型B[]` に対して `convert型Ato型B`
- 処理内容が分かるように、`convert`, `select`, `filter`などの語を使用

### `/utils`

- **命名:** ファイル名・関数名ともに`camelCase`
- 関数であることはディレクトリ構成で自明のため、ファイル名で明示する必要なし
- 役割が明確な命名
- **保存対象:**
  - 複雑な関数（保守性向上のため）
  - 複数ファイルから参照される関数

### 変数

- **命名:** `camelCase`
- **単数形**で表現（複数性は型で表現）

### 定数

- 単なる`const`ではなく、**意味のある不変値**を定数とする
- **命名:** `UPPER_SNAKE_CASE`

```typescript
const INITIAL_VIEW_STATE = {
  longitude: 139.6917,
  latitude: 35.6895,
  zoom: 15,
  pitch: 60,
  bearing: 0,
};
```

## ステート管理

### State の定義

```typescript
const [item, setItem] = useState<Item[]>([]);
```

- `[変数名, set+変数名]` の形式で命名

### 子コンポーネントへのステート受け渡し

#### 親コンポーネント側

```tsx
// App.tsx
export default function App() {
  const [item, setItem] = useState<Item[]>([]);

  return <Point id={1} item={item} setItem={setItem} />;
}
```

#### 子コンポーネント側

```tsx
// components/Point.tsx
import { Item } from "../types/Item";

type Props = {
  id: number;
  item: Item[];
  setItem: React.Dispatch<React.SetStateAction<Item[]>>;
};

export default function Point({ id, item, setItem }: Props) {
  // 何らかの処理...

  return (
    // DOMを返す...
  );
}
```

- 子コンポーネントでも**親と同じ変数名・関数名**を用いる
- 明確なデータフローと可読性を確保する
