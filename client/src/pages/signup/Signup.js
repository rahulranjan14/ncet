import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import { Form, Button, Container, Col, Row, Card } from 'react-bootstrap'

import {  signupFunction, authenticate, isAuthenticated } from '../../apiCalls/auth'

import Base from '../../components/base/Base'

import './signup.css'




const Signup = () => {

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    })

    const [missing, setMissing] = useState(false)

    const { name, email, password, error, success } = userData

    

    const handleChange = name => event => {
        setMissing(false)
        setUserData({...userData, error: false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        if(name == "" || email == "" || password == ""){
            setMissing(true)
        }
        else{
        setUserData({...userData, error: false})
        signupFunction({name, email, password})
        .then(data => {
            if(data?.error){
                setUserData({...userData, error: data.error, success:false})
            }
            else{
                setUserData({...userData, name:"", email:"", password:"", error:"", success: true})
            }
        })
        .catch(err => console.log(err))
        }
    }



    const successMessage = () => (
        <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
        <div className="" style={{display: success ? "" : "none"}}>
        <h6 className="text-center text-dark">
        Your account was created successfully. Please <Link to="/signin">Login here</Link>
        </h6>
        </div>
        </div>
        </div>
    )


    const errorMessage = () => (
        <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
        <div className="" style={{display: error ? "" : "none"}}>
        <h6 className="text-center text-dark">
        {error}
        </h6>
        </div>
        </div>
        </div>
    )


    const fieldsMissingMessage = () => {
        if(missing != "")
        return(
            <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
        <div className="" >
        <h6 className="text-center text-dark">
            Please fill the details
        </h6>
        </div>
        </div>
        </div>
        )
        
    }



    const signupForm = () => {
        return(
            <Form className="signup-form">

                <Form.Group className="my-3 mx-5" controlId="formBasicName">
                    <Form.Label className="text-start">Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" onChange={handleChange("name")} value={name}  />
                </Form.Group>
            
                <Form.Group className="my-3 mx-5" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleChange("email")} value={email} />
                </Form.Group>
    
                <Form.Group className="my-3 mx-5" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleChange("password")}  value={password} />
                </Form.Group>
    
    
                <Form.Group className="my-4 mx-5 d-grid ">
                    <Button variant="secondary" block onClick={onSubmit}>
                        Sign Up
                    </Button>
                </Form.Group>
                
            </Form>
        )
    }


    return(
        <Base>

        
            <Container>
                <Row>
                    <Col lg={6} md={6} sm={12} className='offset-lg-3 mt-5'>
                        <Card  className="signup-card">
                            {signupForm()}
                        </Card>
                    </Col>
                </Row>
            </Container>

            {successMessage()}
            {errorMessage()}
            {fieldsMissingMessage()}

           
        </Base>
    )

}

export default Signup;