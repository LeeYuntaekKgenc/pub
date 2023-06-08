export const isJsonString = (str) => {
  try {
    var json = JSON.parse(str);
    return typeof json === "object";
  } catch (e) {
    return false;
  }
};

export const checkArrowFunc = (func) => {
  if (func.includes("=>")) func = `"function "${func}`.replace("=>", " ");
  return func;
};
