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

export function isValidPhoneNumber(phoneNumber) {
  const phoneRegex =
    /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/;
  return phoneRegex.test(phoneNumber);
}
