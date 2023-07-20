import { ChangeEvent, FC, useState } from "react";
import { Box, Button, Typography, SelectChangeEvent } from "@mui/material";
import { createPortal } from "react-dom";
import PhoneNumberInput from "./components/PhoneNumberInput";
import { PhoneNumberDialogProps } from "./PhoneNumberDialog.models";

const phoneModal = document.getElementById("phone-modal") as HTMLElement;

const PhoneNumberDialog: FC<PhoneNumberDialogProps> = ({
  header,
  subHeader,
  open,
  onCloseModel,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryName, setCountryName] = useState("Poland");

  const handlePhoneNumberChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const handleSaveButton = () => {
    setPhoneNumber("");
    setCountryName("Poland");
  };

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    setCountryName(event.target.value);
  };

  if (!open) return null;

  return createPortal(
    <Box>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0, .7)",
          zIndex: 1000,
        }}
      />
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "202px",
          minWidth: "564px",
          padding: "24px",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "white",
          zIndex: 1000,
        }}
      >
        <Box style={{ height: "100%" }}>
          <Typography variant="h6" fontWeight={600} fontSize={18}>
            {header}
          </Typography>
          <Box
            mt={3}
            display="flex"
            flexDirection="column"
            sx={{ height: "calc(100% - 95px)" }}
          >
            <Typography variant="caption" fontWeight={500} ml={1}>
              {subHeader}
            </Typography>
            <PhoneNumberInput
              handleCountryChange={handleCountryChange}
              countryName={countryName}
              phoneNumber={phoneNumber}
              handlePhoneNumberChange={handlePhoneNumberChange}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            gap={3}
          >
            <Button
              variant="outlined"
              size="large"
              sx={{ width: 116, height: 32 }}
              onClick={onCloseModel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{ width: 116, height: 32 }}
              onClick={handleSaveButton}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>,
    phoneModal
  );
};

export default PhoneNumberDialog;
