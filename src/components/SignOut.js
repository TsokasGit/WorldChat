import React from 'react'
import { auth } from '../firebase'
import Button from '@mui/material/Button';

function SignOut() {
    return (
    <div>
        <Button onClick={() => auth.signOut()}>Sign Out</Button>
    </div>
  )
}

export default SignOut