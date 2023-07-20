import { FormControl, TextField } from "@mui/material";
import DropDown from "./components/DropDown";

import ReactInputMask from "react-input-mask";
import { FC } from "react";
import { PhoneNumberInputProps } from "./PhoneNumberInput.models";

const PhoneNumberInput: FC<PhoneNumberInputProps> = ({
  handleCountryChange,
  countryName,
  phoneNumber,
  handlePhoneNumberChange,
}) => {
  return (
    <FormControl
      sx={{
        width: "100%",
        height: 40,
        display: "flex",
        flexDirection: "row",
        gap: 2,
      }}
    >
      <DropDown
        handleCountryChange={handleCountryChange}
        countryName={countryName}
      />
      <ReactInputMask
        mask={"999-999-999"}
        placeholder="000-000-000"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      >
        <TextField
          type="tel"
          fullWidth
          sx={{
            "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
              {
                display: "none",
              },
            "& input[type=number]": {
              MozAppearance: "textfield",
            },
          }}
          InputProps={{
            inputProps: {
              style: {
                appearance: "textfield",
                width: "100%",
                letterSpacing: "4px",
                fontSize: "17px",
              },
            },
          }}
        />
      </ReactInputMask>
    </FormControl>
  );
};

export default PhoneNumberInput;
