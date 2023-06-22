import React, { useEffect, useState } from "react";
import { Status, Thought } from "./styles.js";

export default function GreatProfileIcon({ stt, src, name, thought }){

  const [status, setStatus] = useState(stt);

  return(
    <div style={{ display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center" }}>

    <Status color={"#6ABC68"}>
      {src?<img src={src}/>:""}
    </Status>

    <div style={{ marginTop:5 }}>{name}</div>

    <Thought>
      {thought}
    </Thought>
  </div>
  )

}
