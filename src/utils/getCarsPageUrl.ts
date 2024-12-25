export const getCarsPageUrl = () => {
  const path = "/cars";
  const params = new URLSearchParams({
    page: "0",
  });
  return `${path}?${params.toString()}`;
};
