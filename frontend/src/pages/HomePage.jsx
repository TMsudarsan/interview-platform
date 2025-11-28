import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import React from 'react'
import toast from 'react-hot-toast'

const HomePage = () => {
    
  return (
    <div> 
        <button>Sign In</button>

        <SignedOut>
            <SignInButton  mode="modal">
                <button className='btn btn-primary' onClick={()=>toast.error("Login successfull!!")}>Login</button>
            </SignInButton>
        </SignedOut>

        <SignedIn>
            <SignOutButton/>
        </SignedIn>
        <UserButton/>
    </div>
  )
}

export default HomePage