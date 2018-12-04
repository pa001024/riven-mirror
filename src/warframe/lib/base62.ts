// from my golang prject github.com/pa001024/reflex/util util.encoding.go

const _BASE62_ST = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

// 新浪微博base62编码
export function base62(src: number): string {
  let rst = "";
  while (1) {
    let a = src % 62;
    rst = _BASE62_ST[a] + rst;
    src = ~~(src / 62)
    if (src <= 0) {
      break;
    }
  }
  return rst;
}

// 新浪微博base62解码
export function debase62(src: string): number {
  let rst = 0;
  for (let i = 0; i < src.length; i++) {
    const a = _BASE62_ST.indexOf(src[i]);
    if (a < 0) {
      continue;
    }
    rst = rst * 62 + a;
  }
  return rst;
}

// 新浪微博base62分组编码
export function base62url(mid: string): string {
  let url = "";
  const STEP = 7;
  for (let i = mid.length; i > -STEP; i -= STEP) {
    if (i < 0) {
      url = base62(+mid.substr(0, i + STEP)) + url;
    } else {
      url = base62(+mid.substr(i, i + STEP)) + url;
    }
  }
  return url;
}

// 新浪微博base62分组解码
export function debase62url(url: string): string {
  let mid = "";
  const STEP = 4;
  for (let i = url.length; i > -STEP; i -= STEP) {
    if (i < 0) {
      mid = debase62(url.substr(0, i + STEP)) + mid;
    } else {
      mid = debase62(url.substr(i, i + STEP)) + mid;
    }
  }
  return mid;
}
