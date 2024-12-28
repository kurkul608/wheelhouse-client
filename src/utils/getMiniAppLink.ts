export interface IStartParams {
  carId?: string;
}

export const getMiniAppLink = (linkData: IStartParams) => {
  const dataString = JSON.stringify(linkData);
  const encodedData = btoa(dataString);

  const link = `https://t.me/${process.env.NEXT_PUBLIC_BOT_NAME}/${
    process.env.NEXT_PUBLIC_MINI_APP_NAME
  }?startapp=${encodedData}&startApp=${encodedData}`;

  return link;
};
