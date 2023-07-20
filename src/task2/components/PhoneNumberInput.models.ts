import { ChangeEvent } from "react";
import { SelectChangeEvent } from "@mui/material";

export interface PhoneNumberInputProps {
  handleCountryChange: (event: SelectChangeEvent<string>) => void;
  countryName: string;
  phoneNumber: string;
  handlePhoneNumberChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}
