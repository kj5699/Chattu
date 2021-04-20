import { Button } from "@material-ui/core";
import Head from "next/head";
import styled from "styled-components";
import {provider,auth} from '../firebase';

const login = () => {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    }
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                {/* <h1>Login Page</h1> */}
                <Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/897px-WhatsApp.svg.png" 
                alt='whatsapp logo' />
                <Button onClick={signIn} variant='outlined'>Sign Up with Google</Button>
            </LoginContainer>
            
        </Container>
    )
}

export default login

const Container =styled.div`
    display:grid;
    place-items:center;
    height:100vh;
    background-color:whitesmoke;

`;

const LoginContainer =styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:5rem;
    background-color:white;
    box-shadow: -2px 3px 13px -4px rgba(0,0,0,0.69);
    -webkit-box-shadow: -2px 3px 13px -4px rgba(0,0,0,0.69);
    -moz-box-shadow: -2px 3px 13px -4px rgba(0,0,0,0.69);

`;

const Logo =styled.img`
    height:200px;
    width:200px;
    margin-bottom:3rem
`;

