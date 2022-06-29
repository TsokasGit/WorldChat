import React, {useState} from 'react'
import {db, auth} from '../firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { IconButton, InputAdornment, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react'

function Joined() {
    await db.collection("messages").add({
        uid,
        displayName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  return (
    <form onSubmit={sendMessage}>
            <TextField style={{ width: '100%', height: '10vh',fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px', backgroundColor: '#f9f9f9'}} value={msg} onChange={(e) => setMsg(e.target.value)} label=" Message..." InputProps={{
                autoComplete: 'off' , endAdornment: <InputAdornment position="end"><IconButton type="submit"><SendIcon/></IconButton></InputAdornment>
            }}/>
        </form>
  )
}

export default Joined