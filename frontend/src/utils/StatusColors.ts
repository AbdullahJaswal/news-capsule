import { Capsule } from "@/common/types/Capsule/Capsule";

export const borderColorClasses: Record<Capsule["status"], string> = {
  B: "border-error",
  F: "border-warning",
  N: "border-primary",
};
export const textColorClasses: Record<Capsule["status"], string> = {
  B: "text-error",
  F: "text-warning",
  N: "text-primary",
};
export const scrollbarColorClasses: Record<Capsule["status"], string> = {
  B: "scrollbar-thumb-error",
  F: "scrollbar-thumb-warning",
  N: "scrollbar-thumb-primary",
};
export const shadowClasses: Record<Capsule["status"], string> = {
  B: "shadow-lg shadow-error/20",
  F: "shadow-lg shadow-warning/20",
  N: "shadow-lg shadow-primary/20",
};
