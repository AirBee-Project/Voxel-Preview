import { Voxel } from "../types/voxel.d";
import { PureVoxel } from "../types/pureVoxel";

export default function hvoxelsToPvoxels(Voxels: Voxel[]): PureVoxel[] {
  let result: PureVoxel[] = [];
  for (let i = 0; i < Voxels.length; i++) {
    let x: number[] = enumerateRange(Voxels[0].X);
    let y: number[] = enumerateRange(Voxels[0].Y);
    let f: number[] = enumerateRange(Voxels[0].F);
    for (let xindex = 0; xindex < x.length; xindex++) {
      for (let yindex = 0; yindex < y.length; yindex++) {
        for (let findex = 0; findex < f.length; findex++) {
          result.push({
            Z: Voxels[i].Z,
            X: x[xindex],
            Y: y[yindex],
            F: f[findex],
          });
        }
      }
    }
  }
  //重複排除
  result = [...new Set(result)];
  console.log(result);
  return result;
}

function enumerateRange(item: [number, number] | number): number[] {
  let result: number[] = [];
  if (typeof item === "number") {
    result.push(item as number);
  } else {
    let tmp = item as [number, number];
    if (tmp[0] == tmp[1]) {
      result.push(tmp[0]);
    } else {
      tmp = tmp.sort();
      for (let i = tmp[0]; i < tmp[1] + 1; i++) {
        result.push(i);
      }
    }
  }
  return result;
}
