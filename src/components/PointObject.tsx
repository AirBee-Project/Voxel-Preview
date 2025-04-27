import { IconTrash, IconEye } from "@tabler/icons-react";
export default function PointObject() {
  return (
    <div className="m-[1.5vh] p-[3%] border-0 border-blue-400 rounded-[4px] bg-[#ececec]">
      <div className="flex items-center">
        <p className="bg-amber-200 p-[1%]">Point</p>
        <input
          type="text"
          placeholder="色"
          className="w-[20%] border-gray-500 border-1 mx-[2%] bg-[#FFFFFF]"
        />
        <input
          type="text"
          placeholder="不透明度"
          className="w-[20%] border-gray-500 border-1 mx-[2%] bg-[#FFFFFF]"
        />
        <input
          type="text"
          placeholder="サイズ"
          className="w-[20%] border-gray-500 border-1 mx-[2%] bg-[#FFFFFF]"
        />
        <IconTrash className="mx-[3%]" />
        <IconEye className="mx-[3%]" />
      </div>
      <div>
        <div className="flex mt-[2%]">
          <input
            type="text"
            placeholder="経度"
            className="border-gray-500 border-1 mx-[2%] bg-[#FFFFFF]"
          />
          <input
            type="text"
            placeholder="緯度"
            className="border-gray-500 border-1 mx-[2%] bg-[#FFFFFF] ml-[3%]"
          />
        </div>
      </div>
    </div>
  );
}
