/*
 * 以下の色は"CUD color set guidebook 2018"を参考に選んだ
 * */
const colors = {
  orange: "rgb(246, 170, 0)",
  green: "rgb(3, 175, 122)",
  blue: "rgb(0, 90, 255)",
  skyBlue: "rgb(77, 196, 255)",
  brown: "rgb(128, 64, 0)",
};

/*
 * 整数nに対応する色を返す
 * 返却される色の値は巡回する
 * */
export const getLineColor = (n: number) => {
  const colorValues = [...Object.values(colors)];
  const length = colorValues.length;

  return colorValues[n % length];
};
