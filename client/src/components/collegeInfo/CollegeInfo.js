import React from 'react'

import { Col, Row,Container, Image } from "react-bootstrap";


import ncetlogobg1 from '../../assets/ncetlogobg1.png'

const CollegeInfo = () => {
    return(
        <Container fluid className="bg-dark" style={{marginBottom:'10vh' , padding:50}}>
            <Row className="mt-5 mb-5">
                <Col xl={7} md={7} sm={12} xs={12} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <Image src={ncetlogobg1} style={{width:'80%', height:'auto'}} rounded/>
                </Col>
                <Col xl={5} md={5} sm={12} xs={12} className="mt-5 mb-5" style={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                    <ul className="text-white">
                        <li>Autonomous College under VTU, Belgaum</li>
                        <li>AICTE Approved Institution</li>
                        <li>UGC Approved Institution</li>
                        <li>Institution Accredited by NAAC with ‘A’ Grade</li>
                        <li>NBA accredited Departments</li>
                        <li>Recognized under Section 12(B) of the UGC Act-1956</li>
                        <li>Recognized under Section 2(f) of the UGC Act-1956</li>
                        <li>ISO 14001:2015 EMS certified Institution</li>
                        <li>ISO 22000:2018 FSMS certified Institution</li>
                        <li>ISO 9001:2015 QMS certified Institution</li>
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}

export default CollegeInfo