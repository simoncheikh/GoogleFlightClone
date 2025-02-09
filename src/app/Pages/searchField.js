import React, { useState, useEffect } from 'react';
import styles from '../CSS/PagesStyle/searchField.module.css';
import { Box, TextField, IconButton, Button } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { Dropdown } from '../Components/dropdown';
import { DatePickers } from '../Components/datePicker';
import { SearchAirport } from '../Components/searchAirport';

export const SearchField = ({ fromSelected, setFromSelected, toSelected, onSearchClick, setToSelected, departureData, setDepartureData, returnData, setReturnData }) => {
    const [selectedValue, setSelectedValue] = useState(1);
    const [multiCityFields, setMultiCityFields] = useState([{ id: 2 }]);
    const [flightData, setFlightData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const departureWay = [
        { key: 1, value: "One-way", img: require("../assets/opposite-arrows.png") },
        { key: 2, value: "Round trip", img: require("../assets/opposite-arrows.png") },
        { key: 3, value: "Multi-city", img: require("../assets/opposite-arrows.png") }
    ];
    const flightType = [
        { key: 1, value: "Economy" },
        { key: 2, value: "Premium" },
        { key: 3, value: "Business" },
        { key: 4, value: "First" }
    ];

    const AddRow = () => {
        setMultiCityFields([...multiCityFields, { id: multiCityFields.length + 1 }]);
    };

    const RemoveRow = (id) => {
        setMultiCityFields(multiCityFields.filter(field => field.id !== id));
    };

    useEffect(() => {
        const fetchData = async () => {
            const url = "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=new";
            const options = {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "f81831a441mshb88c90945638696p10c107jsn55ddf3ecf894",
                    "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
                },
            };

            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setFlightData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const transformApiData = (apiData) => {
        const groupedData = {};
        apiData?.forEach((item) => {
            const country = item?.presentation?.subtitle || item?.presentation?.title;
            if (!groupedData[country]) {
                groupedData[country] = {
                    key: country,
                    label: country,
                    type: "country",
                    airports: []
                };
            }
            if (item?.navigation?.entityType === "AIRPORT") {
                groupedData[country].airports.push({
                    label: item?.presentation?.title,
                    code: item?.skyId,
                    entityId: item?.entityId,
                    type: "airport",
                    distance: "N/A",
                });
            }
        });
        return Object.values(groupedData).map((group) => {
            if (group.airports.length === 0) {
                group.airports.push({
                    label: group.label,
                    code: "N/A",
                    type: "airport",
                    distance: "N/A"
                });
            }
            return group;
        });
    };

    const transformedData = transformApiData(flightData?.data);


    return (
        <div className={styles.mainDiv}>
            <div className={styles.mainContainer}>
                <Dropdown
                    list={departureWay}
                    defaultValue={departureWay[0].key}
                    listType={"regular"}
                    onChange={(e) => setSelectedValue(e.target.value)}
                />
                <Dropdown />
                <Dropdown
                    list={flightType}
                    defaultValue={flightType[0].key}
                    listType={"regular"}
                />
            </div>
            <div className={styles.searchField}>
                <div className={styles.oneCityContainer}>
                    <div className={styles.airportContainer}>
                        <SearchAirport
                            fromOption={transformedData}
                            fromSelected={fromSelected}
                            onFromSelectedChange={setFromSelected}
                            toSelected={toSelected}
                            onToSelectedChange={setToSelected}
                        />
                    </div>
                    {selectedValue === 1 || selectedValue === 3 ? (
                        <DatePickers width={"100%"} label={"Departure"} onChange={(e) => {
                            setDepartureData(e)
                        }} />
                    ) : (
                        <div className={styles.datePickerContainer}>
                            <DatePickers label={"Departure"} onChange={(e) => {
                                setDepartureData(e)
                            }} />
                            <DatePickers label={"Return"} onChange={(e) => {
                                setReturnData(e)
                            }} />
                        </div>
                    )}
                    {selectedValue === 3 && multiCityFields.length > 0 && (
                        <IconButton onClick={() => RemoveRow(multiCityFields[0].id)}>
                            X
                        </IconButton>
                    )}
                </div>
                {selectedValue === 3 && (
                    <div className={styles.multiCityContainer}>
                        {multiCityFields.map((field) => (
                            <div key={field.id} className={styles.multiCityRow}>
                                <div className={styles.airportContainer}>
                                    <SearchAirport
                                        fromOption={transformedData}
                                        fromSelected={fromSelected}
                                        onFromSelectedChange={setFromSelected}
                                        toSelected={toSelected}
                                        onToSelectedChange={setToSelected}
                                    />
                                </div>
                                <DatePickers label={"Departure"} />
                                <IconButton onClick={() => RemoveRow(field.id)}>
                                    X
                                </IconButton>
                            </div>
                        ))}
                        <button onClick={AddRow} className={styles.addButton}>
                            Add Flight
                        </button>
                    </div>
                )}
            </div>
            <div className={styles.searchButtonContainer}>
                <Button variant='contained' className={styles.searchBtn} onClick={onSearchClick}>
                    Search
                </Button>
            </div>
        </div>
    );
};

export default SearchField;
