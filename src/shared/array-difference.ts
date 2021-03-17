export function arrayDifference(
  firstArray: Array<any>,
  secondArray: Array<any>,
) {
  const firstSet = new Set(firstArray);
  const secondSet = new Set(secondArray);

  return Array.from(new Set([...firstSet].filter((x) => !secondSet.has(x))));
}
