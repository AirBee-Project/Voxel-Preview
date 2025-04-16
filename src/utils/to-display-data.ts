import { PureVoxel } from "../types/pureVoxel.types";
import { Cube } from "../types/cube.types";

export default function toDisplayData(pureVoxels: PureVoxel[]): Cube[] {
  //ボクセルのPureIDから中心点、縦、横、奥行きの長さを作成する
  let result: Cube[] = [];
  for (let i = 0; i < pureVoxels.length; i++) {
    result.push({
      center: {
        latitude_deg: (90 / pureVoxels[i].Z ** 2 + 1) * pureVoxels[i].Y,
        longitude_deg: (180 / pureVoxels[i].Z ** 2 + 1) * pureVoxels[i].X,
        altitude_m:
          ((33554432 * 2) / pureVoxels[i].Z ** 2 + 1) * pureVoxels[i].F -
            (33554432 / pureVoxels[i].Z ** 2) * pureVoxels[i].Z <
          0
            ? -1
            : 1,
      },
      height_m: 33554432 / pureVoxels[i].Z ** 2,
      width_m: 40075016.68 / pureVoxels[i].Z ** 2,
      depth_m: 40075016.68 / pureVoxels[i].Z ** 2,
    });
  }
  return result;
}
