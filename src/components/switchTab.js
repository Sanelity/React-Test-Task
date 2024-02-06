import React, { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
import { MainTable } from "./mainTable";
import { Chart } from "./chart";
import { DoubleDatePicker } from "./doubleDatePicker";
import dayjs from "dayjs";

export function SwitchTab(){

    const [lowerdate, setLDate] = useState(dayjs("2019-12-01"));
    const [higherdate, setHDate] = useState(dayjs("2021-01-01"));

    const [changed, setChanged] = useState(false);

    let tabMode = 1; let graphMode = 2; let disabledMode = 0;
    const [viewMode, setViewMode] = useState(tabMode);

    function resetDate(){
      setLDate(dayjs("2019-12-01"))
      setHDate(dayjs("2021-01-01"))
      setChanged(false);
    }

    function updateLower(date){
      setLDate(date);
      setChanged(true);
    }
    function updateHigher(date){
      setHDate(date);
      setChanged(true);
    }


    const modes = {
        [tabMode]: {
          name: "Table Mode",
          content: (
            <div className="app">
                <DoubleDatePicker lower={lowerdate} setLowerDate={updateLower} higher={higherdate} setHigherDate={updateHigher} reset={resetDate} changed={changed} />
                <MainTable ldate={lowerdate} hdate={higherdate} />
            </div>
          ),
        },
        [graphMode]: {
          name: "Graph Mode",
          content: (
            <div className="app">
                <DoubleDatePicker lower={lowerdate} setLowerDate={updateLower} higher={higherdate} setHigherDate={updateHigher} reset={resetDate} changed={changed} />
                <Chart ldate={lowerdate} hdate={higherdate} />
            </div>
          ),
        },
        [disabledMode]: { name: "Disable", content: <></> },
      };

    return(
        <tabs style={{display: "flex", alignContent: "flex-start", flexWrap: "wrap", justifyContent: "center", width: "fit-content"}}>
            <Nav style={{display: "flex", minWidth: "18vw"}} variant="tabs" defaultActiveKey="/home">
            {Object.keys(modes).map((mode) => (
          <Nav.Item key={mode}>
            <Nav.Link onClick={() => setViewMode(parseInt(mode))}>
              {modes[mode].name}
            </Nav.Link>
          </Nav.Item>
        ))}
            </Nav>
            {modes[viewMode].content}
        </tabs >
    )

}