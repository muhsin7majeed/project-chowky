import type { DIMENSION_UNITS, WEIGHT_UNITS } from "@/constants/common";

export interface GenericLabelValue<T = string> {
  label: string;
  value: T;
}

export type DimensionUnit = (typeof DIMENSION_UNITS)[keyof typeof DIMENSION_UNITS];

export type WeightUnit = (typeof WEIGHT_UNITS)[keyof typeof WEIGHT_UNITS];

export interface Dimension {
  value: number;
  unit: DimensionUnit;
}

export interface Weight {
  value: number;
  unit: WeightUnit;
}
