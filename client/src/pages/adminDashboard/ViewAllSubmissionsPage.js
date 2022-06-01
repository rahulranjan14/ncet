import React, {useState, useEffect} from 'react'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'

import { API } from '../../backend'

import { isAuthenticated } from '../../apiCalls/auth'

import Base from '../../components/base/Base'
import LoadingScreen from '../../components/loader/LoadingScreen'

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import './table.css'

const ViewAllSubmissions = () => {

    const {user, token} = isAuthenticated();

    const [testsList, setTestsList] = useState([])
    const [error, setError] = useState(false)

    const [loading, setLoading] = useState(true)
    
   
    const loadalltestsubmissions = async () => {
        try {
            const {data} = await axios.get(`${API}/testSubmissions/${user._id}`,
            { headers: {"Authorization" : `Bearer ${token}`} }
            )
            
            //  console.log("test list received",data)
            setTestsList(data)
            // console.log("test list local",testsList)
            setLoading(false)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadalltestsubmissions()
    },[])

    const heading = () => {
        return(
            <Container>
                <Row>
                    <Col style={{display:'flex', alignIntems:'center', justifyContent:'center', marginTop:'5em', marginBottom:'5em'}}>
                        <h1>All Submissions</h1>
                    </Col>
                </Row>
            </Container>
        )
    }

    var exceldownloadname = "allSubmissions"

    const submissionsTable = () => {
        return(
            <Container  className="mt-5 mb-5">
            <Row>
                <Col style={{display:'flex', flexDirection:'row-reverse'}}>

                <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button mt-2 mb-2"
                table="table-to-xls"
                filename={exceldownloadname}
                sheet={exceldownloadname}
                buttonText="Download as XLS"/>
                
                </Col>
            </Row>
            <Row></Row>
            <Row>
            <Col style={{overflowX:'auto'}}>
            <table id="table-to-xls">
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Test</th>
                    <th>Score</th>
                </tr>
                {testsList && testsList.map(submission => {
                    return(
                        <tr key={submission._id}>
                            <td className="px-2 py-2">{submission.studentName}</td>
                            <td className="px-2 py-2">{submission.email}</td>
                            <td className="px-2 py-2">{submission.contactNumber}</td>
                            <td className="px-2 py-2">{submission.testId.name}</td>
                            <td className="px-2 py-2">{submission.score}</td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
            </Col>
            </Row>
            </Container>
        )
    }


    if(loading == true){
        return(
            <LoadingScreen />
        )
    }


    return(
        <Base>
        
            {heading()}

            {submissionsTable()}
           

         
        </Base>
    )
}

export default ViewAllSubmissions;