import { SelectChangeEvent } from "@mui/material";

export interface DropDownProps {
  countryName: string;
  handleCountryChange: (event: SelectChangeEvent<string>) => void;
}

export interface CountryType {
  name: string;
  flagPng: string;
  flagAlt: string;
  callingCode: string;
}
