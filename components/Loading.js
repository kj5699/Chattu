import ClipLoader from "react-spinners/ClipLoader";


const Loading = () => {

    return (
        

            <center style={{display:'grid', placeItems: 'center',height:'100vh'}}>
                <div style={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/897px-WhatsApp.svg.png" 
                        alt='whatsapp logo'
                        style={{marginBottom: '2rem'}}
                        height='200px'  
                    />
                    <ClipLoader color={'green'} ></ClipLoader>
                </div>
            </center>
    )
}

export default Loading
