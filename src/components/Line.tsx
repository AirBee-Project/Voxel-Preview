import { IconTrash, IconEye } from "@tabler/icons-react";
import { Item } from "../types/Item";
type Props = {
  id: number;
  item: Item[];
  setItem: React.Dispatch<React.SetStateAction<Item[]>>;
};
export default function Line({ id, item, setItem }: Props) {
  let myItem = item.find(
    (e): e is Item<"line"> => e.id === id && e.type === "line"
  )!;
  function updateItem(newItem: Item<"line">): void {
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
        <p className="bg-blue-200 p-[1%]">Line</p>
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
          type="number"
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
                size: parseFloat(e.target.value),
              },
            });
          }}
          className="w-[20%] border-gray-500 border-1 mx-[2%] bg-[#FFFFFF]"
        />
        <p>ID:{myItem.id}</p>
        <IconTrash className="mx-[3%]" />
        <IconEye className="mx-[3%]" />
      </div>
      <div>
        <div className="flex mt-[2%]">
          <p>始点</p>
          <input
            type="number"
            placeholder="経度"
            value={myItem.data.lon1}
            onChange={(e) => {
              updateItem({
                ...myItem,
                data: {
                  ...myItem.data,
                  lon1: parseFloat(e.target.value),
                },
              });
            }}
            className="border-gray-500 border-1 mx-[2%] bg-[#FFFFFF] w-[35%]"
          />
          <input
            type="number"
            placeholder="緯度"
            value={myItem.data.lat1}
            onChange={(e) => {
              updateItem({
                ...myItem,
                data: {
                  ...myItem.data,
                  lat1: parseFloat(e.target.value),
                },
              });
            }}
            className="border-gray-500 border-1 mx-[2%] bg-[#FFFFFF] ml-[3%] w-[35%]"
          />
        </div>
      </div>
      <div>
        <div className="flex mt-[2%]">
          <p>終点</p>
          <input
            type="number"
            placeholder="経度"
            value={myItem.data.lon2}
            onChange={(e) => {
              updateItem({
                ...myItem,
                data: {
                  ...myItem.data,
                  lon2: parseFloat(e.target.value),
                },
              });
            }}
            className="border-gray-500 border-1 mx-[2%] bg-[#FFFFFF] w-[35%]"
          />
          <input
            type="number"
            placeholder="緯度"
            value={myItem.data.lon2}
            onChange={(e) => {
              updateItem({
                ...myItem,
                data: {
                  ...myItem.data,
                  lat2: parseFloat(e.target.value),
                },
              });
            }}
            className="border-gray-500 border-1 mx-[2%] bg-[#FFFFFF] ml-[3%] w-[35%]"
          />
        </div>
      </div>
    </div>
  );
}
