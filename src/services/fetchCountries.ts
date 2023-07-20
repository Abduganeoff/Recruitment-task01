import axios from "axios";

export interface ResponseType {
  name: string;
  flags: {
    png: string;
    alt: string;
  };
  callingCodes: string[];
  // the rest of the response property types
  [key: string]: any;
}

const fetchCountries = async () => {
  const response = await axios.get<ResponseType[]>(
    `https://restcountries.com/v2/all`
  );
  return response.data;
};

export default fetchCountries;
