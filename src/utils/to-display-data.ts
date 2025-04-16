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
        (90 / pureVoxels[i].Z ** 2 + 1) * pureVoxels[i].Y,
        (180 / pureVoxels[i].Z ** 2 + 1) * pureVoxels[i].X,
      ],
      //±の条件が怪しい
      altitude:
        ((33554432 * 2) / pureVoxels[i].Z ** 2 + 1) * pureVoxels[i].F -
          (33554432 / pureVoxels[i].Z ** 2) * pureVoxels[i].Z <
        0
          ? -1
          : 1,
      scale: [
        40075016.68 / pureVoxels[i].Z ** 2,
        40075016.68 / pureVoxels[i].Z ** 2,
        33554432 / pureVoxels[i].Z ** 2,
      ],
      color: [255, 0, 0],
    });
  }
  console.log(result);
  return result;
}
