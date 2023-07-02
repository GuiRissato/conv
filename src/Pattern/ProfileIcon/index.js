import { Initials, ProfileIconContainer, Status, Thought } from "./styles.js";
import { Input } from "../styles.js";
import api from "../../interface/API/index.js";

export default function ProfileIcon({ user, src, header = false }){

  const { cod, color, name, username, thought, status:stt } = user;

  function getInitials(){

    let names = name.split(" ");
    let initials = ""

    names.map((n)=> initials += n[0] );

    return initials.slice(0,2)??initials;

  }

  async function saveThought(newThought){
    await api.put(`/updateUser/${cod}`, { thought: newThought })
  }

  return(
    <ProfileIconContainer>

    <Status color={stt === "online"?"#6ABC68":"grey"}>
      {src?
      <img src={src}/>
      :
      <Initials color={color}>
        {name?getInitials():""}
      </Initials>
      }
    </Status>

    <div style={{ display:"flex", flexDirection:"column", marginLeft:10, marginRight:10 }}>
      <div style={{ fontSize:"0.7rem" }}>{name}</div>
      <div>{username}#{cod}</div>
    </div>

    {!header?
      <Thought name={false} header={header}>
        {thought??"..."}
      </Thought>
    :
      <Input 
      type="text"
      spellcheck="false" 
      defaultValue={thought} 
      placeholder={" novo status..."} 
      onBlur={(e)=> saveThought(e.target.value)}
      />
    }

  </ProfileIconContainer>
  )

}
