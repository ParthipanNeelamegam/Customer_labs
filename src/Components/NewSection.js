import React, { useMemo, useRef, useState } from "react";
import {unionBy} from 'lodash/array';
import { Form } from "react-bootstrap";

const NewSection = ({getArray,values,handleAdd}) => {

    const [newOptions, setNewOptions] = useState(''); 
    const selectRef = useRef();  
    useMemo(()=>{
        const getCombined = unionBy(getArray,values,'label');
        const data = getCombined.slice(getArray.length);
        setNewOptions(data);
    },[getArray,values]);

    const handleChange = (e,i) =>{
       const getSchema = values.filter(value => value.value === e.target.value)
       handleAdd(getSchema,i)
    }

    return(
        <div style={{margin:'10px'}}>
            {getArray.length !== 0 ? getArray.map((get,i) => {
                return (
                <Form.Select key={i} style={{marginTop:'10px'}}  ref={selectRef} onChange={(e)=>handleChange(e,i)}>
                      <option value={get.value}  >{get.label}</option>
                      {newOptions.length !== 0 ? 
                        newOptions.map((option,i) => <option key={i} value={option.value}>{option.label}</option>)
                      :""}
                </Form.Select>
                )
            }):""}
        </div>
    )
}

export default NewSection;



