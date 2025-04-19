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
    let radius = 1000000;
    result.push({
      radius: radius,
      color: [255, 0, 0],
      position: [e.maxLon, e.maxLat],
    });
    result.push({
      radius: radius,
      color: [255, 0, 0],
      position: [e.minLon, e.maxLat],
    });
    result.push({
      radius: radius,
      color: [255, 0, 0],
      position: [e.maxLon, e.minLat],
    });
    result.push({
      radius: radius,
      color: [255, 0, 0],
      position: [e.minLon, e.minLat],
    });
    result.push({
      radius: radius,
      color: [0, 255, 0],
      position: e.center,
    });
  }
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
    color: [0, 255, 255],
    position: [0, -85.0511],
  });
  result.push({
    radius: 200000,
    color: [0, 0, 255],
    position: [0, 85.0511 / 2],
  });
  result.push({
    radius: 200000,
    color: [0, 0, 255],
    position: [0, -85.0511 / 2],
  });
  result.push({
    radius: 200000,
    color: [0, 0, 255],
    position: [0, 85.0511 / 4],
  });
  result.push({
    radius: 200000,
    color: [0, 0, 255],
    position: [0, -85.0511 / 4],
  });
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
