import React, {useState} from 'react'
import {db, auth} from '../firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { IconButton, InputAdornment, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function SendMessage() {
    const [msg, setMsg] = useState('')

    async function sendMessage(e){
        if(msg.length > 0){
            new Audio("https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3").play();
            e.preventDefault()
            const {uid, photoURL,displayName} = auth.currentUser

            await db.collection("messages").add({
                text: msg,
                photoURL,
                uid,
                displayName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            setMsg('')
        } else {
            alert("Message must contain at least one character!")
        }
    }
    return (
    <div style={{display: 'block', marginRight: 'auto', marginLeft: 'auto'}}>
        <form onSubmit={sendMessage}>
            <TextField style={{ width: '100%', height: '10vh',fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px', backgroundColor: '#f9f9f9'}} value={msg} onChange={(e) => setMsg(e.target.value)} label=" Message..." InputProps={{
                autoComplete: 'off' , endAdornment: <InputAdornment position="end"><IconButton type="submit"><SendIcon/></IconButton></InputAdornment>
            }}/>
        </form>
    </div>
  )
}

export default SendMessage