import { Button } from '@mui/material';
import styles from '../CSS/ComponentStyle/flightmap.module.css';

export const FlightMap = ({ origin, destination }) => {
  return (
    <div className={styles.mapContainer}>
      <div className={styles.mCLexc} role="button" tabIndex="0" aria-label="Explore more destinations from Beirut">
        <Button className={styles.exploreButton}>Explore destination</Button>
      </div>
    </div>
  );
};