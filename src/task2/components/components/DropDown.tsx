import {
  ChangeEvent,
  FC,
  FocusEvent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useQuery } from "react-query";
// mui components
import {
  Box,
  InputAdornment,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
// mui icons
import SearchIcon from "@mui/icons-material/Search";
// services
import fetchCountries, { ResponseType } from "../../../services/fetchCountries";
import { DropDownProps, CountryType } from "./DropDown.models";

const DropDown: FC<DropDownProps> = ({ countryName, handleCountryChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState<CountryType[]>();

  const { data, isLoading, isError } = useQuery("countries", fetchCountries, {
    // to prevent fetching static data every time user presses dropdown
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      const mappedData = data.map((country: ResponseType) => ({
        name: country.name,
        flagPng: country.flags.png,
        flagAlt: country.flags.alt,
        callingCode: country.callingCodes[0],
      }));
      setCountries(mappedData);
    }
  }, [data]);

  const handleTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.stopPropagation();
    setSearchTerm(event.target.value);
  };

  const handlePropagation = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  const handleTextFieldBlur = (event: FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const filteredCountries = countries?.filter((country: CountryType) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const callingCodeWithPlus = `+${country.callingCode}`;
    return (
      country.name.toLowerCase().includes(searchTermLowerCase) ||
      callingCodeWithPlus.includes(searchTermLowerCase) ||
      (searchTermLowerCase.startsWith("+") &&
        country.callingCode.includes(searchTermLowerCase.slice(1)))
    );
  });

  return (
    <Box>
      <Box>
        <Select
          id="countries"
          defaultValue="Poland"
          value={countryName}
          onChange={handleCountryChange}
          displayEmpty
          sx={{ width: 106 }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 260,
                zIndex: 9999,
              },
            },
          }}
          renderValue={(value) => {
            const selectedCountry = countries?.find(
              (country: CountryType) => country.name === value
            );
            return (
              <>
                {selectedCountry && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img
                      src={selectedCountry.flagPng}
                      alt={selectedCountry.flagAlt}
                      loading="lazy"
                      height={16}
                      width={22}
                    />
                    <Typography
                      sx={{ ml: 1 }}
                    >{`+${selectedCountry?.callingCode}`}</Typography>
                  </Box>
                )}
              </>
            );
          }}
        >
          <MenuItem
            onKeyDown={handlePropagation}
            sx={{
              overflow: "visible",
              position: "sticky",
              top: 0,
              zIndex: 1,
              backgroundColor: "white !important",
            }}
          >
            <TextField
              variant="standard"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleTextChange}
              onClick={handlePropagation}
              onBlur={handleTextFieldBlur}
              onFocus={(event) => event.target.select()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#0276aa" }} />
                  </InputAdornment>
                ),
              }}
            />
          </MenuItem>
          {filteredCountries?.map((country: CountryType) => (
            <MenuItem
              key={country.name}
              sx={{ width: 260 }}
              value={country.name}
            >
              <ListItem
                disablePadding
                secondaryAction={
                  <Typography>{`+${country?.callingCode}`}</Typography>
                }
              >
                <ListItemButton>
                  <img
                    src={country.flagPng}
                    alt={country.flagAlt}
                    loading="lazy"
                    height={16}
                    width={22}
                  />
                  <ListItemText
                    sx={{
                      mx: 2,
                    }}
                    primaryTypographyProps={{
                      variant: "body2",
                      noWrap: true,
                      component: "div",
                    }}
                    primary={country.name}
                  />
                </ListItemButton>
              </ListItem>
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default DropDown;
