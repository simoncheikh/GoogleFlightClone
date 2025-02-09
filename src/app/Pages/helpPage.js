
'use client';
import Image from 'next/image'
import styles from '../CSS/PagesStyle/helpPage.module.css'
import { useState } from 'react'



export const HelpPage = () => {

    const [selectedId, setSelectedId] = useState(1)

    const helpArray = [
        { id: 1, label: "Find the cheapest days to fly", desc: "The date grid and price graph make it easy to see the best flight deals", img: require("../assets/calendar.png") },
        { id: 2, label: "See the whole picture with price insights", desc: "Price history and trend data show you when to book to get the best price on your flight", img: require("../assets/chart.png") },
        { id: 3, label: "Track prices for a trip", desc: "Not ready to book yet? Observe price changes for a route or flight and get notified when prices drop.", img: require("../assets/bell.png") },
    ]
    const instruArray = [
        {
            id: 1, urlText: "", title: "Insightful tools help you choose your trip dates", desc: "If your travel plans are flexible, use the form above to start searching for a specific trip. Then, play around with the Date grid and Price graph options on the Search page to find the cheapest days to get to your destination – and back again for round trips.", firstBold: "Date grid", secondBold: "Price graph", img: "url('https://www.gstatic.com/flights/app/lp/dates_benefits_light.svg')"
        },
        {
            id: 2, urlText: "", title: "Get smart insights about flight prices", desc: "Real-time insights can tell you if a fare is lower or higher than usual, and if the fare that you're seeing is a good price. So, you don't have to worry about paying too much for a flight or missing out on the cheapest time to book. On some routes, you might also see historical data that helps you better understand how flight prices vary over time.", firstBold: "", secondBold: "", img: "url('https://www.gstatic.com/flights/app/lp/price_insights_benefits_light.svg')"
        },
        {
            id: 3, urlText: "Tracked flights page", title: "Track prices for a trip", desc: "Effortlessly track prices for specific travel dates or for any dates, if your plans are flexible, to uncover the best deals. You can easily set up tracking for multiple routes while searching for flights and opt in to receive email updates when the price changes. Once that's done, you can come back to your Tracked flights page to monitor prices whenever you like, or relax knowing you'll never miss a flight deal.", firstBold: "", secondBold: "", img: "url('https://www.gstatic.com/flights/app/lp/tracking_prices_benefits_light.svg')"
        }
    ]

    const selectedInstru = instruArray.find(item => item.id === selectedId);


    return (
        <div className={styles.mainDiv}>
            <div className={styles.title}>
                Useful tools to help you find the best deals
            </div>
            <div className={styles.mainContainer}>
                <div className={styles.leftContainer}>
                    {helpArray.map((value) => (
                        <div className={styles.boxContainer} key={value.id} onClick={() => setSelectedId(value.id)}>
                            <Image src={value.img} alt="Calendar" className={styles.icon} />
                            <div className={styles.containerLabel}>
                                <div className={styles.label}>{value.label}</div>
                                <div className={styles.desc}>{value.desc}</div>
                            </div>
                            {selectedId === value.id &&
                                <div className={styles.diamondContainer}>
                                    <Image src={require("../assets/diamond.png")} alt='diamond' className={styles.diamond} />
                                </div>
                            }
                        </div>))}
                </div>
                {selectedInstru && ( // Conditionally render the rightContainer
                    <div className={styles.rightContainer}>
                        <div className={styles.rightTitle}>
                            {selectedInstru.title}
                        </div>
                        <div className={styles.rightDesc}>
                            {selectedInstru.desc}
                        </div>
                        <div
                            style={{
                                backgroundImage: selectedInstru.img,
                                width: "100%",
                                height: "66%",
                                backgroundSize: "contain",
                                backgroundRepeat: "no-repeat"
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}