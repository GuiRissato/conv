import React, { useEffect } from "react";
import { useModal } from "../Modal/index.js";

import { ProfileIcon, SearchUser } from "../index.js";
import AddContact from "./addContact.js";
import { useSelector } from "react-redux";
import { HeaderContainer, LeftHeader } from "./styles.js";

export default function Header(){

  const { addModal } = useModal();
  const { user, conversations } = useSelector(state=> state.mainData);

  return(
    <HeaderContainer>

      <LeftHeader>
      <img src="/logo.png" style={{ marginRight: 30, maxHeight:35 }}/>
        {user?
          <ProfileIcon 
          header={true} 
          user={{ ...user, status:"online" }}
          />
         :
          <></>
         }
      </LeftHeader>

      <SearchUser 
      animation={conversations.length === 0} 
      onClick={()=> addModal({ 
        body: <AddContact/>, 
        buttonPrimary: { label: "Fechar" } 
        })}
      >
      + Contato
      </SearchUser>

    </HeaderContainer>
  )

}
