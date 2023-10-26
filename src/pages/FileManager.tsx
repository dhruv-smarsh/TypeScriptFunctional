import React, {useEffect, useState} from 'react'
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import axios from "axios";

export default function FileManager() {

    const  [periodically, setPeriodically] = useState([]);
    const  [page, setPage] = useState(0);

    useEffect(() => {
        axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`).then((res: any) => {
            if(res.data) {
                setPeriodically(res.data.hits);
            }
        });
        // setInterval(() => {
        //
        // }, 5000)
    }, []);

    window.onscroll = (() => {

        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
            axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page + 1}`).then((res: any) => {
                if(res.data) {
                    setPeriodically(periodically.concat(res.data.hits));
                    setPage(page + 1);
                    console.log(periodically.length)
                }
            });
        }
    })

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Url</TableCell>
                            <TableCell align="right">Created At</TableCell>
                            <TableCell align="right">Author</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {periodically.map((row: any) => (
                            <TableRow
                                key={row.objectID}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">{row.url}</TableCell>
                                <TableCell align="right">{row.created_at}</TableCell>
                                <TableCell align="right">{row.author}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
