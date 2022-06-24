import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './footer.css'

import { FiFacebook, FiTwitter, FiLinkedin, FiInstagram, FiYoutube } from 'react-icons/fi';
import { RiMailOpenFill, RiPhoneFill } from 'react-icons/ri';




const FooterBar = () => {
    return(
        <Container fluid className="footer-parent-container">
            <Container>
            
                <Row>
                    
                    <Col lg={6} md={6} sm={12} xs={12} className="contact-container mt-2 mb-2">
                        <p className="queries-text">For any Queries reach out to us at:</p>
                    
                        <div className="contact-links">
                            {/* <RiMailOpenFill size="1.3em" color="#fff" /> <a href="mailto:principal@ncetmail.com" className="text-link">principal@ncetmail.com</a>  */}
                            <RiPhoneFill size="1.3em" color="#fff"  /> <a href="tel:9949166771" className="text-link">+91 99491 66771</a> <br/>
                            <RiPhoneFill size="1.3em" color="#fff"  /> <a href="tel:9985165771" className="text-link">+91 99851 65771</a>
                        </div>
                        
                    </Col>
                    <Col lg={6} md={6} sm={12} xs={12} className="social-container mt-2 mb-2">
                        <p className="connect-text">Connect with us:</p>
                        <div className="div-socialLinks">
                            <a href="https://www.linkedin.com/school/nagarjuna-college-bangalore"><FiLinkedin size="1.5em" style={{marginRight:"5px", marginLeft:"5px"}} color="#fff"  /></a>
                            <a href="https://www.facebook.com/Nagarjunacollege.Bangalore/"><FiFacebook size="1.5em" style={{marginRight:"5px", marginLeft:"5px"}} color="#fff"  /></a>
                            <a href="https://twitter.com/principal_ncet?s=09"><FiTwitter size="1.5em" style={{marginRight:"5px", marginLeft:"5px"}} color="#fff" /></a>
                            <a href="https://www.instagram.com/ncet_official/?igshid=1927y63j14dl6"><FiInstagram size="1.5em" style={{marginRight:"5px", marginLeft:"5px"}} color="#fff"  /></a>
                            <a href="https://www.youtube.com/channel/UC7z2VqJIhSkCh4HC1y9zdaw"><FiYoutube size="1.7em" style={{marginRight:"5px", marginLeft:"5px"}} color="#fff"  /></a>
                        </div>
                    </Col>
                </Row>

                <hr className="hr-line" />

                <Row>
                    <Col style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <span className="copyright-text">COPYRIGHT © 2022 NAGARJUNA GROUP OF INSTITUTIONS. ALL RIGHT RESERVED</span>
                    </Col>
                </Row>

            </Container>
        </Container>
    )
}

export default FooterBar;