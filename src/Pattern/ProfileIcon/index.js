import React, { useEffect, useState } from "react";
import { Status, Thought } from "./styles.js";

export default function ProfileIcon({ stt, src, name, thought }){

  const [status, setStatus] = useState(stt);

  return(
    <div style={{ display: "flex", flexDirection:"row", justifyContent: "center", alignItems: "center" }}>

    <Status color={"#6ABC68"}>
      {src?<img src={src}/>:""}
    </Status>


    <Thought name={name}>
      {name?name:thought??"..."}
    </Thought>
  </div>
  )

}
