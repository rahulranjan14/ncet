import React, {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Container, Row, Col } from 'react-bootstrap'

import { API } from '../../backend'

import TestCard from '../../components/testCard/TestCard'
import Base from '../../components/base/Base'

import homepageStyle from './homepageStyle'

import LoadingScreen from '../../components/loader/LoadingScreen'
import CollegeInfo from '../../components/collegeInfo/CollegeInfo'



const HomePage = () => {

    const [currentTestsList, setCurrentTestsList] = useState([])
    const [upcomingTestsList, setUpcomingTestsList] = useState([])
    const [previousTestsList, setPreviousTestsList] = useState([])

    const [loading, setLoading] = useState(true)

    
   

    const loadalltests = async () => {
        try {
            const {data} = await axios.get(`${API}/testslist`)
            // console.log(data)

            var currentTestsListLocal = [];
            var upcomingTestsListLocal = [];
            var previousTestsListLocal = [];

            var currentDate = new Date().getTime();

            for (let i = 0; i < data.length; i++) {
                
                var startDate = new Date(String(data[i].startTime)).getTime();
                var endDate = new Date(String(data[i].endTime)).getTime();

                // console.log("determining test",data[i])
                // console.log(startDate)
                // console.log(currentDate)
                // console.log(endDate)

                if(currentDate >= startDate && endDate >= currentDate){
                 //   console.log("sending to current", data[i])  
                    currentTestsListLocal.push(data[i])
                }
                else if(startDate > currentDate ){
                   // console.log("sending to upcoming", data[i])
                    upcomingTestsListLocal.push(data[i])
                }
                else if(currentDate > endDate){
                  //  console.log("sending to previous", data[i])
                    previousTestsListLocal.push(data[i])
                }
            }

            setCurrentTestsList(currentTestsListLocal)
            setUpcomingTestsList(upcomingTestsListLocal)
            setPreviousTestsList(previousTestsListLocal)

            setLoading(false)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadalltests()
    },[])


    const currentTestsSection = () => {
        return(
            <Container>
                <Row>
                    <h2>Ongoing Tests :</h2>
                </Row>
                <Container style={homepageStyle.testsListingContainer}>
                    {currentTestsList && currentTestsList.length !=0 ? (

                        currentTestsList.map(test => {
                          //  console.log(test)
                            return(
                                <TestCard testName={test.name} testId={test.id} startTime={test.startTime} endTime={test.endTime} testDescription={test.description} testDuration={String(test.duration)} />
                           
                            )
                        })

                    ) : (
                        <Container style={homepageStyle.noTestsContainer}>
                            <h5>Currently there are no ongoing tests</h5>
                        </Container>
                    )}
                </Container>
                <hr />
            </Container>
        )
    } 

    const upcomingTestsSection = () => {
        return(
            <Container>
                <Row>
                    <h2>Upcoming Tests :</h2>
                </Row>
                <Container style={homepageStyle.testsListingContainer}>
                    {upcomingTestsList && upcomingTestsList.length !=0 ? (

                        upcomingTestsList.map(test => {
                            return(
                                <TestCard testName={test.name} testId={test.id} startTime={test.startTime} endTime={test.endTime} testDescription={test.description} testDuration={String(test.duration)} />
                           
                            )
                        })

                    ) : (
                        <Container style={homepageStyle.noTestsContainer}>
                            <h5>Currently there are no upcoming tests</h5>
                        </Container>
                    )}
                </Container>
                <hr />
            </Container>
        )
    } 

    const previousTestsSection = () => {
        return(
            <Container>
                <Row>
                    <h2>Previous Tests :</h2>
                </Row>
                <Container style={homepageStyle.testsListingContainer}>
                    {previousTestsList && previousTestsList.length !=0 ? (

                        previousTestsList.map(test => {
                            return(
                                <TestCard testName={test.name} testId={test.id} startTime={test.startTime} endTime={test.endTime} testDescription={test.description} testDuration={String(test.duration)} />
                           
                            )
                        })

                    ) : (
                        <Container style={homepageStyle.noTestsContainer}>
                            <h5>no previous tests found</h5>
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

        <CollegeInfo />
        
        <Container className="mt-4 mb-5" fluid>
            {currentTestsSection()}
        </Container>

        <Container className="mt-5 mb-5" fluid>
            {upcomingTestsSection()}
        </Container>

        <Container className="mt-5 mb-4" fluid>
            {previousTestsSection()}
        </Container>

        </Base>
    )
}

export default HomePage;