import React, {useState, useEffect} from "react";
import { TableItem } from "./tableItem";
import { TablePages } from "./tablePages";

export function Tableframe({data,setPages,setElements, length, page, elements}){
    const [items, setItems] = useState([{}]);
    function check(){
        try{
            setItems(data);
        }catch(e){
            console.log(e);
        }
        
    }

    useEffect(() => {
        setItems(data)
    },[data])


    if(data === undefined || data.length === 0){
        return(
        <>
            <div className="tableframe">
            <TableItem></TableItem>
            </div>
        </>
        )
    }else return(
        <>
            <div className="tableframe">
                <TableItem className="element_container_title" country= "Countries and Territories" cases="Cases" deathcount="Deaths"
                    oncase="Cases per 1000" ondeath="Deaths per 1000" total="Total" totaldeath="Total Deaths"></TableItem>
                <div className="tableframe-scrollable">
                    {items.map(({countriesAndTerritories,cases,deaths,casesPer1000,deathsPer1000,totalCases,totalDeaths}, index) => (
                        <TableItem key={index} country={countriesAndTerritories} cases={cases} 
                        deathcount={deaths} oncase={casesPer1000} ondeath={deathsPer1000} 
                        total={totalCases} totaldeath={totalDeaths} ></TableItem>
                        ))}
                </div>
                <TablePages page={page} setPages={setPages} elements={elements} setElements={setElements} length={length} ></TablePages>
            </div>
        </>
    );
    
}