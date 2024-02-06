import React from "react";
import "./table.css"



export function TableItem(props){
    if(props.country === undefined || props.country === ""){
        return(
            <div className="element_container">
                <p className="element_item_error">No data found</p>
            </div>
        )
        
    }else return(
        <>
            <div className="element_container">
                <p className="element_item">{props.country}</p>
                <p className="element_item_small">{props.cases}</p>
                <p className="element_item_small">{props.deathcount}</p>
                <p className="element_item_small">{props.oncase}</p>
                <p className="element_item_small">{props.ondeath}</p>
                <p className="element_item_small">{props.total}</p>
                <p className="element_item_small">{props.totaldeath}</p>
            </div>
        </>
    )
        
}