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

