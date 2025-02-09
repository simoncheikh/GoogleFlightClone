import React, { useState } from 'react';
import styles from '../CSS/ComponentStyle/searchAirport.module.css';
import { Box, TextField, IconButton, Autocomplete, List, ListItem, Collapse, Button } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import FlightIcon from "@mui/icons-material/Flight";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const SearchAirport = ({
  fromOption,
  fromSelected,
  onFromSelectedChange,
  toSelected,
  onToSelectedChange,
}) => {
  const [expanded, setExpanded] = useState({});
  const [inputDestination, setInputDestination] = useState("");
  const [inputArrival, setInputArrival] = useState("");

  const ExpandOptions = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filterOptions = (options, state) => {
    const inputVal = state.inputValue.toLowerCase();
    return options.filter((option) => {
      const countryMatch = option.label.toLowerCase().includes(inputVal);
      const airportMatch = option.airports?.some((airport) =>
        airport.label.toLowerCase().includes(inputVal) ||
        airport.code.toLowerCase().includes(inputVal)
      );
      return countryMatch || airportMatch;
    });
  };

  return (
    <Box className={styles.searchContainer}>
      <div className={styles.fieldsContainer}>
        <Autocomplete
          value={fromSelected}
          onChange={(event, newValue) => onFromSelectedChange(newValue)}
          options={fromOption}
          filterOptions={filterOptions}
          onInputChange={(event, newInputValue) => setInputDestination(newInputValue)}
          groupBy={(option) => (option.type === "country" ? "Countries" : "Cities")}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="From?"
              fullWidth
              className={styles.mainField}
            />
          )}
          renderOption={(props, option) => (
            <List sx={{ width: "100%", padding: "5px" }}>
              <ListItem
                {...props}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                  width: "100%"
                }}
                onClick={() => ExpandOptions(option.key)}
              >
                <LocationOnIcon color="primary" />
                <div>{option.label}</div>
                {expanded[option.key] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={expanded[option.key]} timeout="auto" unmountOnExit>
                <List sx={{ paddingLeft: "30px" }}>
                  {option.airports
                    ?.filter((airport) =>
                      airport.label.toLowerCase().includes(inputDestination.toLowerCase()) ||
                      airport.code.toLowerCase().includes(inputDestination.toLowerCase())
                    )
                    .map((airport, index) => (
                      <ListItem key={index}>
                        <Button
                          variant="text"
                          className={styles.airportNameContainer}
                          onClick={() => onFromSelectedChange(airport)}
                        >
                          <FlightIcon color="secondary" />
                          <div>
                            <div>
                              {airport.label} <strong>({airport.code})</strong>
                            </div>
                            <small style={{ color: "gray" }}>{airport.distance}</small>
                          </div>
                        </Button>
                      </ListItem>
                    ))}
                </List>
              </Collapse>
            </List>
          )}
          sx={{
            width: 350,
            "& .MuiAutocomplete-popupIndicator": { display: "none" },
          }}
        />

        <Box className={styles.swapContainer}>
          <IconButton className={styles.swapButton}>
            <SwapHorizIcon />
          </IconButton>
        </Box>

        <Autocomplete
          value={toSelected}
          onChange={(event, newValue) => onToSelectedChange(newValue)}
          options={fromOption}
          filterOptions={filterOptions}
          onInputChange={(event, newInputValue) => setInputArrival(newInputValue)}
          groupBy={(option) => (option.type === "country" ? "Countries" : "Cities")}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" placeholder="Where to?" fullWidth />
          )}
          renderOption={(props, option) => (
            <List sx={{ width: "100%", padding: "5px" }}>
              <ListItem
                {...props}
                sx={{ cursor: "pointer", display: "flex", justifyContent: "space-between", gap: "10px", width: "100%" }}
                onClick={() => ExpandOptions(option.key)}
              >
                <LocationOnIcon color="primary" />
                <div>{option.label}</div>
                {expanded[option.key] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse in={expanded[option.key]} timeout="auto" unmountOnExit>
                <List sx={{ paddingLeft: "30px" }}>
                  {option.airports
                    ?.filter((airport) =>
                      airport.label.toLowerCase().includes(inputArrival.toLowerCase()) ||
                      airport.code.toLowerCase().includes(inputArrival.toLowerCase())
                    )
                    .map((airport, index) => (
                      <ListItem key={index}>
                        <Button
                          variant="text"
                          className={styles.airportNameContainer}
                          onClick={() => onToSelectedChange(airport)}
                        >
                          <FlightIcon color="secondary" />
                          <div>
                            <div>
                              {airport.label} <strong>({airport.code})</strong>
                            </div>
                            <small style={{ color: "gray" }}>{airport.distance}</small>
                          </div>
                        </Button>
                      </ListItem>
                    ))}
                </List>
              </Collapse>
            </List>
          )}
          sx={{
            width: 350,
            "& .MuiAutocomplete-popupIndicator": { display: "none" },
          }}
        />
      </div>
    </Box>
  );
};

export default SearchAirport;
