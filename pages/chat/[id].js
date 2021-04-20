import styled from "styled-components";
import Head from "next/head"
import Sidebar from "../../components/Sidebar"
import ChatScreen from "../../components/ChatScreen";
import {db , auth} from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { getReciepientEmail } from "../../utils/getReciepientEmail";
import { useState } from "react";
import { IconButton } from "@material-ui/core";
import { ChatOutlined } from "@material-ui/icons";
import { useRouter } from "next/router";

const Chat = ({ chat ,messages}) => {
    const router =useRouter()
    console.log(chat, messages);
    const [user] =useAuthState(auth)
    const [open,setOpen] =useState(false)
    return (
        <Container>
            <SidebarContainer>
                <Sidebar onClickChat={()=>{setOpen(false)}}></Sidebar>

            </ SidebarContainer>
                
            {open?<MobileNavContainer>
                <Sidebar onClickChat={()=>{setOpen(false)}}></Sidebar>

            </MobileNavContainer>:null}
            
            <ToggleWrapper>
                <Toggler onClick ={()=>{
                    router.push('/')
                    setOpen(true)
                }}><ChatOutlined color="white"/></Toggler>
            </ToggleWrapper>
            
            
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages} ></ChatScreen>
            </ChatContainer>

            
        </Container>
        

    )
}

export default Chat;

export async function getServerSideProps(context) {
    const ref =db.collection("chats").doc(context.query.id)
    const messagesRes =await ref.collection('messages').orderBy("timestamp, asc").get();
    const messages =messagesRes.docs.map(doc=>({
        id : doc.id,
        ...doc.data()
    })).map(messages=>({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()

    }))
    const chatRes = await ref.get()
    const chat ={
        id: chatRes.id,
        ...chatRes.data(),
    }

    return{
        props:{
            messages :JSON.stringify(messages),
            chat:chat,
        }
    }
}

const Container =styled.div`
    display:flex;

`;
const SidebarContainer =styled.div`
margin:0;
padding:0;
@media (max-width:540px){
    display:none
}`;

const MobileNavContainer =styled.div`
margin:0;
padding:0;
@media (min-width:541px){
    display:none
}



`;
const ChatContainer =styled.div`
 flex:1;
 overflow:scroll;
 max-height:100vh;

 ::-webkit-scrollbar {
  display: none;
}


-ms-overflow-style: none;
scrollbar-width: none;



`;

const ToggleWrapper=styled.div`

display:none;
@media (max-width:540px){
    position:absolute;
    display:inline;
    top:80vh;
    left:80vw;
    background-color:white;
    z-index:500;
    width:50px;
    height:50px;
    border-radius:50%;
    :hover,
    :active,
    :after,
    :focus{
        background-color: lightgreen;
    }


}`;

const Toggler = styled(IconButton)`
    width:50px;
    height:50px;
    z-index:500;
    
    :hover {
        background-color:grey;
    }
`;



