import React, {useState, useEffect} from 'react'
import {db, auth} from '../firebase'
import SendMessage from './SendMessage'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import SignOut from './SignOut'

function Chat() {
    // Check if user is anonymous and update his profile
    if(auth.currentUser.isAnonymous){
        var input = require("./SignIn.js");
        console.log(input)
        auth.currentUser.updateProfile({
            displayName: localStorage.getItem("myInput"),
            photoURL: "https://www.pngitem.com/pimgs/m/522-5220445_anonymous-profile-grey-person-sticker-glitch-empty-profile.png"
        })
    }

    const [messages2, setMessages2] = useState([])
    useEffect(() => {
        db.collection('joins').orderBy('createdAt', 'desc').limit(1).onSnapshot(snapshot => {
            setMessages2(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    // Messaging
    const [messages, setMessages] = useState([])
        useEffect(() => {
            db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            })
        }, [])

        // Signing out, setting the message and getting user's Google details such as profile picture and display name. 
    return (
        <div>
            <SignOut />
            <div className='msgs'>
            {messages.map(({id, text, photoURL, uid, displayName}) => (
                <div>
                    <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                        <img src={photoURL} alt=""/>
                        <p className="DisplayName">{displayName}</p>
                        <p>{text}</p>
                    </div>
                </div>
            ))}
            </div>
            <div>
                {messages2.map(({ displayName}) => (
                    <p>{displayName} joined the chat</p>
                ))}
            </div>
            <SendMessage />
            <div className='footer'>WorldChat - Created by Petros Tsokas</div>
        </div>
    )
}

export default Chat