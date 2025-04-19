import { PureVoxel } from "../types/pureVoxel";

type PointData = {
  position: number[];
  color: number[];
  radius: number;
};

export default function PvoxelToPointData(
  pureVoxels: PureVoxel[]
): PointData[] {
  let result: PointData[] = [];
  for (let i = 0; i < pureVoxels.length; i++) {
    let e = pvoxelToCoordinates(pureVoxels[i]);
    let radius = 1000;
    result.push({
      radius: radius,
      color: [255, 0, 0],
      position: [e.maxLat, e.maxLon],
    });
    result.push({
      radius: radius,
      color: [255, 0, 0],
      position: [e.minLat, e.maxLon],
    });
    result.push({
      radius: radius,
      color: [255, 0, 0],
      position: [e.maxLat, e.minLon],
    });
    result.push({
      radius: radius,
      color: [255, 0, 0],
      position: [e.minLat, e.minLon],
    });
    result.push({
      radius: radius,
      color: [0, 255, 0],
      position: e.center,
    });
  }
  console.log(result);
  result.push({
    radius: 200000,
    color: [0, 0, 255],
    position: [0, 0],
  });
  result.push({
    radius: 200000,
    color: [0, 0, 255],
    position: [180, 0],
  });
  result.push({
    radius: 200000,
    color: [0, 0, 255],
    position: [-180, 0],
  });
  result.push({
    radius: 200000,
    color: [0, 0, 255],
    position: [90, 0],
  });
  result.push({
    radius: 200000,
    color: [0, 0, 255],
    position: [-90, 0],
  });
  result.push({
    radius: 200000,
    color: [0, 0, 255],
    position: [0, 85.0511],
  });
  result.push({
    radius: 200000,
    color: [0, 0, 255],
    position: [0, -85.0511],
  });
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
  let minLon = 180 - (360 / 2 ** item.Z) * (item.X + 1);
  let maxLon = 180 - (360 / 2 ** item.Z) * item.X;
  let minLat = 90 - (180 / 2 ** item.Z) * (item.Y + 1);
  let maxLat = 90 - (180 / 2 ** item.Z) * item.Y;
  return {
    maxLon: maxLon,
    minLon: minLon,
    maxLat: maxLat,
    minLat: minLat,
    center: [(maxLon + minLon) / 2, (maxLat + minLat) / 2],
  };
}
