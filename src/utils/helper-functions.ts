export function getDatatypeName(data: any) {
  const prototypeName = Object.prototype.toString.call(data);
  return prototypeName.replaceAll(/\[object\s|\]/g, "").toLocaleLowerCase();
}
