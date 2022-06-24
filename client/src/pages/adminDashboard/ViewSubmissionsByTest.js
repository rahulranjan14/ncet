import React, { useEffect, useState } from 'react';
import axios from 'axios'

import { Container, Row, Col} from 'react-bootstrap'

import { isAuthenticated } from '../../apiCalls/auth'

import { API } from '../../backend'

import { getSubmissions } from  '../../apiCalls/adminApis'

import Base from '../../components/base/Base'
import LoadingScreen from '../../components/loader/LoadingScreen';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import './table.css'

const ViewSubmissionsByTest = ({match}) => {

    const {user, token} = isAuthenticated();

    const [testDetails, setTestDetails] = useState()
    const [submissions, setSubmissions] = useState([])

    const [loading, setLoading] = useState(true)


    const loadtestDetails = async (testId) => {
        try {
            const {data} = await axios.get(`${API}/admin/test/${testId}/${user._id}`,
            { headers: {"Authorization" : `Bearer ${token}`} }
            )
            
            // console.log("test",data)
            setTestDetails(data)

        } catch (error) {
            console.log(error)
        }
    } 


    const loadtestsubmissions = async (testId) => {
        getSubmissions(user._id, token, {testId})
            .then(data => {
                // console.log(data)
                setSubmissions(data)
                setLoading(false)
            })
            .catch(err => console.log("error in getting submissions",err))
       
    }



    useEffect(() => {
        loadtestDetails(match.params.testId)
    },[])


    useEffect(() => {
        loadtestsubmissions(match.params.testId)
    },[])


    const heading = () => {
        return(
            <Container>
                <Row>
                    <Col style={{display:'flex', alignIntems:'center', justifyContent:'center', marginTop:'5em', marginBottom:'5em'}}>
                        <h1>Submissions :</h1>
                    </Col>
                </Row>
            </Container>
        )
    }


    var exceldownloadname = "testSubmission"
   

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

            <Row>
            <Col style={{overflowX:'auto'}}>
            <table id="table-to-xls">
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Father's Name</th>
                    <th>Inter College Name</th>
                    <th>Inter Principal Name</th>
                    <th>Email</th>
                    <th>Phone No.</th>
                    <th>Father's Phone No.</th>
                    <th>whatsapp No.</th>
                    <th>Aadhar No.</th>
                    <th>Place</th>
                    <th>District</th>
                    <th>Test Score</th>
                </tr>
                {submissions && submissions.map(submission => {
                    return(
                        <tr key={submission._id}>
                            <td className="px-2 py-2">{submission.studentName}</td>
                            <td className="px-2 py-2">{submission.fatherName}</td>
                            <td className="px-2 py-2">{submission.interCollegeName}</td>
                            <td className="px-2 py-2">{submission.interPrincipalName}</td>
                            <td className="px-2 py-2">{submission.email}</td>
                            <td className="px-2 py-2">{submission.contactNumber}</td>
                            <td className="px-2 py-2">{submission.fatherContactNumber}</td>
                            <td className="px-2 py-2">{submission.whatsappNumber}</td>
                            <td className="px-2 py-2">{submission.aadharNumber}</td>
                            <td className="px-2 py-2">{submission.place}</td>
                            <td className="px-2 py-2">{submission.district}</td>
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

    return ( 
        <Base>

        {heading()}

        {submissionsTable()}
        </Base>
    );
}
 
export default ViewSubmissionsByTest;