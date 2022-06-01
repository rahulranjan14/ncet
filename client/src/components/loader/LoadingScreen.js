import React from 'react'
import { Container } from 'react-bootstrap'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const LoadingScreen = () => {
    return(
        <Container fluid style={{width:'100%', height:'700px', display:'flex', alignItems:'center', justifyContent:'center'}}>
               <div> 
                    <Loader
                        type="Grid"
                        color="#0D0D0D"
                        height={80}
                        width={80}
                        timeout={10000} //3 secs
                    />
                </div> 
            </Container>
    )
}

export default LoadingScreen;