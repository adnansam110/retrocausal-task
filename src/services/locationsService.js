import City from "@/models/city";
import Country from "@/models/country";
import State from "@/models/state";

export const getCountries = async () => {
  try {
    console.log("Heello");
    const data = await Country.find({});
    return data;
  } catch (error) {
    throw error;
  }
};
export const getCities = async () => {
  try {
    console.log("Heello 1");
    const data = await City.find({});
    return data;
  } catch (error) {
    throw error;
  }
};
export const getStates = async () => {
  try {
    console.log("Heello 2");
    const data = await State.find({});
    return data;
  } catch (error) {
    throw error;
  }
};
