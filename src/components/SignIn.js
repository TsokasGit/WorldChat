import React from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {db, auth} from '../firebase'
import Button from '@mui/material/Button';

function SignIn() {
    function signInWithGoogle(){
      const provider = new firebase.auth.GoogleAuthProvider()
      auth.signInWithPopup(provider)
      firebase.auth().onAuthStateChanged((user) => {
        db.collection("joins").add({
          displayName: firebase.auth().currentUser.displayName,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
      })
    }
    function myFunction() {
      var x = document.getElementById("anInputid");
      if (x.style.visibility === "hidden") {
        x.style.visibility = "visible";
      } else {
        x.style.visibility = "hidden";
        var input = document.getElementById("anInputid").value;
        if(input.length >= 3 && input.length <= 13){
          alert("You are about to login as a guest, please be polite and do not spam. Negative attitude is prohibited and will result to an ip restriction");
          localStorage.setItem("myInput",input);
          anonymous()
          db.collection("joins").add({
            displayName: localStorage.getItem("myInput"),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          })
        }
      }
    }

    function anonymous(){
      var newUser = auth.currentUser
      auth.signInAnonymously(newUser)
    }

  return (
    <div className='stack'style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh', alignItems: 'center'}}>
        <Button onClick={signInWithGoogle} style={{color: "white", backgroundColor: "#395dff", border: '2px solid white', borderRadius: '3000px'}}>Sign In With Google</Button>
        <div className='AnonymousSignIn'>
          <Button onClick={myFunction} id="anonymousBtn" style={{color: "white", backgroundColor: "#395dff" ,border: '1px solid white', borderRadius: '3000px'}}>Sign In Anonymously</Button>
        </div>
          <input class="anInput" style={{visibility: 'hidden'}} type="text" id="anInputid" name="nickname" placeholder="Enter your nickname" required></input>
    </div>
  )
}

export default SignIn