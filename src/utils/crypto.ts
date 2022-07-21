import { createHmac } from "crypto";

const SIGNS = [
  "!",
  "#",
  "$",
  "%",
  "&",
  "(",
  ")",
  "*",
  "+",
  "-",
  ",",
  ".",
  "/",
  ":",
  ";",
  "<",
  "=",
  ">",
  "?",
  "@",
  "[",
  "]",
  "^",
  "_",
  "{",
  "|",
  "}",
  "~",
];

export const encrypt = (data: string) => {
  const hmac = createHmac("sha256", "secret");
  hmac.update(data);

  const digested = hmac.digest("hex");

  // NOTE: hash値だと固定長の文字列になるので、それを防ぐために文字列を加工する。
  const broken1 = digested
    .split("")
    .filter((c) => c !== digested[0])
    .slice(Number(digested[0]) || 0)
    .join("");

  // NOTE: パスワードに記号を含めるようにする。
  const broken2 = digested.split("").reduce((acc, c, index) => {
    if (!SIGNS[index]) {
      return acc;
    }
    return acc.replaceAll(c, SIGNS[index]);
  }, broken1);

  // NOTE: 推測されにくいようにシャッフルする。
  const broken3 = digested
    .split("")
    .reverse()
    .reduce((acc, cur, idx) => {
      // console.log(acc);
      if (idx % 2 === 0) {
        return (broken2[idx] || "") + acc + cur + SIGNS[idx % SIGNS.length];
      } else {
        return (broken2[idx] || "") + cur.toUpperCase() + SIGNS[idx % SIGNS.length] + acc;
      }
    }, "");

  const length = broken3.length;

  if (broken1.length % 2) {
    return broken3.split("").slice(length / 6, length / 6 * -1).reverse().join("");
  } else {
    return broken3.slice(length / 6, length / 6 * -1);
  }
};
