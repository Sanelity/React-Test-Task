import React, {useEffect, useState} from "react";
import { Line } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './chart.css'
import { DataProcessor as dProc } from "./dataProcessor";


export function Chart({ldate,hdate}){
    

    const [countries, setCountries] = useState();
    const [dataset, setDataset] = useState();
    const [selected, setSelected] = useState();

    const [loading, setLoading] = useState(true);

    const cfg = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
              beginAtZero: true
            }
        }
    };

    function btnTitle(){
      if(selected !== undefined) return selected.replace(/_/g, " ");
      else return "Select country"
    }
    
    function CountryDropdown() {
      if (countries !== undefined) {
        return (
          <DropdownButton className="center" size="wide" variant="warning" id="dropdown-basic-button" title={btnTitle()}>
            <div className="scrollable">
              {countries.map((data, index) => (
                <Dropdown.Item onClick={() => {setSelected(data.countriesAndTerritories)}} key={index}>
                  {data.countriesAndTerritories.replace(/_/g, " ")}
                </Dropdown.Item>
              ))}
            </div>
          </DropdownButton>
        );
      } else return null;
    }


    function loadCountries(){
      dProc.getAvailableCountries()
      .then(data => setCountries(data))
    }
    function loadData(){
      dProc.getChartData(selected,ldate,hdate)
          .then((dataset) => {
          updateDataSet(dataset)
          setLoading(false);
        }).catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
    

    useEffect(() => {
      setLoading(true);
      loadCountries()
      loadData();
  },[ldate,hdate,selected]);

    function updateDataSet(newData){
        console.log(newData)
        let newset = {
            labels: newData.map((newData) => (newData.year + "/" + newData.month)),
            datasets: [{
                label: 'Cases',
                data: newData.map((newData) => newData.cases),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: 'Deaths',
                data: newData.map((newData) => newData.deaths),
                fill: false,
                borderColor: 'rgb(255, 30, 30)',
                tension: 0.1
            }]
        }
        setDataset(newset);
    }
    

    if(dataset === undefined || loading) return(<></>)
    else return(
      <>
        <div className="limiter" >
          <Line data={dataset} options={cfg} height="450"></Line>
        </div>
        {CountryDropdown()}
      </>
        
    )
}