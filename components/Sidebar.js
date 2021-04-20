import { Avatar, Button, IconButton } from '@material-ui/core';
import styled from 'styled-components'
import EmailValidator from 'email-validator';

import ChatIcon from '@material-ui/icons/Chat'
import { MoreVertSharp, SearchOutlined } from '@material-ui/icons';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from './Chat';

function sidebar(props) {
    
    const [user] =useAuthState(auth);
    const userChatRef = db.collection('chats').where('users' ,'array-contains', user.email)
    const [chatsSnapshot] = useCollection(userChatRef);
    // 
    const createChat =()=>{
        const input= prompt("Please enter an email address for the user");
        if (!input){ 
            console.log('no input')
            return null;}
        if (EmailValidator.validate(input) && user.email !== input && !chatAlreadyExists(input)){
            db.collection('chats').add({
                users:[user.email, input],
            })
        }
    }

    const chatAlreadyExists = recipientEmail =>{

        const chatExists= chatsSnapshot?.docs.find(chat=>
            chat.data().users.find(user=> user === recipientEmail)?.length>0)
        return !!chatExists
        }

    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={()=>{auth.signOut()}}/>
                <IconsContainer>
                    <IconButton>
                        <ChatIcon />

                    </IconButton>
                    <IconButton>
                        <MoreVertSharp />
                    </IconButton>
                </IconsContainer>
            </Header>
            <Search>
                <SearchOutlined></SearchOutlined>
                <SearchInput placeholder="Search in chats"></SearchInput>
            </Search>

            <SidebarButton onClick={createChat}>
                Start a new Chat
            </SidebarButton>

            {chatsSnapshot?.docs.map(chat=> (
                <Chat key={chat.id} 
                        id={chat.id} 
                        users={chat.data().users} 
                        userLoggedIn={user}
                        onClickChat={props.onClickChat}
                ></Chat>
            ))}
            
        </Container>
    )
}

export default sidebar


const Container =styled.div`
flex:0.45;
border-right: 1px solid whitesmoke;
height:100vh;
width:30vw;
min-width:30vw;
max-width:45vw;
overflow-y:scroll;



::-webkit-scrollbar{
    display:none;
}

-ms-overflow-style:none;
scrollbar-width: none;

@media (max-width:540px){
    width:100vw;
    min-width:100vw;
    max-width:100vw;

}


`;

const Search =styled.div`
display:flex;
align-items:center;
padding:1rem;
border-radius:2px

`;
const SearchInput =styled.input`
border:none;
outline-width:0;
flex:1;
`;

const SidebarButton =styled( Button)`
width:100%;

&&&{
    border-bottom:1px solid whitesmoke;
    border-top:1px solid whitesmoke;
}
`;

const Header =styled.div`
    display:flex;
    position:sticky;
    top:0;
    background-color:white;
    z-index:1;
    justify-content:space-between;
    align-items:center;
    padding:15px;
    height:10vh;
    border-bottom :1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
cursor: pointer;
:hover {
    opacity:0.8;
}

`;

const IconsContainer =styled.div``;