import { Avatar } from '@material-ui/core';
import  { getReciepientEmail} from '../utils/getReciepientEmail'
import styled from 'styled-components'
import { useCollection } from 'react-firebase-hooks/firestore';
import {db, auth} from '../firebase';
import {useRouter} from 'next/router';

const Chat = ({id, users, userLoggedIn,onClickChat}) => {
    const router =useRouter()
    const recipientEmail= getReciepientEmail(users, userLoggedIn)
    const [recipientSnapshot] = useCollection(
        db.collection('users').where("email","==",recipientEmail)
    )
    const enterChat =()=>{
        router.push(`/chat/${id}`)
        onClickChat?onClickChat():null;
    }
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    return (
        <Container onClick={enterChat}>
            {recipient ?
            <UserAvatar src={recipient?.photoURL} />:
            <UserAvatar >{recipientEmail[0]}</UserAvatar>
            }
            
            {recipient&& recipient.name ?<p>
                {recipient.name}
            </p>:
            
            <p>{recipientEmail}</p>}


        </Container>
            
        
    )
}

export default Chat
const Container =styled.div`
    display:flex;
    justify-content:flex-start;
    align-items:center;
    cursor: pointer;
    padding: 0.93rem;
    word-break:break-word;
    border-bottom: 1px solid whitesmoke;

    :hover{
        background-color: #e9eaeb;
    }

`;


const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity:0.8;
    }
    margin:0.3rem;
    margin-right: 1rem;
    `;