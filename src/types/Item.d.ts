import { LineObjectData } from "./Line";
import { PointObjectData } from "./Point";
import { VoxelObjectData } from "./Voxel";

type ItemType = "point" | "line" | "voxel";

type ItemDataMap = {
  point: PointObjectData;
  line: LineObjectData;
  voxel: VoxelObjectData;
};

export type Object<T extends ObjectType = ObjectType> = {
  id: number;
  type: "point" | "line" | "voxel";
  isDeleted: boolean;
  isVisible: boolean;
  data: ObjectDataMap[T];
};
