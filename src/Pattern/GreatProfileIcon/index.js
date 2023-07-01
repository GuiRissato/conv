import { GreatProfileContainer, Initials, Status, Thought } from "./styles.js";

export default function GreatProfileIcon({ color = "#394867", stt, src, name, username, thought, cod }){

  function getInitials(){

    let names = name.split(" ");
    let initials = ""

    names.map((n)=> initials += n[0] );

    return initials.slice(0,2)??initials;

  }

  return(
    <GreatProfileContainer>

    <Status color={stt === "online"?"#6ABC68":"grey"}>
      {src?
      <img src={src}/>
      :
      <Initials color={color}>
        {getInitials()}
      </Initials>
      }
    </Status>

    <div style={{ marginTop:5 }}>{name}</div>
    <div style={{ marginTop:3, color:"#9AA4B5" }}>{username}#{cod}</div>

    <Thought>
      {thought}
    </Thought>

    </GreatProfileContainer>
  )

}
