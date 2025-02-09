'use client';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';
import styles from '../CSS/ComponentStyle/dropdown.module.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Image from 'next/image';

export const Dropdown = ({ list, defaultValue, listType, value, onChange }) => {
    const [totalPassengers, setTotalPassengers] = useState(1);
    const [open, setOpen] = useState(false)

    const [tempAdults, setTempAdults] = useState(1);
    const [tempChildren, setTempChildren] = useState(0);
    const [tempInfantsInSeat, setTempInfantsInSeat] = useState(0);
    const [tempInfantsInLap, setTempInfantsInLap] = useState(0);


    const handleDone = () => {
        const newTotal = tempAdults + tempChildren + tempInfantsInSeat + tempInfantsInLap;
        setTotalPassengers(newTotal);
        setOpen(false);
    };

    const newTotal = tempAdults + tempChildren + tempInfantsInSeat + tempInfantsInLap;



    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl>
                {listType == "regular" ?
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={value}
                        onChange={onChange}
                        defaultValue={defaultValue}
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '& .MuiSelect-root': {
                                borderBottom: 'none',
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '14px',
                            },
                            '& .MuiInput-underline:before': {
                                borderBottom: 'none',
                            },
                            '& .MuiInput-underline:after': {
                                borderBottom: 'none',
                            },
                        }}
                    >
                        {list && list.map((way) => (
                            <MenuItem defaultValue={defaultValue} value={way.key} key={way.key} className={styles.imageContainer} >

                                {/* <Image
                                sx={{ width: 1, height: 1, marginRight: 1 }}
                                src={way.img}
                                alt={way.value} 
                                className={styles.imageIcon}
                            /> */}

                                {way.value}</MenuItem>
                        ))}

                    </Select>
                    :
                    <Select
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '& .MuiSelect-root': {
                                borderBottom: 'none',
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '14px',
                            },
                            '& .MuiInput-underline:before': {
                                borderBottom: 'none',
                            },
                            '& .MuiInput-underline:after': {
                                borderBottom: 'none',
                            },
                        }}
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={(event) => {
                            if (event?.target?.closest(`.${styles.mainContainer}`)) return;
                            setOpen(false);
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    width: { xs: '60%', sm: '60%', md: '20%' }, // Responsive width for the menu
                                    padding: '10px',
                                },
                            },
                        }}
                        renderValue={() => `${totalPassengers} Passenger${totalPassengers !== 1 ? 's' : ''}`}
                        value={totalPassengers}
                    >
                        <div className={styles.mainContainer}>
                            <div className={styles.selectContainer}>
                                <div className={styles.rowName}>Adults</div>
                                <div className={styles.rowName}>
                                    <div>Children</div>
                                    <span className={styles.span}>Aged 2–11</span>
                                </div>
                                <div className={styles.rowName}>Infants
                                    <span className={styles.span}>In seat</span>
                                </div>
                                <div className={styles.rowName}>Infants
                                    <span className={styles.span}>In lap</span>
                                </div>
                            </div>

                            <div className={styles.numberBtn}>
                                <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "30px",
                                            height: "30px",
                                            padding: "6px",
                                            minWidth: "unset",
                                        }}
                                        onClick={() => setTempAdults(tempAdults - 1)}
                                        disabled={tempAdults === 0}
                                    >
                                        <RemoveIcon />
                                    </Button>
                                    <div>{tempAdults}</div>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "30px",
                                            height: "30px",
                                            padding: "6px",
                                            minWidth: "unset",
                                            backgroundColor: "#d2e3fc",
                                            borderColor: "blue",
                                        }}
                                        onClick={() => setTempAdults(tempAdults + 1)}
                                        disabled={tempAdults === 9}
                                    >
                                        <AddIcon color='info' />
                                    </Button>
                                </Stack>

                                <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "30px",
                                            height: "30px",
                                            padding: "6px",
                                            minWidth: "unset",
                                        }}
                                        onClick={() => setTempChildren(tempChildren - 1)}
                                        disabled={tempChildren === 0}
                                    >
                                        <RemoveIcon />
                                    </Button>
                                    <div>{tempChildren}</div>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "30px",
                                            height: "30px",
                                            padding: "6px",
                                            minWidth: "unset",
                                            backgroundColor: "#d2e3fc",
                                            borderColor: "blue",
                                        }}
                                        onClick={() => setTempChildren(tempChildren + 1)}
                                        disabled={tempChildren === 9}
                                    >
                                        <AddIcon color='info' />
                                    </Button>
                                </Stack>

                                <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "30px",
                                            height: "30px",
                                            padding: "6px",
                                            minWidth: "unset",
                                        }}
                                        onClick={() => setTempInfantsInSeat(tempInfantsInSeat - 1)}
                                        disabled={tempInfantsInSeat === 0}
                                    >
                                        <RemoveIcon />
                                    </Button>
                                    <div>{tempInfantsInSeat}</div>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "30px",
                                            height: "30px",
                                            padding: "6px",
                                            minWidth: "unset",
                                            backgroundColor: "#d2e3fc",
                                            borderColor: "blue",
                                        }}
                                        onClick={() => setTempInfantsInSeat(tempInfantsInSeat + 1)}
                                        disabled={tempInfantsInSeat === 9}
                                    >
                                        <AddIcon color='info' />
                                    </Button>
                                </Stack>

                                <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "30px",
                                            height: "30px",
                                            padding: "6px",
                                            minWidth: "unset",
                                        }}
                                        onClick={() => setTempInfantsInLap(tempInfantsInLap - 1)}
                                        disabled={tempInfantsInLap === 0}
                                    >
                                        <RemoveIcon />
                                    </Button>
                                    <div>{tempInfantsInLap}</div>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "30px",
                                            height: "30px",
                                            padding: "6px",
                                            minWidth: "unset",
                                            backgroundColor: "#d2e3fc",
                                            borderColor: "blue",
                                        }}
                                        onClick={() => setTempInfantsInLap(tempInfantsInLap + 1)}
                                        disabled={tempInfantsInLap === 9}
                                    >
                                        <AddIcon color='info' />
                                    </Button>
                                </Stack>
                            </div>
                        </div>

                        {newTotal <= 9 ? <div className={styles.mainBtn}>
                            <Button
                                variant="text"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    minWidth: "unset",
                                    borderRadius: "20px"
                                }}
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="text"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    minWidth: "unset",
                                    borderRadius: "20px"
                                }}
                                onClick={handleDone}
                            >
                                Done
                            </Button>
                        </div> :
                            <div className={styles.warningAlert}>
                                <Image src={require("../assets/error.png")} alt='Error' />Sorry, we do not support more than 9 passengers.
                            </div>}
                    </Select>}
            </FormControl>
        </Box >
    );
}