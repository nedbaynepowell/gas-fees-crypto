const intToPrice = (int: number) => {
  return int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const twoDecimals = (n: number) => {
  var log10 = n ? Math.floor(Math.log10(n)) : 0,
    div = log10 < 0 ? Math.pow(10, 1 - log10) : 100;

  const ans = Math.round(n * div) / div;
  if (!ans.toString().includes(".")) {
    return ans + ".00";
  }
  return ans;
};

export { intToPrice, twoDecimals };
