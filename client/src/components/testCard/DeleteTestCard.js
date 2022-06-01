import React from 'react';

import { Link } from 'react-router-dom'

import { Card, Button } from 'react-bootstrap'

import axios from 'axios'

import { isAuthenticated }  from '../../apiCalls/auth'
import { API } from '../../backend';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DelTestCard = ({testName="", testId="", startTime="", endTime="", testDescription="", testDuration=""}) => {

    const {user, token} = isAuthenticated();

    // const notifyDelete = () => toast("Deleted! Please refresh the page");

    const deleteTest = async () => {
        // console.log("deleteTest trigerred")
        await axios.delete(`${API}/test/delete/${testId}/${user._id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((response) =>  {
            //   console.log(response.data)
          return toast("Deleted! please refresh the page", 
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: 'slide'
          }
          )})
    }

    return(

        <Card style={{ width: '18rem', boxShadow: '1px 1px 1px #fff', borderRadius:'5px' }} className="mt-3">
        
        <ToastContainer />

        <Card.Body>
            <Card.Title>{testName}</Card.Title>
            <Card.Subtitle style={{fontSize:'small'}} className="mb-1 mt-2 text-muted">From : {startTime}</Card.Subtitle>
            <Card.Subtitle style={{fontSize:'small'}} className="mb-1 mt-2 text-muted">To : {endTime}</Card.Subtitle>
            <Card.Subtitle style={{fontSize:'small'}} className="mb-2 mt-1 text-muted">Duration : {testDuration} minutes</Card.Subtitle>
            <Card.Text style={{fontSize:'0.9em'}} className="mt-3 mb-3">
            {testDescription}
            </Card.Text>
     
            
            <Card.Text style={{fontSize:'0.9em'}} className="mt-2 mb-2 text-dark">Test Id : <br/> {testId}
            </Card.Text>

        </Card.Body>

      {/*  <Card.Footer style={{textAlign:'center'}} className="mt-1 mb-2">
            <Link to={`/test/submissions/${testId}`}>View Submissions</Link>
        </Card.Footer>
    */}

        <Card.Footer style={{textAlign:'center'}}>
        <Button variant="outline-dark"   onClick={deleteTest} block>Delete</Button>
        </Card.Footer>

        </Card>

    )
}

export default DelTestCard;
