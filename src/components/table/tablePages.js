import React, { useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from "react-bootstrap/Dropdown"
import DropdownButton from 'react-bootstrap/DropdownButton';
import Pagination from 'react-bootstrap/Pagination';
import "./table.css"


export function TablePages({page,setPages, elements,setElements, length}){
    const [field, setField] = useState();
    const [disabled, setDisabled] = useState(false);

    let items = [];

    const handleInputChange = (event) => {
        let value = parseInt(event.target.value)
        if(value > 0){
            setField(Math.round(value));
            setDisabled(false);
        }else setDisabled(true);
    }
    function elementSetter(value){
        if(value !== undefined){
            setElements(value);
        }
    }


    for (let number = page-1; number <= page+3; number++) {
        if(number > 0 && number < parseFloat(length / elements)+1){
            items.push(
                <Pagination.Item onClick={() => changePage(number-1)} key={number} active={number === page+1}>
                    {number}
                </Pagination.Item>
            );
        }
    }

    function changePage(value){
        if(value >= 0 && value < parseFloat(length / elements)){
            setPages(value);
        }
    }
    function recalcPage(newElements){
        if(newElements !== undefined){
            setPages(parseInt((page * elements) / newElements));
        }
        
    }

    function lastPage(){
        let truePage = parseInt(length/elements)
        let floatPage = parseFloat(length/elements)
        if(truePage === floatPage)return truePage-1;
        else return truePage;
 
        
    }

    return(
        <div className="element_container_page">
            <DropdownButton variant="warning" id="dropdown-basic-button" title={`${elements} per Page`} className="safezone">
                <Dropdown.Item onClick={() => {recalcPage(10);setElements(10)}}>10 Elements per Page</Dropdown.Item>
                <Dropdown.Item onClick={() => {recalcPage(20);setElements(20)}}>20 Elements per Page</Dropdown.Item>
                <Dropdown.Item onClick={() => {recalcPage(40);setElements(40)}}>40 Elements per Page</Dropdown.Item>
                <Dropdown.Divider />
                <InputGroup className="mb-3">
                    <Form.Control
                    isInvalid={disabled}
                    placeholder="Elements..."
                    aria-label="Elements..."
                    aria-describedby="basic-addon2"
                    onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                        Only numeric value allowed.
                    </Form.Control.Feedback>
                    <Button variant="outline-secondary" id="button-addon2" disabled={ disabled } onClick={() => {recalcPage(field); elementSetter(field)}}>
                    OK
                    </Button>
                </InputGroup>
            </DropdownButton>
            <Pagination className="pages">
                <Pagination.First onClick={() => setPages(0)}/>
                <Pagination.Prev onClick={() => changePage(page-1)}/>
                {items}
                <Pagination.Next onClick={() => changePage(page+1)}/>
                <Pagination.Last onClick={() => setPages(lastPage())}/>
            </Pagination>
        </div>
    )
}