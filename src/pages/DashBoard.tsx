import React, {useEffect, useRef, useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import {
    Button, FormControl, IconButton, Input, InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import axios from "axios";
import {ErrorMessage, useFormik} from "formik";
import { signUpSchema } from "../schema";
import ConfirmBox from '../component/ConfirmBox';
import {Delete, Visibility, VisibilityOff} from "@mui/icons-material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import '../index.css'
import OtpInput from 'react-otp-input';



const initialValues = {
    country : ''
};

export default function DashBoard() {

  const  [countryList, setCountryList] = useState([]);
  const  [fetchCountryList, setFetchCountryList] = useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [showPassword, setShowPassword] = React.useState(true);
    const [otp, setOtp] = useState('');

    const [otp1, setOtp1] = React.useState<Array<any>>([]);
    const [otpErr, setOtpErr] = React.useState<string>("");
    const handleEnter = (event: any) => {
        const value = event.target.value;
        if (event.target.value.length === 1 && /^\d*$/.test(value)) {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
            let tempOtp = [...otp1];
            tempOtp[index] = event.target.value;
            setOtp1(tempOtp)
        } else {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index - 1].focus();
            event.preventDefault();
            let tempOtp = [...otp1];
            tempOtp[index] = "";
            setOtp1(tempOtp)
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickDatePicker = () => {
        dateRef?.current?.showPicker()
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit = () => {
        let a= otp1.join("")
        console.log(a)
    }

    useEffect(() => {
        axios.get(`https://restcountries.com/v3.1/all`).then((res: any) => {
            if(res.data) {
                setCountryList(res.data);
            }
        });
    }, []);

    const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit: (values) => {
            axios.get(`https://restcountries.com/v3.1/alpha/${values.country}`).then((res: any) => {
                if(res.data) {
                    setFetchCountryList(res.data);
                }
            })
        }
    });

    const dateRef = useRef<HTMLInputElement | null>(null);
    let openPickerIcon;
    return (
        <>
            <div className={`container`}>
            <form onSubmit={handleSubmit}>
               <div className={`d-flex justify-content-center`}>
                   <InputLabel id="demo-simple-select-label">Country</InputLabel>
                   <Select
                       labelId="demo-simple-select-label"
                       id="demo-simple-select"
                       label="Country"
                       name="country"
                       value={values.country}
                       onChange={handleChange}
                       onBlur={handleBlur}
                   >
                       {countryList.map((res: any) => {
                           return  <MenuItem key={res.cca2} value={res.cca2}>{res.name.common}</MenuItem>
                       })}
                   </Select>
                   {/*<ErrorMessage name="country"/>*/}
                   {touched.country && errors.country ? (
                       <p className="form-error">{errors.country}</p>
                   ) : null}
               </div>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    {/*<InputLabel htmlFor="standard-adornment-password">Password</InputLabel>*/}
                    <Input
                        id="standard-adornment-password"
                        type={'date'}
                        inputRef={dateRef}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => {
                                        handleClickShowPassword();
                                        handleClickDatePicker()
                                    }}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker label="Basic date picker"
                        slots={{
                            openPickerIcon: Delete
                        }}/>
                    </DemoContainer>
                </LocalizationProvider>

                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                />

                <div className="otp-textbox">
                    <input onChange={handleEnter} value={otp1[0]} type="text" className="control" maxLength={1} />
                    <input onChange={handleEnter} value={otp1[1]} type="text" className="control" maxLength={1} />
                    <input onChange={handleEnter} value={otp1[2]} type="text" className="control" maxLength={1} />
                    <input onChange={handleEnter} value={otp1[3]} type="text" className="control" maxLength={1} />
                </div>
                {otpErr && (<div className="form-group text-center">
                    <span className="inline-error">{otpErr}</span>
                </div>)}

                <button onClick={onSubmit} type="button" className="btn-block" >VERIFY-OTP</button>
                {/*<TextField  id="outlined-basic" onChange={handleChange} name="country" value={values.country} label="Outlined" variant="outlined" />*/}
                <Button disabled={values.country === ''} type="submit" variant="outlined">Submit</Button>
            </form>

            {/*{fetchCountryList.map((res: any) => {*/}
            {/*   return <p key={res.cca2}>{res.name.common}</p>*/}
            {/*})}*/}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Capital</TableCell>
                                <TableCell align="right">Population</TableCell>
                                <TableCell align="right">Letting</TableCell>
                                <TableCell align="right">Flag</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {fetchCountryList.map((row: any) => (
                                <TableRow
                                    key={row.cca2}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.capital[0]}
                                    </TableCell>
                                    <TableCell align="right">{row.population}</TableCell>
                                    <TableCell align="right">{row.capitalInfo.latlng.join(',')}</TableCell>
                                    <TableCell align="right">{<img style={{
                                        width: '10%'
                                    }} src={row.flags.png} alt={row.flags.alt}/>}</TableCell>
                                    <TableCell align="right"><Button variant="outlined" type="button" onClick={handleClickOpen}>Capital Weather</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {open && <ConfirmBox open={true} close={handleClose}/>}
        </>
    )
}
