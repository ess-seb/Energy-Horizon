export const MAX_POINTS_PER_SERIES = 5000;

export class PointCapExceededError extends Error {
  readonly name = "PointCapExceededError";

  constructor(
    public readonly maxPoints: number,
    public readonly actual: number
  ) {
    super(`Timeline length ${actual} exceeds maximum ${maxPoints} points per series`);
  }
}

export function assertPointCountWithinCap(timelineLength: number): void {
  if (!Number.isFinite(timelineLength) || timelineLength < 0) {
    return;
  }
  if (timelineLength > MAX_POINTS_PER_SERIES) {
    throw new PointCapExceededError(MAX_POINTS_PER_SERIES, timelineLength);
  }
}
