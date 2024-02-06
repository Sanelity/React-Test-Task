import React, {useEffect, useState, useCallback} from "react";
import { InputGroup, Form, Dropdown, Button } from "react-bootstrap";
import './table.css'
import debounce from "lodash.debounce";

export function TableFilter({setFilter}){

    const [lowerValue, setLowerValue] = useState(undefined);
    const [higherValue, setHigherValue] = useState(undefined);

    const [sortColumn, setSortColumn] = useState(undefined);
    const [sortPolarity, setSortPolarity] = useState(true);
    const [search, setSearch] = useState(undefined);

    function readFilter(){
        if(sortColumn !== undefined) return columnTitle();
        else return "Filter";
    }

    const readValue = (field) => {
        switch(field){
            case("search"): return search || "";
            case("lower"): return lowerValue || "";
            case("higher"): return higherValue || "";
            default: break;
        }
    } 

    function columnTitle(){
        if(sortPolarity){
            return `Filter: ${sortColumn} ⇩`
        }else return `Filter: ${sortColumn} ⇧`
        
    }

    function changeReaction(column){
        console.log(column)
        if(sortColumn === column){
            setSortPolarity(!sortPolarity);
        }else {
            setSortColumn(column);
            console.log("column filter updated")
        }
    }
    function checkValue(field){
        switch(field){
            case("lower"):
                if( lowerValue === undefined || !isNaN(parseInt(lowerValue))) return false;
                else return true;
            case("higher"):
                if( higherValue === undefined || !isNaN(parseInt(higherValue))) return false;
                else return true;
            default:
                if(isNaN(parseInt(search))) return false;
                else return true;
        }
    }

    function hardReset(){
        setLowerValue(undefined);
        setHigherValue(undefined);
        setSearch(undefined);
        setSortColumn(undefined);
        setSortPolarity(true);
    }
    
    const handleInputChange = (event) => {
        const {name, value} = event.target;
        switch(name){
            case("search"): 
                    if(value === "") setSearch(undefined);
                    else setSearch(value);
                break;
            case("lower"):
                    if(value === "") setLowerValue(undefined)
                    else setLowerValue(value);
                break;
            case("higher"): 
                    if(value === "") setHigherValue(undefined)
                    else setHigherValue(value);
                break;
            default: break;
        }
    }

    const debouncedSetFilter = useCallback(
        debounce((filter) => {
          setFilter(filter);
          console.log(filter)
        }, 500),[]
      );


    useEffect(() => {
        debouncedSetFilter({column: sortColumn, polarity: sortPolarity, country: search, lowerValue: lowerValue, higherValue: higherValue})
    },[sortColumn,sortPolarity, search, higherValue, lowerValue])


    return(
        <>
        <div className="filter_menu toLeft addPad">
            <InputGroup>
                    <Form.Control 
                        name={"search"}
                        value={readValue("search")}
                        isInvalid={checkValue()}
                        onChange={handleInputChange}
                        placeholder={"Search by Country"}
                        aria-label="Search by Country"
                        aria-describedby="basic-addon2"
                    />
                    <Form.Control.Feedback tooltip type="invalid">
                        Only country name allowed.
                    </Form.Control.Feedback>
            </InputGroup>
            <Dropdown drop="up-centered">
                <Dropdown.Toggle variant="warning" id="dropdown-basic" className="add">
                    {readFilter()}
                </Dropdown.Toggle>

                <Dropdown.Menu >
                    <Dropdown.Item onClick={() => changeReaction(undefined)} >Remove</Dropdown.Item>
                    <Dropdown.Item onClick={() => changeReaction("cases")} >- Cases</Dropdown.Item>
                    <Dropdown.Item onClick={() => changeReaction("deaths")}>- Deaths</Dropdown.Item>
                    <Dropdown.Item onClick={() => changeReaction("casesPer1000")}>- Per 1000 Cases</Dropdown.Item>
                    <Dropdown.Item onClick={() => changeReaction("deathsPer1000")}>- Per 1000 Deaths</Dropdown.Item>
                    <Dropdown.Item onClick={() => changeReaction("totalCases")}>- Total Cases</Dropdown.Item>
                    <Dropdown.Item onClick={() => changeReaction("totalDeaths")}>- Total Deaths</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.ItemText>The second use changes the sort order</Dropdown.ItemText>
                </Dropdown.Menu>
            </Dropdown>
            <InputGroup>
                    <Form.Control
                        name={"lower"}
                        isInvalid={checkValue("lower")}
                        onChange={handleInputChange}
                        placeholder="Value from"
                        aria-label="Search by Country"
                        aria-describedby="basic-addon2"
                    />
                    <Form.Control
                        name={"higher"}
                        isInvalid={checkValue("higher")}
                        onChange={handleInputChange}
                        placeholder="Value up to"
                        aria-label="Search by Country"
                        aria-describedby="basic-addon2"
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                        Only numeric Range allowed.
                    </Form.Control.Feedback>
            </InputGroup>
        </div>
        <div className="filter_menu addPad toRight">
            <Button variant="danger" onClick={hardReset}>Reset filter</Button>
        </div>
        </>
        
    )
}