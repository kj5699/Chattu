import { ModeCommentTwoTone } from '@material-ui/icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth } from '../firebase';
import moment from 'moment';
const Message = ({user, message}) => {
    const [userLoggedIn]=useAuthState(auth)
    const TypeOfMessage = user=== userLoggedIn.email ? Sender : Reciever;
    return (
        <Container>
            <TypeOfMessage>{message.message}
                
                <TimeStamp>
                {message.timestamp ? moment(message.timestamp).format('LT') : '...'}
                </TimeStamp>
            
            </TypeOfMessage>
            
        </Container>
    )
}

export default Message
const Container =styled.div`
`;

const MessageElement =styled.p`
width:fit-content;
padding: 1rem;
border-radius:8px;
margin:10px;
padding-bottom:1.6rem;
position:relative;
text-align:right;

`;

const Sender=styled(MessageElement)`
margin-left:auto;
background-color: #dcf8c6;

`;

const Reciever=styled(MessageElement)`
text-align:left;
background-color: whitesmoke;

`;

const TimeStamp= styled.span`
    color:gray;
    padding: 10px;
    font-size:8px;
    position:absolute;
    bottom:0;
    text-align:right;
    right:0;

`;
