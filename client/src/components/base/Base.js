import React from 'react'

import { Container } from 'react-bootstrap'

import NavigationBar from '../header/NavigationBar'
import FooterBar from '../footer/FooterBar'

import './base.css'

const Base = ({ className="", children }) => {


    return(
        <div>
            <NavigationBar />
                <div className=" mb-5">
                    <div className={className}>{children}</div>
                </div>
            <FooterBar />
        </div>
    )


}

        

export default Base;