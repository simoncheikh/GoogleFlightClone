import styles from '../CSS/PagesStyle/cheapFlighPage.module.css'

export const CheapFlightPage = () => {
    const CheapArray = [
        { id: 1, label: "Flights from New York to London" },
        { id: 2, label: "Flights from New York to Rome" },
        { id: 3, label: "Flights from Toronto to London" },
        { id: 4, label: "Flights from London to Tokyo" },
        { id: 5, label: "Flights from New York to Los Angeles" },
        { id: 6, label: "Flights from London to Istanbul" },
        { id: 7, label: "Flights from London to Berlin" },
        { id: 8, label: "Flights from New York to Paris" },
        { id: 9, label: "Flights from Montreal to Paris" },
        { id: 10, label: "Flights from New York to Milan" },
        { id: 11, label: "Flights from Madrid to Rome" },
        { id: 12, label: "Flights from Paris to Marrakech" },
        { id: 13, label: "Flights from Paris to Bangkok" },
        { id: 14, label: "Flights from Chicago to Paris" },
        { id: 15, label: "Flights from London to Paris" },
        { id: 16, label: "Flights from London to Milan" },
        { id: 17, label: "Flights from London to Dubai" },
        { id: 18, label: "Flights from London to Delhi" },
        { id: 19, label: "Flights from Sao Paulo to London" },
        { id: 20, label: "Flights from New York to Orlando" },
        { id: 21, label: "Flights from Melbourne to London" },
    ]

    return (
        <div className={styles.mainContainer}>
            <div className={styles.descStyle}>Find cheap flights on popular routes</div>
            <div className={styles.flightsContainer}>
                {CheapArray.map((flight) => (
                    <div key={flight.id} className={styles.flightItem}>
                        {flight.label}
                    </div>
                ))}
            </div>
        </div>
    )
}
