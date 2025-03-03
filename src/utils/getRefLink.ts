export interface IStartParams {
  carId?: string;
}

export const getRefLink = (refId: string) => {
  // const dataString = JSON.stringify(refId);
  // const encodedData = btoa(dataString);
  //https://t.me/YourBot?start=refId%3D12345
  const link = `https://t.me/${process.env.NEXT_PUBLIC_BOT_NAME}?start=refId%3D${refId}`;

  return link;
};
