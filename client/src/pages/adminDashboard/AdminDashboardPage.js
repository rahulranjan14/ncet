import React from 'react' 

import { Button, Row, Col, Container } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import Base from '../../components/base/Base'

const AdminDashboardPage = () => {
    return(
        <Base>

            <Container style={{marginTop:'15vh', marginBottom:'15vh'}}>
                <Row >
                    <Col style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <h2>Admin Dashboard</h2>
                    </Col>
                </Row>


                <Row>
                    <Container style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', marginTop:'10vh', marginBottom:'10vh'}}>
                        <Link to={`/admin/createtest`}><Button variant="secondary" size="md" className="mt-1 mb-1" style={{ minWidth:'50vw'}}>Create New Test</Button></Link>
                     {/*   <Link to={`/admin/submissions/all`}><Button variant="secondary" size="md" className="mt-1 mb-1" style={{ minWidth:'50vw'}} >View All Submissioons</Button></Link> */}
                       <Link to={`/admin/tests/all`}><Button variant="secondary" size="md" className="mt-1 mb-1" style={{ minWidth:'50vw'}} >View Submissions By Tests</Button></Link>  
                        <Link to={`/admin/tests/delete`}><Button variant="secondary" size="md" className="mt-1 mb-1" style={{ minWidth:'50vw'}} >Delete Test</Button></Link>
                    </Container>
                </Row>
            </Container>
        
        </Base>
    )
}

export default AdminDashboardPage;
