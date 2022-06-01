import React,{useState, useEffect} from 'react';
import axios from 'axios'

import {Container, Row, Col} from 'react-bootstrap'

import { API } from '../../backend'

import DeleteTestCard from '../../components/testCard/DeleteTestCard'
import Base from '../../components/base/Base'
import LoadingScreen from '../../components/loader/LoadingScreen'


const  DeleteTestsPage = () => {

    const [testsList, setTestsList] = useState([])

    const [loading, setLoading] = useState(true)

    const loadalltests = async () => {
        try {
            const {data} = await axios.get(`${API}/testslist`)
            // console.log(data)
            setTestsList(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadalltests()
    },[])

    const allTests = () => {
        return(
            <Container>
                <Row style={{textAlign:'center'}} className="mt-5 mb-5">
                    <h2>All Tests :</h2>
                </Row>
                <Container style={testspageStyle.testsListingContainer}>
                    {testsList && testsList.length !=0 ? (

                        testsList.map(test => {
                            return(
                            
                                <DeleteTestCard key={test._id} testName={test.name} testId={test.id} startTime={test.startTime} endTime={test.endTime} testDescription={test.description} testDuration={test.duration} />
                                 
                            )
                        })

                    ) : (
                        <Container style={testspageStyle.noTestsContainer}>
                            <h5>No Tests Available</h5>
                        </Container>
                    )}
                </Container>
                <hr />
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
        
            {allTests()}

        </Base>
    )
}


export default DeleteTestsPage;

const testspageStyle = {

    testsListingContainer:{
        display:'flex',
        alignItems:'stretch',
        justifyContent:'flex-start', 
        flexWrap:'wrap', 
        rowGap:'2em', 
        columnGap:'2em',
        marginTop:'2vh'
    },
    noTestsContainer:{
        paddingTop:'5em',
        paddingBottom:'5em',
        display:'flex', 
        alignItems:'center', 
        justifyContent:'center'
    }


}