import React from "react";


export default function ButtonToTop({location}) {
    const style = {
        width: "75px",
        height: "75px",
        borderRadius: "50%",
        backgroundColor: "#457b9dff",
        border: "3px solid #e63946ff",
        position: "fixed",
        right:"12vw",
        bottom: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "3px 3px 5px #457b9dff"
    }

    return (
        <a style={{textDecoration: "none"}}  href={location}>
            <div style={style}>
                <img style={{width: "50px", aspectRatio: "1"}} src={require('../logo/980311-200.png')} alt="go to top"></img>
            </div>
        </a>
    )
}