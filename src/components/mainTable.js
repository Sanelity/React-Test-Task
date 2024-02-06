import React, {useState,useEffect} from "react";
import { Tableframe } from "./table/tableframe";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DataProcessor as dProc } from "./dataProcessor";
import { TableFilter } from "./table/tablefilter";


export function MainTable({ldate,hdate}){
    const [rowData, setRowData] = useState([]);
    const [filtredData, setFiltredData] = useState([]);
    const [page, setPage] = useState(0);
    const [elements, setElements] = useState(10);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);

    dProc.getData(ldate, hdate, filtredData)
      .then((data) => {
        setRowData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    },[ldate,hdate,filtredData]);

    if(loading) return(<h1>Loading</h1>)
    else return (
        <div className="center">
            <div className="tableApp">
                <TableFilter data={rowData} setFilter={setFiltredData}></TableFilter>
                <Tableframe 
                    data={rowData.slice(page * elements, (page + 1)*elements)} 
                    page={page} setPages={setPage} 
                    elements={elements} setElements={setElements} 
                    length={rowData.length}
                >
                </Tableframe>
            </div>
        </div>
    );
}