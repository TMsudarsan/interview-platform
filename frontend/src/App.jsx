import { SignedIn, SignedOut, SignIn, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import React from 'react'

const App = () => {
  return (
    <div > 
      <h1>WelCome to my webSite</h1>

      <SignedOut>
      <SignInButton mode='modal'/>
      </SignedOut>

      <SignedIn>
        <SignOutButton/>
      </SignedIn>
      <UserButton/>
    </div>
  )
}

export default App