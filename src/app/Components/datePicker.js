import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export const DatePickers = ({ children, label, width, onChange }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label={label} sx={{ width: width }} onChange={onChange} />
        </LocalizationProvider>
    )
}