import { PureVoxel } from "../types/pureVoxel.types";
import { displayCube } from "../types/displaycube";

export default function toDisplayData(pureVoxels: PureVoxel[]): displayCube[] {
  //ボクセルのPureIDから中心点、縦、横、奥行きの長さを作成する
  let result: displayCube[] = [];
  console.log(pureVoxels);
  for (let i = 0; i < pureVoxels.length; i++) {
    result.push({
      position: [
        //ここは180-0 360-0が範囲でなければならない
        0, 0,
      ],
      //±の条件が怪しい
      altitude: 1,
      scale: [
        40075016.68 / 2 ** (pureVoxels[i].Z + 1),
        40075016.68 / 2 ** (pureVoxels[i].Z + 1),
        33554432 / 2 ** pureVoxels[i].Z,
      ],
      color: [255, 125, 125, 100],
    });
  }
  console.log(result);
  return result;
}
