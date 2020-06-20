import { set, get, reduce } from "lodash-es";
/**
  * 检查两个字符串的相似度
  */
export function strSimilarity(str1: string, str2: string) {
  let n = str1.length, m = str2.length, d = [];
  let i, j, cost, l = n > m ? n : m;
  if (n == 0) return 0;
  if (m == 0) return 0;
  for (i = 0; i <= n; i++) {
    d[i] = [i];
  }
  for (j = 0; j <= m; j++) {
    d[0][j] = j;
  }
  for (i = 1; i <= n; i++) {
    for (j = 1; j <= m; j++) {
      if (str1[i - 1] == str2[j - 1]) {
        cost = 0;
      } else {
        cost = 1;
      }
      d[i][j] = ((a, b, c) => {
        return a < b ? (a < c ? a : c) : (b < c ? b : c);
      })(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
    }
  }
  return (1 - d[n][m] / l);
}

/**
 * 字符串搜索(前缀)树
 */
export class StringTree<T> {
  vals: [string, T][]
  tt: {}
  constructor(vals: [string, T][]) {
    this.vals = vals;
    vals.forEach((v, i) => {
      set(this.tt, v[0].split("").join("."), i);
    });
  }
  find(prefix: string) {
    let subTree = get(this.tt, prefix.split("").join(".")),
      reducer = function (result, value, key) {
        if (typeof value === "object")
          return result.concat(reduce(value, reducer.bind({ deep: this.deep + 1 }), []));
        else
          result.push([this.deep, value]);
        return result;
      };
    return reduce(subTree, reducer.bind({ deep: 0 }), []).sort((a, b) => b[0] - a[0]).map(v => this.vals[v[1]][1]);
  }
}

/** 高精度模板 */
function hAccOperator(reducer: (a: number, b: number) => number, fixer: (maxShift: number, level: number) => number) {
  return (...args: number[]) => {
    let maxShift = 0;
    return args.map(v => {
      let dig = v.toString().split(".");
      if (dig.length > 1) {
        let shift = dig[1].length;
        if (shift < 15 && shift > maxShift)
          maxShift = shift;
      }
      return v;
    }).map(v => v * (10 ** maxShift)).reduce(reducer) / fixer(maxShift, args.length);
  };
}

/** 尽量不丢失精度的加法 */
export const hAccSum = hAccOperator((a, b) => a + b, m => 10 ** m);
/** 尽量不丢失精度的乘法 */
export const hAccMul = hAccOperator((a, b) => a * b, (m, l) => 10 ** (m * l));
/** 尽量不丢失精度的除法 */
export const hAccDiv = hAccOperator((a, b) => a / b, (m, l) => 0.1 ** (m * (l - 2)));
/** 尽量不丢失精度的平均值 */
export const hAccAvg = hAccOperator((a, b) => a + b, (m, l) => 10 ** m * l);

/**
 * 获取正态分布化的Math.random()
 */
export function randomNormalDistribution() {
  var u = 0.0, v = 0.0, w = 0.0, c = 0.0;
  do {
    // 获得两个（-1,1）的独立随机变量
    u = Math.random() * 2 - 1.0;
    v = Math.random() * 2 - 1.0;
    w = u * u + v * v;
  } while (w == 0.0 || w >= 1.0)
  // 这里就是 Box-Muller转换
  c = Math.sqrt((-2 * Math.log(w)) / w);
  // 返回2个标准正态分布的随机数，封装进一个数组返回
  // 当然，因为这个函数运行较快，也可以扔掉一个
  // return [u*c,v*c];
  return u * c;
}

/**
 * 获得指定数组的所有组合
 */
export function choose<S>(arr: S[], size: number) {
  var allResult = [] as S[][];
  function sub(arr, size, result) {
    var arrLen = arr.length;
    if (size > arrLen) {
      return;
    }
    if (size == arrLen) {
      allResult.push([].concat(result, arr))
    } else {
      for (var i = 0; i < arrLen; i++) {
        var newResult = [].concat(result);
        newResult.push(arr[i]);

        if (size == 1) {
          allResult.push(newResult);
        } else {
          var newArr = [].concat(arr);
          newArr.splice(0, i + 1);
          sub(newArr, size - 1, newResult);
        }
      }
    }
  }
  sub(arr, size, []);

  return allResult;
}
