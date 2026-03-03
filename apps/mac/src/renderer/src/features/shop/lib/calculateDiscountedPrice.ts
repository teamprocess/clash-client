export const calculateDiscountedPrice = (price: number, discount: number): string => {
  return (price * (1 - discount * 0.01)).toLocaleString();
};
