import { IconTrash, IconEye } from "@tabler/icons-react";
import { Item } from "../types/Item";
type Props = {
  id: number;
  item: Item[];
  setItem: React.Dispatch<React.SetStateAction<Item[]>>;
};
export default function Voxel({ id, item, setItem }: Props) {
  let myItem = item.find(
    (e): e is Item<"voxel"> => e.id === id && e.type === "voxel"
  )!;
  function updateItem(newItem: Item<"voxel">): void {
    const result = item.map((e) => {
      if (e.id === newItem.id) {
        return newItem;
      }
      return e;
    });
    setItem(result);
  }
  return (
    <div className="m-[1.5vh] p-[3%] border-0 border-blue-400 rounded-[4px] bg-[#ececec]">
      <div className="flex items-center">
        <p className="bg-green-200 p-[1%]">Voxel</p>
        <input
          type="text"
          placeholder="色"
          value={myItem.data.color}
          onChange={(e) => {
            updateItem({
              ...myItem,
              data: {
                ...myItem.data,
                color: e.target.value,
              },
            });
          }}
          className="w-[20%] border-gray-500 border-1 mx-[2%] bg-[#FFFFFF]"
        />
        <input
          type="text"
          placeholder="不透明度"
          value={myItem.data.opacity}
          onChange={(e) => {
            updateItem({
              ...myItem,
              data: {
                ...myItem.data,
                opacity: parseFloat(e.target.value),
              },
            });
          }}
          className="w-[20%] border-gray-500 border-1 mx-[2%] bg-[#FFFFFF]"
        />
        <input
          type="text"
          placeholder="サイズ"
          value={myItem.data.size}
          onChange={(e) => {
            updateItem({
              ...myItem,
              data: {
                ...myItem.data,
                opacity: parseFloat(e.target.value),
              },
            });
          }}
          className="w-[20%] border-gray-500 border-1 mx-[2%] bg-[#FFFFFF]"
        />
        <p>ID:{id}</p>
        <IconTrash className="mx-[3%]" />
        <IconEye className="mx-[3%]" />
      </div>
      <div>
        <div className="flex mt-[2%]">
          <input
            type="text"
            placeholder="ボクセルをコンマ区切り"
            className="border-gray-500 border-1 bg-[#FFFFFF] w-[100%] h-[100px] align-top"
          />
        </div>
      </div>
    </div>
  );
}
