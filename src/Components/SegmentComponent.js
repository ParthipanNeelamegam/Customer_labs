import React, { useEffect, useState } from 'react';
import {Button, Modal, Form, Dropdown} from 'react-bootstrap';
import NewSection from './NewSection';
import Axios from 'axios';

function SegmentComponent(){
    const [popup, openPopup] = useState(false);
    const [segmentName, setSegmentName] = useState('');
    const [segmentArray, setSegmentArray] = useState([]);
    const [task, setTask] = useState([]);
    const [addValue, setAddValue] = useState(false);
    const [sendArray, setSendArray] = useState([]);
    const [values1,setValues] = useState('');
    const [separate, setSeparate] = useState([]);
    const [boolean, setSegmentBoolean] = useState(false);
    useEffect(()=>{
        setSegmentArray([...segmentArray, task]);
        sendArray.push(values1);
    },[task]);
   
    const values =[
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
        { label: 'Gender', value: 'gender' },
        { label: 'Age', value: 'age' },
        { label: 'Account Name', value : 'account_name'},
        { label: 'City', value: 'city' },
        { label: 'State', value: 'state' },
      ];
    

    const handleSelect = (value,values) => {
       setTask(value);
       setValues(values)
    }
    const handleClose = () => {
        openPopup(false)
    }

    const openSegment = () =>{
        openPopup(!popup)
    }
    useEffect(()=>{
        setSendArray(separate);
        if(addValue)
            setSegmentArray([]);
    },[addValue]);

    const setLink = () => {
        const data = sendArray.filter(arr => arr !== '');
        setSeparate(data);
        setAddValue(!addValue);
    }
    const handleAdd = (schemaValue, index) => {
        setSegmentBoolean(true)
       const schemaObject = {
        [schemaValue[0].value] : schemaValue[0].label,
       }
       separate[index] = schemaObject;
    }

    const saveSegment = () => {
        let getFinal = [];
        if(!boolean){
            separate.map((item, i)=> {
               getFinal.push({
                    [item.value] : item.label
                })
            })
        }
        const sendObject = {
            "segment_name" : segmentName,
            "schema" : boolean ? separate : getFinal
        }
        const value = JSON.stringify(sendObject);
        if(addValue){
            Axios.post('https://webhook.site/61d1ecc9-7c7e-413c-90d9-1b8386fec113',value)
            openPopup(false);
            setSegmentArray([]);
            sendArray([]);
        }
    }

    return(
        <div>
            <Button onClick={openSegment}>Save Segment</Button>
            {popup ?
                <Modal show={popup} onHide={handleClose}>
                    <Modal.Header closeButton className='modalTitleBackground'>
                        <Modal.Title>Saving Segment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className='formClass'> Enter the name of the Segment :
                                <Form.Control type="text" value={segmentName} onChange={(e) => setSegmentName(e.target.value)} style={{marginTop:"10px"}}/>
                            </Form.Label>
                            <Form.Label className='formClass' style={{marginTop:"10px"}}>To save your segment you need to add the schemas to build the query</Form.Label>

                        </Form.Group>
                        {addValue ?
                            <div className='blueBox'>
                                    <NewSection getArray={sendArray} values={values} handleAdd={handleAdd}/>
                            </div>
                        :"" }
                        <Dropdown style={{margin:'15px'}}>
                                <Dropdown.Toggle className='dropDown' id="dropdown-basic">
                                   Add schema to segment
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {values.map((option, index) => (
                                        <Dropdown.Item key={index} >
                                        <Form.Check
                                            type="checkbox"
                                            id={option.value}
                                            label={option.label}
                                            checked={segmentArray.includes(option.label)}
                                            onChange={()=>handleSelect(option.label,option)}
                                        />
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                        </Dropdown>
                        <div style={{margin:'15px'}}>
                            <a className="newSchema" onClick={setLink} target="_blank" > + Add new schema</a>
                        </div>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer className='footerBackground'>
                        <Button variant="primary" onClick={saveSegment}>Saving the segment</Button>
                        <Button variant="warning" onClick={handleClose}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            :""}
        </div>
    )
}

export default SegmentComponent;