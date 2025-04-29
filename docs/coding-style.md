# コーディングルール

## 命名規則

- 単語は短縮せず全て書く
- 抽象的な型 ⇒ 具体的な型 ⇒ コンポーネントという順番を意識
- 型とコンポーネントの名前は可能な限り一致させる
- 大きく作って後から汎用性のあるものは分割する
- 繰り返しは避ける
- 型情報で複数形か単数かを区別する。基本的に複数形は使用しない。全て単数形で明記すること。

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
- 値が階層構造を取っている場合は`Definition`を用いる

### /components

- `PascalCase` で命名を行う
- ファイル名と export するコンポーネントの名前は一致させる
- コンポーネントであることはエディタの表示で分かる

### 関数

- `camelCase`で命名を行う
- 型+名前で情報を判断できるようにする `型A[]⇒型B[]`のような形だと理想的
  - 後はここに`Convert`,`Select`, `Filter`のような名前をつけることで役割をイメージさせる

### /utils

- ファイル名も関数名も`camelCase`で命名を行う
- ファイルの Dir から関数であることは自明であるため、ファイル名に関数であることを含める必要はない
- 型も含めて、役割を判断できるような命名を
- 複雑な関数や複数のファイルから参照する関数を保存する
  - 複雑な関数 ⇒.tsx のファイルの可読性の向上、保守性の向上のために保存
  - 複数ファイルから参照する関数 ⇒ 当たり前

### 変数

- `camelCase`で命名を行う
- 基本的に単数形で表記する。複数形の情報は型を用いて表現する。

### 定数

- 単に`const`で定義したものを定数というわけではない
- 広いスコープで変化せず、値そのものに意味がある場合にそれを定数とする
- `UPPER_SNAKE_CASE`で命名を行う

```JavaScript
const INITIAL_VIEW_STATE = {
  longitude: 139.6917,
  latitude: 35.6895,
  zoom: 15,
  pitch: 60,
  bearing: 0,
};
```

### State（変数+関数）

#### State の定義

```TypeScript
const [item, setItem] = useState<Item[]>([]);
```

のような形が理想的である。

- `[変数名,set+変数名]`の形で作成

#### 子コンポーネントへのステートの受け渡し

State を定義した親コンポーネント

```tsx:App.tsx
export default function App() {
  const [item, setItem] = useState<Item[]>([]);
  return(
    <Point id={1} item={item} setItem={setItem} />
  )
}
```

State が渡された子コンポーネントの Props の定義

```tsx:/components/Point.tsx
import { Item } from "../types/Item";
type Props = {
  id: number;
  item: Item[];
  setItem: React.Dispatch<React.SetStateAction<Item[]>>;
};

export default function PointObject({ id, item, setItem }: Props) {
  何らかの処理....
  return(
    DOMを返す...
  )
}
```

基本的に子コンポーネントでも親のステートと同じ名前の関数と変数を用意し、そこに受け渡しを行う。
