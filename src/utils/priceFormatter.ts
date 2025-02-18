export const priceFormatter = (input: string): string => {
  const numericString = input.replace(/\D/g, "");

  return numericString.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
