import { Avatar ,IconButton} from '@material-ui/core'
import { AttachmentSharp, ChatOutlined, InsertEmoticonSharp, MicOutlined, MoreVertSharp } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { useState ,useRef} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
import {db ,auth} from '../firebase';
import firebase from 'firebase';
import Message from './Message';
import TimeAgo from 'timeago-react';
import { getReciepientEmail } from '../utils/getReciepientEmail';

const ChatScreen = ({chat, messages}) => {
    const [input,setInput] =useState("")
    const [user]=useAuthState(auth)
    const router =useRouter();
    const endOfMessageRef = useRef(null);
    const recipientEmail =getReciepientEmail(chat.users,user)
    const [messagesSnapshot]=useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp','asc'))
    const [recipientSnapshot] = useCollection(db.collection('users').where('email','==', recipientEmail))
    const sendMessage=(e)=>{
        e.preventDefault();
        db.collection("users").doc(user.uid).set({
            lastSeen:firebase.firestore.FieldValue.serverTimestamp()
        },{merge:true})
        
        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user:user.email,
            photoURL:user.photoURL,
        })

        setInput("");
        scrollToBottom();
    }
    const scrollToBottom =() =>{
        endOfMessageRef.current.scrollIntoView({
            behavior:"smooth",
            block:"start",
        })
    }
    const showMessage=()=>{

        if(messagesSnapshot){
            return messagesSnapshot.docs.map(message=>(
                <Message 
                    key={message.id} 
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp:message.data().timestamp?.toDate().getTime()
                        }}
                    />
            ))
        }else{
            JSON.parse(messages).map(message =>(
                <Message key={message.id} 
                        user={message.user}
                        message={message}
                ></Message>
            ))}
    }


    const recipient =recipientSnapshot?.docs?.[0]?.data();

    return (
        
        
        <Container>
            <Header>
                {recipient ? 
                    <Avatar src={recipient?.photoURL} />:
                    <Avatar>{recipientEmail[0]}</Avatar>
                }
                
                <HeaderInformation>
                    <h3>{recipient ? recipient.name :recipientEmail}</h3>
                    {
                        recipientSnapshot ? 
                        <p>Last Active : {' '}
                        {recipient?.lastSeen?.toDate()?
                            <TimeAgo datetime={recipient?.lastSeen?.toDate()}></TimeAgo>
                        :"Unavailable"}


                        </p>:
                        <p>Loading Last active...</p>

                    }
                </HeaderInformation>

                <HeaderIcons>
                    <IconButton>
                        <AttachmentSharp />

                    </IconButton>
                    <IconButton>
                        <MoreVertSharp />
                    </IconButton>
                </HeaderIcons>
            </Header>
            <MessageContainer>
                {showMessage()}
                <EnddOfMessage ref={endOfMessageRef} />
            </MessageContainer>
            <InputContainer>
                <InsertEmoticonSharp />
                <Input value={input} onChange={e=> setInput(e.target.value)} />
                <button hidden disabled={!input} type='submit' onClick={sendMessage} ></button>
                <MicOutlined></MicOutlined>
            </InputContainer>
            
        </Container>
    )
}



export default ChatScreen

const Container=styled.div`
    height: 100vh;

`;
const Header =styled.div`
position:sticky;
background-color:white;
z-index:100;
top:0;
padding : 0.73rem;
display:flex;
align-items:center;
border-bottom: 1px solid whitesmoke;
`;
const HeaderInformation=styled.div`

margin-left:1rem;
flex:1;
word-break:break-word;

>h3{
    margin:0;
    margin-bottom :3px;
    width:fit-content;
    word-break:break;
    word-wrap:break-word;
}
>p {
    margin:0;
    font-size:14px;
    color: gray;
    width: fit-content;
    word-wrap: break-word;
}


`;
const HeaderIcons=styled.div``;

const MessageContainer=styled.div`
min-height:85vh;
background-color:#e5ded8;
padding:2rem;
`;
const EnddOfMessage =styled.div`
    margin-bottom:50px;
`;
const InputContainer =styled.form`
display: flex;
align-items:center;
padding :10px;
position :sticky;
bottom:0;
background-color:white;
z-index:100;
`;
const Input =styled.input`
flex:1;
outline:0;
border:none;
border-radius:10px;
background-color:whitesmoke;
padding:1rem;
margin: 0 1rem;
`;

