import React from 'react';

import { Link } from 'react-router-dom'

import { Card } from 'react-bootstrap'

const TestCard = ({testName="", testId="", startTime="", endTime="", testDescription="", testDuration=""}) => {

    var startDate = new Date(String(startTime)).getTime();
    var endDate = new Date(String(endTime)).getTime();
    var currentDate = new Date().getTime();

    // console.log("duration",testDuration)
    // console.log("duration",testDescription)

    return(

        <Card style={{ width: '18rem', boxShadow: '1px 1px 1px #fff', borderRadius:'5px', }}>
        <Card.Body>
            <Card.Title>{testName}</Card.Title>

            <Card.Subtitle style={{fontSize:'small'}} className="mb-1 mt-2 text-muted">Active from : {startTime}</Card.Subtitle>
            <Card.Subtitle style={{fontSize:'small'}} className="mb-2 mt-1 text-muted">Till : {endTime}</Card.Subtitle>
            <Card.Subtitle style={{fontSize:'small'}} className="mb-2 mt-1 text-muted">Duration : {testDuration} minutes</Card.Subtitle>
            <Card.Text style={{fontSize:'0.9em'}} className="mt-3 mb-3">
            {testDescription}
            </Card.Text>
            
        </Card.Body>
        {(currentDate >= startDate && endDate >= currentDate) && (
            <Card.Footer style={{textAlign:'center'}}>
            <Link to={`/test/submit/${testId}`}>Attend Now</Link>
            </Card.Footer>
        ) 
        }
        </Card>

    )
}

export default TestCard;