export const calculateTax = (price: number): number => {
  return Math.round(price * 0.08 * 100) / 100;
};
