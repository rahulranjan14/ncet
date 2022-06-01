import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'

import { Form, Button, Container, Col, Row, Card } from 'react-bootstrap'

import { signinFunction, authenticate, isAuthenticated } from '../../apiCalls/auth'

import Base from '../../components/base/Base'

import './signin.css'

const Signin = () => {

    const [userData, setUserData] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
    })

    const [missing, setMissing] = useState(false)

    const { email, password, error, loading, didRedirect} = userData
    const {user} = isAuthenticated()

    const handleChange = name => event => {
        setMissing(false)
        setUserData({...userData, error: false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        if( email == "" || password == ""){
            setMissing(true)
        }
        else{
        setUserData({...userData, error: false, loading: true})
        signinFunction({email, password})
        .then(data => {
            if(data?.error){
                setUserData({...userData, error: data.error, loading:false})
            }
            else{
                authenticate(data, () => {
                    setUserData({...userData, didRedirect: true})
                })
              
            }
        })
        .catch(err => console.log(err))
        }
    }


    const performRedirect = () => {

        if(didRedirect){
            if(user && user.role === 1){
                return <Redirect to="/" />
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }

    }


    const loadingMessage = () => {
        return(
            loading && (
                <div className="parent d-flex align-items-center justify-content-center">
                <div className="child col-lg-6 col-md-6 col-sm-12">

                <h3 className="text-center text-dark">Loading...</h3>                

                </div>
                </div>
            )
        )
    }


    const errorMessage = () => {
        return(
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
  }

   


  

    const fieldsMissingMessage = () => {
        if(missing != "")
        return(
            <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
        <div className="" >
        <h6 className="text-center text-dark">
            Please enter the details
        </h6>
        </div>
        </div>
        </div>
        )
        
    }



    const signinForm = () => {
        return(
            <Form className="signup-form">
               
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
                        Sign In
                    </Button>
                </Form.Group>
             
            
                
            </Form>
        )
    }


    return(
        <Base>
        
            {loadingMessage()}
        
            <Container>
                <Row>
                    <Col lg={6} md={6} sm={12} className='offset-lg-3 mt-5'>
                        <Card  className="signup-card">
                            {signinForm()}
                        </Card>
                    </Col>
                </Row>
            </Container>

            
            {errorMessage()}
            {fieldsMissingMessage()}
            {performRedirect()}
           
        </Base>
    )

}

export default Signin;