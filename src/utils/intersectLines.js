import invariant from "invariant";
import Line from "../line";
import Vector from "../vector";
import isNumber from "./isNumber";

export default function intersectLines(a, b) {
  invariant(a instanceof Line, "Expected `a` to be a Line instance.");
  invariant(b instanceof Line, "Expected `b` to be a Line instance.");

  if (a.slope === b.slope) {
    return null;
  }

  // Is `a` vertical and `b` valid?
  if (
    !isNumber(a.slope) && !isNumber(a.intercept) &&
    isNumber(b.slope) && isNumber(b.intercept)
  ) {
    return new Vector(0, b.solve(0));
  }

  // Is `b` vertical and `a` valid?
  if (
    !isNumber(b.slope) && !isNumber(b.intercept) &&
    isNumber(a.slope) && isNumber(a.intercept)
  ) {
    return new Vector(0, a.solve(0));
  }

  // Are `a` or `b` invalid?
  if (
    !isNumber(a.slope) || !isNumber(a.intercept) ||
    !isNumber(b.slope) || !isNumber(b.intercept)
  ) {
    return null;
  }

  // Are `a` and `b` parallel to each other?
  if (a.intercept === b.intercept) {
    return new Vector(0, a.intercept);
  }

  const x = (b.intercept - a.intercept) / (a.slope - b.slope);
  const y = a.solve(x);

  // Is the result not NaN (division by zero)
  if (!isNumber(x) || !isNumber(y)) {
    return null;
  }

  return new Vector(x, y);
}
