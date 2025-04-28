import { LineObjectData } from "./LineObjectData";
import { PointObjectData } from "./PointObjectData";
import { VoxelObjectData } from "./VoxelObjectData";

type ObjectType = "point" | "line" | "voxel";

type ObjectDataMap = {
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
