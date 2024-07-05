export const formatCurrency = (amount, unit = "VND") => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: unit,
  }).format(amount);
};

export const formatCurrencyToK = (amount) => {
  const formattedAmount = (amount / 1000).toLocaleString("vi-VN");
  return `${formattedAmount}K`;
};
