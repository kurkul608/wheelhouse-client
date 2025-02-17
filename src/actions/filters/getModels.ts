"use server";

import axios from "axios";

export const getModelsFilters = async () => {
  try {
    const models = await axios.get<{ [x: string]: string[] }>(
      `${process.env.API_URL}filters/car-models`,
    );
    return models.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
