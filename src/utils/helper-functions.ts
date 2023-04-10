export function getDatatypeName(data: any) {
  const prototypeName = Object.prototype.toString.call(data);
  const regexSelector = /\[object\s|\]/;
  return prototypeName.replaceAll(regexSelector, "").toLocaleLowerCase();
}
