import { Button } from '@mui/material';
import { Language, LocationOn, MonetizationOn } from '@mui/icons-material';
import styles from '../CSS/PagesStyle/footerPage.module.css';

export const FooterPage = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.topSection}>
                <Button className={styles.btn} variant='contained' style={{ background: "none", border: "#333 0.3 solid", borderRadius: "20px", color: "#1a73e8", fontSize: "14px" }}>
                    <Language className={styles.icon} />
                    Language · English (United Kingdom)
                </Button>
                <Button className={styles.btn} variant='contained' style={{ background: "none", border: "#333 0.3 solid", borderRadius: "20px", color: "#1a73e8", fontSize: "14px" }}>
                    <LocationOn className={styles.icon} />
                    Location · Lebanon
                </Button>
                <Button className={styles.btn} variant='contained' style={{ background: "none", border: "#333 0.3 solid", borderRadius: "20px", color: "#1a73e8", fontSize: "14px" }}>
                    <MonetizationOn className={styles.icon} />
                    Currency · LBP
                </Button>
            </div>

            <div className={styles.linkSection}>
                <a href="#">About</a>
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
                <a href="#">Join user studies</a>
                <a href="#">Feedback</a>
                <a href="#">Help Centre</a>
            </div>

            <div className={styles.disclaimer}>
                Displayed currencies may differ from the currencies used to purchase flights. <a href="#">Learn more</a>
            </div>
            <div className={styles.disclaimer}>
                Prices are final and include all taxes and fees, including payment fees for the cheapest common payment method (which may differ depending on the provider). Additional charges may apply for other types of payment, luggage, meals, WLAN, or other additional services. Prices, availability, and travel details are provided based on the latest information received from our partners. This information is reflected in the results within a period of less than 24 hours. Additional conditions may also be applied by our partners. You should then check prices and conditions with the service providers before booking.
            </div>
        </div>
    );
};
