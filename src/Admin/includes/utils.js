import React from "react";
import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Utils=()=>{

    const utilsDiv={
        "position":"relative",
        "textAlign":"right",
        "top":"-27px",
        "float":"right",
        "marginRight":"10px"
        }
    const utilsLink={
        "padding":"4px 6px 4px 6px",
    }    
    return (<>
       
            <div style={utilsDiv}>
                    <Link style={utilsLink} title="Publish"><i className="fa fa-bell"></i></Link>
                    <Link style={utilsLink} title="Unpublish"><i className="fa fa-bell-slash"></i></Link>
            </div>
       
    </>)
}

export default Utils;