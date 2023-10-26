import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useState} from "react";
import {useEffect} from "react";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

export default function CustomizedDialogs(props: any) {
    const  [countryList, setCountryList] = useState([]);

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=f0e14edaf1bb431887bb71df3997dc75&query=navsari`).then((res: any) => {
            if(res.data) {
                setCountryList(res.data);
            }
        });
    }, []);

    return (
        <div>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={props.open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={props.close}>
                    Modal title
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Capital</TableCell>
                                    <TableCell align="right">Population</TableCell>
                                    <TableCell align="right">Flag</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {countryList.map((row: any) => (
                                    <TableRow
                                        key={row.cca2}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.population}
                                        </TableCell>
                                        <TableCell align="right">{row.population}</TableCell>
                                        <TableCell align="right">{<img style={{
                                            width: '10%'
                                        }} src={row.flags.png} alt={row.flags.alt}/>}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={props.close}>
                        Save changes
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
