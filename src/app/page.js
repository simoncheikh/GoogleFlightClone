// Home.js
'use client';
import React, { useState } from "react";
import styles from "./page.module.css";
import { ThemePage } from "./Components/themePage";
import { SearchField } from "./Pages/searchField";
import { FlightMap } from "./Components/flightMap";
import { HelpPage } from "./Pages/helpPage";
import { Slider } from "./Components/Slider";
import { ProductCard } from "./Components/ProductCard";
import { QuestionPage } from "./Pages/questionPage";
import { CheapFlightPage } from "./Pages/cheapFlightPage";
import { FooterPage } from "./Pages/footerPage";
import AvailableFlights from "./Pages/availableFlights";

export default function Home() {
  const [fromSelected, setFromSelected] = useState(null);
  const [toSelected, setToSelected] = useState(null);
  const [departureData, setDepartureData] = useState(null);
  const [returnData, setReturnData] = useState(null);
  const [searchKey, setSearchKey] = useState(0); 

  const handleSearchClick = () => {
    setSearchKey(prevKey => prevKey + 1); 
  };

  return (
    <div className={styles.page}>
      <div className={styles.themeContainer}>
        <ThemePage />
      </div>
      <SearchField
        fromSelected={fromSelected}
        setFromSelected={setFromSelected}
        toSelected={toSelected}
        setToSelected={setToSelected}
        departureData={departureData}
        setDepartureData={setDepartureData}
        returnData={returnData}
        setReturnData={setReturnData}
        onSearchClick={handleSearchClick}
      />
      {searchKey === 0 ? ( 
        <>
          <div className={styles.mapContainer}>
            <div className={styles.descStyle}>Find cheap flights from Beirut to anywhere</div>
            <FlightMap />
          </div>
          <HelpPage />
          <Slider />
          <QuestionPage />
          <CheapFlightPage />
        </>
      ) : (
        <AvailableFlights
          fromSelected={fromSelected}
          toSelected={toSelected}
          departureDateData={departureData}
          returnDate={returnData}
          searchKey={searchKey}
        />
      )}
      <FooterPage />
    </div>
  );
}