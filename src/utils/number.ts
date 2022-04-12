const intToPrice = (int: number) => {
  return int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export { intToPrice };
