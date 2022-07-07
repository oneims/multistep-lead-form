// Axios
import axios from "axios";

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const postPayload = async (url, payload) => {
  await axios
    .post(url, payload)
    .then((res) => {
      console.log(`res: `, res);
    })
    .catch((err) => {
      console.log(err);
    });
};
