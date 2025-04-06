import React from "react";
import { useSelector } from "react-redux";

export default function Trail(){
   let data = useSelector((state)=>state.AllJOb)
   console.log(data)
    return(
        <>
        <h1>hiii</h1>
        </>
    )
}