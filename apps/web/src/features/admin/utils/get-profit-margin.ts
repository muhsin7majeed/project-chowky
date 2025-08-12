const getProfitMargin = (cost: number, price: number) => {
  if (cost === 0 || price === 0) return 0;

  const profitMargin = ((price - cost) / cost) * 100;

  if (Number.isNaN(profitMargin)) return 0;

  return profitMargin;
};

export default getProfitMargin;
