import { PureVoxel } from "../types/pureVoxel";

type PointData = {
  position: number[];
  icon: string;
};

export default function PvoxelToPointData(
  pureVoxels: PureVoxel[]
): PointData[] {
  let result: PointData[] = [];
  for (let i = 0; i < pureVoxels.length; i++) {
    let e = pvoxelToCoordinates(pureVoxels[i]);
    let radius = 1000000;
    result.push({
      position: [e.maxLon, e.maxLat],
      icon: "marker",
    });
    result.push({
      position: [e.minLon, e.maxLat],
      icon: "marker",
    });
    result.push({
      position: [e.maxLon, e.minLat],
      icon: "marker",
    });
    result.push({
      position: [e.minLon, e.minLat],
      icon: "marker",
    });
    result.push({
      position: e.center,
      icon: "marker",
    });
  }

  console.log(result);
  return result;
}

type PvoxleCoordinates = {
  maxLon: number;
  minLon: number;
  maxLat: number;
  minLat: number;
  center: [number, number];
};

function pvoxelToCoordinates(item: PureVoxel): PvoxleCoordinates {
  let minLon = -(180 - (360 / 2 ** item.Z) * (item.X - 0));
  let maxLon = -(180 - (360 / 2 ** item.Z) * (item.X + 1));
  let minLat = 0;
  let maxLat = 0;
  console.log(maxLon);
  return {
    maxLon: maxLon,
    minLon: minLon,
    maxLat: maxLat,
    minLat: minLat,
    center: [(maxLon + minLon) / 2, (maxLat + minLat) / 2],
  };
}
