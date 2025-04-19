import { PureVoxel } from "../types/pureVoxel";

export default function pureVoxelToString(pureVoxels: PureVoxel[]): string {
  let result: string = "";
  for (let i = 0; i < pureVoxels.length; i++) {
    let p = pureVoxels[i];
    result = result + p.Z + "/" + p.X + "/" + p.Y + "/" + p.F + ",";
  }
  return result + "合計：" + String(pureVoxels.length) + "個";
}
