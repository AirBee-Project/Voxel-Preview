import { IconTrash, IconEye } from "@tabler/icons-react";
import { Item } from "../types/Item";
type Props = {
  id: number;
  item: Item[];
  setItem: React.Dispatch<React.SetStateAction<Item[]>>;
};
export default function PointObject({ id, item, setItem }: Props) {
  let myItem = item.find((e) => {
    return e.id === id;
  });
  return (
    <div className="m-[1.5vh] p-[3%] border-0 border-blue-400 rounded-[4px] bg-[#ececec]">
      <div className="flex items-center">
        <p className="bg-amber-200 p-[1%]">Point</p>
        <input
          type="text"
          placeholder="色"
          value={myItem?.data.color}
          className="w-[20%] border-gray-500 border-1 mx-[2%] bg-[#FFFFFF]"
        />
        <input
          type="number"
          placeholder="不透明度"
          value={myItem?.data.opacity}
          min={0}
          max={100}
          className="w-[20%] border-gray-500 border-1 mx-[2%] bg-[#FFFFFF]"
        />
        <input
          type="number"
          placeholder="サイズ"
          value={myItem?.data.size}
          min={0}
          className="w-[20%] border-gray-500 border-1 mx-[2%] bg-[#FFFFFF]"
        />
        <p>ID:{id}</p>

        <IconTrash className="mx-[3%]" />
        <IconEye className="mx-[3%]" />
      </div>
      <div>
        <div className="flex mt-[2%]">
          <p>経度</p>
          <input
            type="number"
            placeholder="経度"
            value={myItem?.data.lat}
            max={180}
            min={-180}
            className="border-gray-500 border-1 mx-[2%] bg-[#FFFFFF]"
          />
          <p>緯度</p>
          <input
            type="number"
            placeholder="緯度"
            max={90}
            min={-90}
            className="border-gray-500 border-1 mx-[2%] bg-[#FFFFFF] ml-[3%]"
          />
        </div>
      </div>
    </div>
  );
}
