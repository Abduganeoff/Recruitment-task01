import { Box, Button } from "@mui/material";
import PhoneNumberDialog from "./task2/PhoneNumberDialog";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url(./assets/pic01.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center", // center
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0, .5)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setIsOpen(true)}
        >
          Open Phone number dialog
        </Button>
      </Box>
      <PhoneNumberDialog
        header="Change phone number"
        subHeader="Provide new phone number"
        open={isOpen}
        onCloseModel={() => setIsOpen(false)}
      />
    </Box>
  );
}

export default App;
