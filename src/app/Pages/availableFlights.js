import React, { useEffect, useState } from "react";
import { Collapse, Button, List, ListItem, Typography, Divider, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import UsbIcon from "@mui/icons-material/Usb";
import AirlineSeatLegroomNormalIcon from '@mui/icons-material/AirlineSeatLegroomNormal';
import PublicIcon from '@mui/icons-material/Public';
import CastIcon from '@mui/icons-material/Cast';
import styles from '../CSS/PagesStyle/availableFlights.module.css';

const AvailableFlights = ({ fromSelected, toSelected, departureDateData, returnDate, searchKey  }) => {
    const [expanded, setExpanded] = useState(null);
    const [availableFlight, setAvailableFlight] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);

    const toggleExpand = (index) => {
        setExpanded(expanded === index ? null : index);
    };
    useEffect(() => {
        const fetchData = async () => {

            const originSkyId = fromSelected?.code;
            const destinationSkyId = toSelected?.code;
            const originEntityId = fromSelected?.entityId;
            const destinationEntityId = toSelected?.entityId;
            const departureDate = departureDateData ? departureDateData.format("YYYY-MM-DD") : "None";
            if (!fromSelected || !toSelected || !departureDate) {
                setError("Please provide all required search parameters.");
                setLoading(false);
                return;
            }
            const url = `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=${originSkyId}&destinationSkyId=${destinationSkyId}&originEntityId=${originEntityId}&destinationEntityId=${destinationEntityId}&date=${departureDate}`;
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
                setAvailableFlight(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [fromSelected, toSelected, searchKey])
    const flights = availableFlight?.data?.itineraries;

    return (
        <div className={styles.mainContainer}>
            <div className={styles.title}>Top Flights</div>
            <div className={styles.desc}>
                Ranked based on price and convenience. Prices include required taxes + fees for 1 adult.
            </div>

            <List className={styles.mainFlight}>
                {flights?.map((flight, index) => {
                    const leg = flight.legs[0];
                    const airline = leg.carriers.marketing[0];
                    const departureSegment = leg.segments[0];
                    const arrivalSegment = leg.segments[leg.segments.length - 1];

                    return (
                        <div key={index} className={styles.flightCard}>
                            <div className={styles.flightHeader}>
                                <div className={styles.flightSummary}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <img src={airline.logoUrl} alt={airline.name} className={styles.airlineLogo} />
                                        <div className={styles.flightInfo}>
                                            <p>
                                                <strong>{departureSegment.departure.split("T")[1].slice(0, 5)} ➝ {arrivalSegment.arrival.split("T")[1].slice(0, 5)}</strong>
                                            </p>
                                            <p>{airline.name}</p>
                                        </div>
                                    </div>
                                    <div className={styles.flightrightInfo}>
                                        <p>{Math.floor(leg.durationInMinutes / 60)} hrs {leg.durationInMinutes % 60} min</p>
                                        <p>{leg.stopCount} stop via {departureSegment.destination.displayCode}</p>
                                        <span className={styles.price}>{flight.price.formatted}</span>
                                    </div>
                                </div>
                                {expanded === index && (
                                    <Button className={styles.selectBtn} variant="contained">
                                        Select
                                    </Button>)}
                                <Button onClick={() => toggleExpand(index)} className={styles.toggleButton}>
                                    {expanded === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </Button>
                            </div>

                            <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                                <div className={styles.flightDetails}>
                                    <div className={styles.flightContainer}>
                                        <div className={styles.leftDetails}>
                                            <div className={styles.detailRow}>
                                                <p>
                                                    <strong>{departureSegment.departure.split("T")[1].slice(0, 5)}</strong> - {departureSegment.origin.name} Airport ({departureSegment.origin.displayCode})
                                                </p>

                                            </div>
                                            <div className={styles.firstTravelTime}>
                                                Travel Time: {Math.floor(departureSegment.durationInMinutes / 60)} hr {departureSegment.durationInMinutes % 60} mins
                                            </div>

                                            <div className={styles.detailRow}>
                                                <p>
                                                    <strong>{departureSegment.departure.split("T")[1].slice(0, 5)}</strong> - {departureSegment.destination.name} Airport ({departureSegment.destination.displayCode})
                                                </p>
                                            </div>
                                            <div className={styles.planeDetails}>
                                                {departureSegment?.marketingCarrier?.name} {departureSegment?.marketingCarrier?.alternateId}
                                            </div>
                                        </div>
                                        <div className={styles.iconDetails}>
                                            <li style={{ alignItems: "center", display: "flex" }}><AirlineSeatLegroomNormalIcon className={styles.icon} /> Average legroom (79 cm)</li>
                                            <li style={{ alignItems: "center", display: "flex" }}><UsbIcon className={styles.icon} /> In-seat USB outlet</li>
                                            <li style={{ alignItems: "center", display: "flex" }}><CastIcon className={styles.icon} /> Stream media to your device</li>
                                            <li style={{ alignItems: "center", display: "flex" }}><PublicIcon className={styles.icon} color="info" />Emissions estimate: 70 kg CO2e</li>
                                        </div>
                                    </div>

                                    <div className={styles.layoverFlight}>
                                        {(() => {
                                            const departureTime = departureSegment?.arrival;
                                            const arrivalTime = arrivalSegment?.departure;

                                            const departureDate = new Date(departureTime);
                                            const arrivalDate = new Date(arrivalTime);

                                            const durationInMilliseconds = arrivalDate - departureDate;

                                            const durationInMinutes = Math.floor(durationInMilliseconds / (1000 * 60));
                                            const hours = Math.floor(durationInMinutes / 60);
                                            const minutes = durationInMinutes % 60;

                                            return `${hours} hrs ${minutes} min `;
                                        })()}
                                        layover {departureSegment.destination.name} {`(${departureSegment?.destination?.displayCode})`}

                                    </div>
                                    <div className={styles.flightContainer} style={{ borderBottom: "none" }}>
                                        <div className={styles.leftDetails}>

                                            <div className={styles.detailRow} style={{ paddingTop: "2%" }}>
                                                <p>
                                                    <strong>{arrivalSegment.departure.split("T")[1].slice(0, 5)}</strong> - {arrivalSegment.origin.name} Airport ({arrivalSegment.origin.displayCode})
                                                </p>

                                            </div>
                                            <div className={styles.firstTravelTime}>
                                                Travel Time: {Math.floor(arrivalSegment.durationInMinutes / 60)} hours {arrivalSegment.durationInMinutes % 60} mins
                                            </div>

                                            <div className={styles.detailRow}>
                                                <p>
                                                    <strong>{arrivalSegment.departure.split("T")[1].slice(0, 5)}</strong> - {arrivalSegment.destination.name} Airport ({arrivalSegment.destination.displayCode})
                                                </p>
                                            </div>
                                            <div className={styles.planeDetails} style={{ borderBottom: "none" }}>
                                                {departureSegment?.marketingCarrier?.name} {departureSegment?.marketingCarrier?.alternateId}
                                            </div>
                                        </div>
                                        <div className={styles.iconDetails}>
                                            <li style={{ alignItems: "center", display: "flex" }}><AirlineSeatLegroomNormalIcon className={styles.icon} /> Average legroom (79 cm)</li>
                                            <li style={{ alignItems: "center", display: "flex" }}><UsbIcon className={styles.icon} /> In-seat USB outlet</li>
                                            <li style={{ alignItems: "center", display: "flex" }}><CastIcon className={styles.icon} /> Stream media to your device</li>
                                            <li style={{ alignItems: "center", display: "flex" }}><PublicIcon className={styles.icon} color="info" />Emissions estimate: 70 kg CO2e</li>
                                        </div>
                                    </div>
                                    <div className={styles.firstTravelTime}>1 checked bag up to 30 kg included Fare non-refundable, taxes may be refundable Ticket changes for a fee</div>


                                </div>
                            </Collapse>
                        </div>
                    );
                })}
            </List>
        </div>
    );
};

export default AvailableFlights;
