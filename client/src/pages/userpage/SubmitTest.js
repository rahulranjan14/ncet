//module imports
import React, { useEffect, useState } from 'react' 
import { Link }  from 'react-router-dom'
import axios from 'axios'
import { useTimer } from 'react-timer-hook';

// UI related imports
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Form, Modal, Row, Col, Card, Container } from 'react-bootstrap'


// api import
import { API } from '../../backend'

// api helper import
import {  submitResponse } from '../../apiCalls/userApis'


//custom components import
import FooterBar from '../../components/footer/FooterBar'
import LoadingScreen from '../../components/loader/LoadingScreen'



const SubmitTest = ({match}) => {

        // console.log("testid is", match.params)

        //for loading screen
        const [loading, setLoading] = useState(true)

        const [testgiven, setTestGiven] = useState(false)

        //for formMOdal
        const [showFormModal, setShowFormModal] = useState(true);
        const [showAfterSubmitModal, setShowAfterSubmitModal] = useState(false);

        const handleClose = () => setShowFormModal(false);
        const handleCloseAfterSubmit = () => setShowAfterSubmitModal(false);


        //main object where all details of test to be saved
        const [testValues, setTestValues] = useState(null)

        //for for modals validation
        const [nameError, setNameError] = useState(false)
        const [emailError, setEmailError] = useState(false)
        const [phoneError, setPhoneError] = useState(false)
        const [aadharError, setAadharError] = useState(false)

        //object to be send for submiting response
        const [submitValues, setSubmitValues] = useState({
            testId: {
                _id: match.params.testId
            },
            studentName: "",
            fatherName: "",
            interCollegeName: "",
            interPrincipalName: "",
            contactNumber: "",
            fatherContactNumber:"",
            whatsappNumber: "",
            aadharNumber: "",
            email: "",
            place: "",
            district: ""

        })

        // destructuring submitvalues
        const { testId, studentName, fatherName, interCollegeName, interPrincipalName, contactNumber, fatherContactNumber, whatsappNumber, aadharNumber, email, place, district } =  submitValues

        //global answers object(to send to backend)
        const[answers, setAnswers] = useState([])

        //for timer hook        
        const [testEndTime, setTestEndTime] = useState(0)
        const [testDuration, setTestDuration] = useState(0)

        //handling input changes in formdata
        const handleChange = name => event => {
            setSubmitValues({...submitValues, [name]: event.target.value})
            if(name == "studentName"){setNameError(false)}
            if(name == "email"){setEmailError(false)}
            if(name == "contactNumber"){setPhoneError(false)}
            if(name == "aadharNumber"){setAadharError(false)}
        }


        //function to submit response
        const onSubmit = () => {
         
            // console.log("onsubmit trigerred",testId, studentName, contactNumber, email, answers)
            submitResponse({testId, studentName, fatherName, interCollegeName, interPrincipalName, contactNumber, fatherContactNumber, whatsappNumber, aadharNumber, email, place, district, answers})
            .then(data => {
                //  console.log("submitted",data)
                setShowAfterSubmitModal(true)
            })
            .catch(err => console.log("error occured while submitting response",err))
        }


        //initializing answers array
        const initializeAnswersArray = (arraylen) => {
            var answersLocal = []
            for (let i = 0; i < arraylen; i++) {
               answersLocal.push("noResponse")
            }
            // console.log("answerslocal",answersLocal)
            setAnswers(answersLocal)
        }

        

        //load the test data
        const loadTest = async (testIde) => {
            try {
                const {data} = await axios.get(`${API}/test/${testIde}`)
                setTestValues(data)
                initializeAnswersArray(data.questions.length)
                setLoading(false)
                // setTestEndTime(data.endTime)
                setTestEndTime(String(new Date()))
                setTestDuration(data.duration*60)
            } catch (error) {
                console.log(error)
                // console.log("not success")
            }
        }

        //first function
        useEffect(() => {
            loadTest(match.params.testId)
        },[])



        //form details checker
        const submitFormDetails = () => {
            nameErrorMessage()
            emailErrorMessage()
            phoneErrorMessage()
            aadharErrorMessage()
            if(nameChecker() === true && emailChecker() === true && phoneChecker() === true  && aadharChecker() == true )
            {
                // setShowFormModal(false)

                var config = {
                    method: 'get',
                    url: `${API}/submissions/exists/${aadharNumber}`,
                    headers: { }
                  };
                  
                  axios(config)
                  .then(function (response) {
                    // console.log(JSON.stringify(response.data));
                    // console.log("len", response.data.length)

                    let testSubmissionsTemp = []

                    for (let i = 0; i < response.data.length; i++) {
                        // console.log("api testid",response.data[i].testId);
                        // console.log("api currentid",testId._id);
                        // console.log("api currentid",typeof(testId));
                        // console.log(response.data[i].testId == testId._id)

                        if(response.data[i].testId === testId._id){
                            // console.log("inside nested if")
                            testSubmissionsTemp.push(response.data[i])
                        }
                        
                    }

                    if(testSubmissionsTemp.length === 0){
                      setShowFormModal(false)
                    }
                    else if(testSubmissionsTemp.length > 0){
                      setShowFormModal(false)
                      setTestGiven(true)
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  
                  
                  });
            }
    
           



            
        }
        
        //form error checker
        const nameChecker = () => {
            // console.log("name checker running")
            if( studentName.trim().length == 0){
            setNameError(true)
            return false
            }
            else
            return true
        }

        const emailChecker = () => {
            // console.log("email checker running")
            var emailregex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(! email.match(emailregex)){
            setEmailError(true)
            return false
            }
            else{
            setEmailError(false)
            return true
            }
            
        }

        const phoneChecker = () => {
            var phoneno = /^\d{10}$/;
            // console.log("phone checker running")
            if(! contactNumber.match(phoneno)){
            setPhoneError(true)
            return false
            }
            else
            return true
        }

        const aadharChecker = () => {
            if(aadharNumber.length !== 12){
                setAadharError(true)
                return false
            }
            else
            return true
        }


        //form error messages
        const nameErrorMessage = () => {
            // console.log("name error running")
            // console.log("name error",nameError)
            if(nameError === true){
            return <p style={{fontSize:'0.9em'}} className="text-danger">Please Enter a valid name</p>
            }
        }

        const emailErrorMessage = () => {
            // console.log("email error running")
            // console.log("email error",emailError)
            if(emailError === true){
            return <p style={{fontSize:'0.9em'}} className="text-danger">Please Enter a valid email</p>
            }
        }

        const phoneErrorMessage = () => {
            // console.log("phone error running")
            // console.log("phone error",phoneError)
            if(phoneError === true){
            return <p style={{fontSize:'0.9em'}} className="text-danger">Please Enter a valid phone number</p>
            }
        }

        const aadharErrorMessage = () => {
            // console.log("phone error running")
            // console.log("phone error",phoneError)
            if(aadharError === true){
            return <p style={{fontSize:'0.9em'}} className="text-danger">Please Enter a valid aadhar number</p>
            }
        }

        const testGivenModal = () => {
            return(
                <Modal
                show={testgiven}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                >

                    <Modal.Body>
                        <div className='my-5 mx-5'>
                        <h1>You have already responded.</h1>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                <Link style={{textDecoration:'none'}} to="/">
                    <Button variant="secondary" className="px-5">
                        
                        <span style={{color:'#fff'}}>Ok</span>
                       
                    </Button>
                </Link>    
                </Modal.Footer>
                </Modal>
            )
        }

        //form modal
        const formModal = () => {
            return(
                <Modal
                show={showFormModal}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                >
                
                <Modal.Header >
                    <Modal.Title>Please Enter the details</Modal.Title>
                </Modal.Header>
    
                <Modal.Body>
                
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Student Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" onChange={handleChange("studentName")} value={studentName} />
                    {nameErrorMessage()}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Father's Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Father's Name" onChange={handleChange("fatherName")} value={fatherName} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Inter College Name</Form.Label>
                    <Form.Control type="text" placeholder="Inter College Name" onChange={handleChange("interCollegeName")} value={interCollegeName} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Inter Principal Name</Form.Label>
                    <Form.Control type="text" placeholder="Inter Principal Name" onChange={handleChange("interPrincipalName")} value={interPrincipalName} />
                    </Form.Group>
                    
                
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={handleChange("email")} value={email}  />
                    {emailErrorMessage()}
                    </Form.Group>
    
                    <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Phone No.</Form.Label>
                    <Form.Control type="text" placeholder="Phone" onChange={handleChange("contactNumber")} value={contactNumber} />
                    {phoneErrorMessage()}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Father's Contact No.</Form.Label>
                    <Form.Control type="text" placeholder="Father's phone" onChange={handleChange("fatherContactNumber")} value={fatherContactNumber} />
                    </Form.Group>
                        

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Whatsapp No.</Form.Label>
                    <Form.Control type="text" placeholder="Whatsapp No" onChange={handleChange("whatsappNumber")} value={whatsappNumber} />
                 
                    </Form.Group>    

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Aadhar No.</Form.Label>
                    <Form.Control type="text" placeholder="Aadhar no" onChange={handleChange("aadharNumber")} value={aadharNumber} />
                    {aadharErrorMessage()}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Place</Form.Label>
                    <Form.Control type="text" placeholder="Enter Place" onChange={handleChange("place")} value={place} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>District</Form.Label>
                    <Form.Control type="text" placeholder="Enter District" onChange={handleChange("district")} value={district} />
                    </Form.Group>
                </Form>
              
                </Modal.Body>
                
                <Modal.Footer>
                    
                    <Button variant="secondary" className="px-5" onClick={submitFormDetails}>Submit</Button>
                </Modal.Footer>
                </Modal>
            )
        }


        //modal to be displayed after submission
        const afterSubmitModal = () => {
            return(
            <Modal
            show={showAfterSubmitModal}
            onHide={handleCloseAfterSubmit}
            backdrop="static"
            keyboard={false}
            >
               
                <Modal.Body>
                Thank you for participating in NCET admission Test
                </Modal.Body>


                <Modal.Footer>
                <Link style={{textDecoration:'none'}} to="/">
                    <Button variant="secondary" className="px-5">
                        
                        <span style={{color:'#fff'}}>Ok</span>
                       
                    </Button>
                </Link>    
                </Modal.Footer>
            </Modal>
            )
        }


        //array to store answer values and setting it to const
        const answersarrayUpdater = (qno, answer) => {
            var answerslocalhere = answers

            var arrayIndex = qno-1;
            // console.log("updated array local",answerslocalhere)
            answerslocalhere[arrayIndex] = answer
            setAnswers(answerslocalhere)
            // console.log("updated array ", answers)
            // console.log("answers array ", answers)
        }


       

        const QuestionCard = ({text="", a="",b="",c="",d="",qno=""}) => {

            //for design purpose
            const [optionA, setOptionA] = useState(false)
            const [optionB, setOptionB] = useState(false)
            const [optionC, setOptionC] = useState(false)
            const [optionD, setOptionD] = useState(false)

         
            //below functions for design 
            function onselectA(qno, a) {
                // console.log("a selected")
                answersarrayUpdater(qno, a)
                setOptionA(true)
                setOptionB(false)
                setOptionC(false)
                setOptionD(false)
            }

            function onselectB(qno, b) {
                // console.log("b selected")
                answersarrayUpdater(qno, b)
                setOptionB(true)
                setOptionA(false)
                setOptionC(false)
                setOptionD(false)
            }

            function onselectC(qno, c) {
                // console.log("c selected")
                answersarrayUpdater(qno, c)
                setOptionC(true)
                setOptionA(false)
                setOptionB(false)
                setOptionD(false)
            }

            function onselectD(qno, d) {
                // console.log("d selected")
                answersarrayUpdater(qno, d)
                setOptionD(true)
                setOptionA(false)
                setOptionB(false)
                setOptionC(false)
            }
            
            return(
                <Card  style={{marginTop:'2vh',marginBottom:'2vh', padding:'2em', borderRadius:'5px'}}>
                    <Card.Text>
                        {qno}. {text}
                    </Card.Text>

                    <Container>
                    <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                            <span style={{display:'block'}}>
                                a. <Button variant="light" style={ optionA ? buttonstyle.buttonactive : buttonstyle.buttoninactive } className="mx-1 my-1"  onClick={() => onselectA(qno,a)}> {a} </Button>
                            </span>
                        </Col>
                        
                        <Col lg={6} md={6} sm={12} xs={12}>
                            <span style={{display:'block'}}>
                                b. <Button variant="light" style={ optionB ? buttonstyle.buttonactive : buttonstyle.buttoninactive } className="mx-1 my-1"  onClick={() => onselectB(qno,b)}> {b} </Button>
                            </span>
                        </Col>
                    </Row>    

                    <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                            <span style={{display:'block'}}>
                                c. <Button variant="light" style={ optionC ? buttonstyle.buttonactive : buttonstyle.buttoninactive } className="mx-1 my-1"  onClick={() => onselectC(qno,c)}> {c} </Button>
                            </span>
                        </Col>
                        
                        <Col lg={6} md={6} sm={12} xs={12}>
                            <span style={{display:'block'}}>
                                d. <Button variant="light" style={ optionD ? buttonstyle.buttonactive : buttonstyle.buttoninactive } className="mx-1 my-1"  onClick={() => onselectD(qno,d)}> {d} </Button>
                            </span>
                        </Col>
                 
                    </Row>
                    </Container>
                   
                </Card>
            )
        }




    

       

      

        function testStatus(){
            if(testValues !== null){
                // console.log("testvalues",testValues)
                var startDate = new Date(String(testValues.startTime)).getTime()
                var endDate = new Date(String(testValues.endTime)).getTime()
                var currentDate = new Date().getTime()

                if(currentDate >= startDate && endDate >= currentDate ){
                    return "active";
                }
                else if(startDate > currentDate ){
                    return "upcoming";
                }
                else if(currentDate > endDate){
                    return "over"
                }

            }
            else{
                return "error"
            }
        }



        function MyTimer({ expiryTimestamp }) {
            const {
              seconds,
              minutes,
              hours,
              days,
              isRunning,
            } = useTimer({ expiryTimestamp, onExpire: () => console.log("",onSubmit()),  autoStart: true,});
          
          
            return (
                <Container fluid>
                <Container style={{marginTop:"3vh",marginBottom:"3vh", display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <div>
                        <Row>
                            <Col style={{textAlign:'center'}}>
                                <p style={{fontSize:'1em'}}>Timer</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div style={{fontSize:'1.5em', fontWeight:'bold'}}> {hours}h : {minutes}m : {seconds}s</div>
                            </Col>
                        </Row>
                    </div>
                </Container>
                </Container>
            );
          }

          const time = new Date(String(new Date()));
          time.setSeconds(time.getSeconds() + testDuration); 

        

        const testUpcomingScreen = () => {
            if(testStatus() == "upcoming"){
                return(
                    <Container fluid style={{marginBottom:'25vh', marginTop:'25vh'}}>
                        <Container style={{marginTop:'40vh', marginBottom:'30vh'}}>
                        <Row>
                            <Col style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                <h1>This test hasn't started yet. Come Back later.</h1>
                            </Col>
                        </Row>
                        </Container>
                    </Container>
                )
            }
        }


        const testOverScreen = () => {
            if(testStatus() == "over"){
                return(
                    <Container fluid style={{marginBottom:'25vh', marginTop:'25vh'}}>
                        <Container style={{marginTop:'40vh', marginBottom:'30vh'}}>
                        <Row>
                            <Col style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                                <h1>This test is over</h1>
                            </Col>
                        </Row>
                        </Container>
                    </Container>
                )
            }
        }


        const somethingWentWrong = () => {
            if(testStatus() == "error"){
                return(
                    <h1>Someting went wrong</h1>
                )
            }
        }

        const testOngoingScreen = () => {
            if(testStatus() == "active"){
                return(
                    <Container fluid style={{marginBottom:'5vh'}}>
                    
                    <MyTimer expiryTimestamp={time}/>
                 
                    <Container style={{marginTop:'5vh', marginBottom:'3vh'}}>
                        <Row>
                            <Col lg={{order: 'first', span: 6}} md={{order: 'first', span: 6}} sm={{order: 'last', span:12}} xs={{order: 'last', span: 12}} style={{display:'flex', flexDirection:'column-reverse', minWidth:'100px' }}><h2 className="mt-2 mb-2"> {testValues.name} </h2></Col>
                            <Col lg={{order: 'last', span: 6}} md={{order: 'last', span: 6}} sm={{order: 'first', span: 12}} xs={{order: 'first', span: 12}} style={{textAlign:'right', minWidth:'100px', display:'block'}} >
                              {/* <span style={{fontSize:'0.9em'}}>  {studentName} </span> <br/>
                              <span style={{fontSize:'0.9em'}}>  {contactNumber} </span> <br/>
                              <span style={{fontSize:'0.9em'}}> {email} </span>  */}

                              <span style={{fontSize:'0.9em'}}>N Venugopal Reddy </span> <br/>
                              <span style={{fontSize:'0.8em'}}>- Director-Admissions </span> <br/>
                              <span style={{fontSize:'0.9em'}}>+919949166771, +919985165771 </span> 
                            </Col>
                        </Row>
                    </Container>


                    {formModal()}
        
        
                    <Container>
                    { testValues && testValues.questions.map(question => {
                       
                        return(
                            <QuestionCard qno={question.no} text={question.text} a={question.a} b={question.b} c={question.c} d={question.d} />
                        )
                    })}
                    </Container>
        
                    <Container style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop:'3vh'}}>
                        <Button onClick={onSubmit} variant="secondary" className="px-5" size="lg" block>Submit</Button>
                    </Container>
    
                    
                    </Container>
                )
            }
        }


        if(loading == true){
            return(
                <LoadingScreen />
            )
        }


       
       return(
           <>

           {testStatus() == "upcoming" && (
            testUpcomingScreen()
           )}
           
           {testStatus() == "over" && (
            testOverScreen()
           )}
           
           
            {testOngoingScreen()}
            
            {afterSubmitModal()}
           
           {somethingWentWrong()}

{testGivenModal()}

            <FooterBar />
           </>
       )

        



}

export default SubmitTest;

const buttonstyle = {
    buttonactive:{
        backgroundColor:"#bbbbbb",
        minWidth:'50%',
        textAlign:'left',
        border: '2px solid #bbbbbb'
    },
    buttoninactive:{
        backgroundColor:"#f6f6f6",
        minWidth:'50%',
        textAlign:'left',
        border: '2px solid #bbbbbb'
    }
}