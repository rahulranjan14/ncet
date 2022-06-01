import React, { useState } from 'react' 
import { Link, Redirect } from 'react-router-dom'

import { Button, Form, Container, Row, Col, Modal } from 'react-bootstrap'

import { submitTest } from '../../apiCalls/adminApis'
import { isAuthenticated } from '../../apiCalls/auth'

import Base from '../../components/base/Base'

// module to convert excel into json
import * as XLSX from "xlsx";

import './table.css'

const CreateTestPage = () => {

    const {user, token} = isAuthenticated();

    const [testDetails, setTestDetails] = useState(
        {
            name:"",
            description:"",
            startTime:"",
            endTime:"",
            duration:""
        }
    )

    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])

    const [testCreationSuccess, setTestCreationSuccess] = useState(false)

    const { name, description, startTime, endTime, duration} =  testDetails

    const handleCloseAfterSubmit = () => setTestCreationSuccess(false);

    const handleChange = name => event => {
        setTestDetails({...testDetails, [name]: event.target.value})
    }



   


    const submitTestDetails = (event) => {
        event.preventDefault();
        submitTest(user._id, token, { name, description, startTime, endTime, duration, questions, answers })
        .then(data => {
            // console.log(data)
            setTestCreationSuccess(true)
        })
        .catch(err => console.log("error in submititng test",err))
    }


    const formInputs = () => {
        return(
            <Container className="mt-4 mb-4 px-4 border-bottom border-top py-5">
                <Row>
                    <Form>

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Test Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter test Name Here" onChange={handleChange("name")} value={name} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Test Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Test description" onChange={handleChange("description")} value={description} />
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="formBasicDate">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control type="text" placeholder="24-H format: (month dd, yyyy hh:mm:ss) eg. jan 27, 2021 02:30:00" onChange={handleChange("startTime")} value={startTime} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicTime">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control type="text" placeholder="24-H format: (month dd, yyyy hh:mm:ss) eg. jan 27, 2021 02:30:00" onChange={handleChange("endTime")} value={endTime} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicDuration">
                        <Form.Label>Duration (in minutes)</Form.Label>
                        <Form.Control type="number" placeholder="eg. 60 " onChange={handleChange("duration")} value={duration} />
                    </Form.Group>

                    

                    </Form>
                </Row>
            </Container>
        )
    }


    

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsArrayBuffer(file);
    
          fileReader.onload = (e) => {
            const bufferArray = e.target.result;
    
            const wb = XLSX.read(bufferArray, { type: "buffer" });
    
            const wsname = wb.SheetNames[0];
    
            const ws = wb.Sheets[wsname];
    
            const data = XLSX.utils.sheet_to_json(ws);
    
            resolve(data);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
    
        promise.then((d) => {
            // console.log(d)
        //   setItems(d);

        var questionsLocal = [];
        var answersLocal = [];

          for (let i = 0; i < d.length; i++) {
              var temp={
                  no:"",
                  text:"",
                  a:"",
                  b:"",
                  c:"",
                  d:""
              }
              var answer = String(d[i].answer).trim()
              
              temp.no = d[i].no
              temp.text = String(d[i].text).trim()
              temp.a = String(d[i].a).trim()
              temp.b = String(d[i].b).trim()
              temp.c = String(d[i].c).trim()
              temp.d = String(d[i].d).trim()
              
              questionsLocal.push(temp);
              answersLocal.push(answer)

          }

          setQuestions(questionsLocal)
          setAnswers(answersLocal)
        });
    };



    const excelInput = () => {
        return(
            <Container className="d-flex justify-content-center mt-3 mb-3">
                <label style={{fontSize:'1.2em'}} className="mx-3">Choose an Excel file:</label>
                <input
                type="file"
                onChange={(e) => {
                const file = e.target.files[0];
                readExcel(file);
                }}
                />
            </Container>
        )
    }


    const Header = () => {
        return(
            <Container style={{marginTop:'10vh', marginBottom:'10vh'}}>
                <Row>
                    <Col style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <h2>Create A New Test</h2>
                    </Col>
                </Row>
            </Container>
        )
    }


    const DisplayExcelData = () => {
        var idx = -1;
        return(
            <Container fluid className="mt-5 mb-5">
                <Row>
                    <Col style={{overflowX:'auto'}}>
                        <table id="table-to-xls">
                            <tr>
                                <th className="col-1">no</th>
                                <th className="col-6">text</th>
                                <th className="col-1">a</th>
                                <th className="col-1">b</th>
                                <th className="col-1">c</th>
                                <th className="col-1">d</th>
                                <th className="col-1">answer</th>
                            </tr>

                        {questions.map(question => {
                            idx = idx+1;
                            return(
                                <tr>
                                    <td className="py-2 col-1" >{question.no}</td>
                                    <td className="py-2 col-6" >{question.text}</td>
                                    <td className="py-2 col-1" >{question.a}</td>
                                    <td className="py-2 col-1" >{question.b}</td>
                                    <td className="py-2 col-1" >{question.c}</td>
                                    <td className="py-2 col-1" >{question.d}</td>
                                    <td className="py-2 col-1" >{answers[idx]}</td>
                                </tr>
                            )
                            
                        })}
                        </table>
                    </Col>

                    
                </Row>
            </Container>
        )
    }

    const DisplayCreateButton = () => {
        return(
            <Container>
                <Row>
                    <Col style={{display:'flex', justifyContent:'center', alignItems:'center'}} >
                        <Button variant="secondary" size="md" className="mt-1 mb-1" style={{ minWidth:'50vw'}}onClick={submitTestDetails}>Create</Button>
                    </Col>
                </Row>
            </Container>
        )
    }

    const showTestCreationSuccess = () => {
        return(
            <Modal
            show={testCreationSuccess}
            onHide={handleCloseAfterSubmit}
            backdrop="static"
            keyboard={false}
            >
               
                <Modal.Body>
                Test Created Successfuly.
                </Modal.Body>


                <Modal.Footer>
                <Link style={{textDecoration:'none'}} to="/admin/dashboard">
                    <Button variant="secondary" className="px-5">
                        
                        <span style={{color:'#fff'}}>Ok</span>
                       
                    </Button>
                </Link>    
                </Modal.Footer>
            </Modal>
        )
    }

    return(
   
        <Base>
        <Header />
        
        {formInputs()}

        {excelInput()}

        {DisplayExcelData()}

        
        {DisplayCreateButton()}

        {showTestCreationSuccess()}

        </Base>
       
    )
}

export default CreateTestPage;