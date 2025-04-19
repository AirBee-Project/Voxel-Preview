import type { Voxel } from "../types/voxel.d";

export default function hyperVoxelParse(voxelsString: string): Voxel[] {
  voxelsString = voxelsString.replace("[", "");
  voxelsString = voxelsString.replace("]", "");
  voxelsString = voxelsString.replace(/'/g, "");
  let voxelStringList: String[] = voxelsString.split(",");
  let result: Voxel[] = [];

  if (voxelStringList.length === 0) {
    return result;
  }

  //時間に関する情報を削除
  voxelStringList = voxelStringList.map((voxelString) => {
    if (voxelString.indexOf("_") != -1) {
      return voxelString.substring(0, voxelString.indexOf("_"));
    }
    return voxelString;
  });
  //型に変換
  for (let i = 0; i < voxelStringList.length; i++) {
    if (voxelStringList[i] === "") {
      continue;
    }
    let voxelParseList = voxelStringList[i].split("/");
    let zValue: number = Number(voxelParseList[0]);
    let resultVoxel: Voxel = {
      Z: zValue,
      X: parseDimensionRange(zValue, "X", voxelParseList[1]),
      Y: parseDimensionRange(zValue, "Y", voxelParseList[2]),
      F: parseDimensionRange(zValue, "F", voxelParseList[3]),
    };
    result.push(resultVoxel);
  }
  console.log(result);
  return result;
}

function parseDimensionRange(
  zoomLevel: number,
  dimension: "X" | "Y" | "F",
  item: string
): number | [number, number] {
  if (item === "-") {
    if (dimension == "F") {
      return [2 ** zoomLevel - 1, -(2 ** zoomLevel)];
    } else {
      if (zoomLevel == 0) {
        return 0;
      } else {
        return [0, 2 ** zoomLevel - 1];
      }
    }
  } else if (item.indexOf(":") != -1) {
    let itemList = item.split(":");
    let numberItemList: number[] = itemList.map((num) => Number(num));
    numberItemList = numberItemList.sort();
    return [numberItemList[0], numberItemList[1]];
  } else {
    return Number(item);
  }
}
