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
  }

  console.log(result);
  return result;
}

type PvoxleCoordinates = {
  maxLon: number;
  minLon: number;
  maxLat: number;
  minLat: number;
};

function pvoxelToCoordinates(item: PureVoxel): PvoxleCoordinates {
  const n = 2 ** item.Z;
  const lonDegPerTile = 360 / n;
  const latDegPerTile = 170.1022 / n; // 85.0511 * 2

  const minLon = -180 + lonDegPerTile * item.X;
  const maxLon = -180 + lonDegPerTile * (item.X + 1);

  const maxLat = 85.0511 - latDegPerTile * item.Y;
  const minLat = 85.0511 - latDegPerTile * (item.Y + 1);
  console.log(maxLon);
  return {
    maxLon: maxLon,
    minLon: minLon,
    maxLat: maxLat,
    minLat: minLat,
  };
}
