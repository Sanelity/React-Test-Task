import React, { useState, useEffect } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Button from 'react-bootstrap/Button'
import './simple.css'

export function DoubleDatePicker({lower,setLowerDate, higher, setHigherDate, reset, changed}){




    return(
        <div className="addPadding">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Lower Date Selector"  value={lower} onChange={newValue => setLowerDate(newValue)} />          
                    <DatePicker label="Higher Date Selector" value={higher} onChange={newValue => setHigherDate(newValue)} />
                    <Button variant="danger" size="sm" className="leftspace" disabled={!changed} onClick={reset}>Reset date</Button>
                </LocalizationProvider>
        </div>
    )

}