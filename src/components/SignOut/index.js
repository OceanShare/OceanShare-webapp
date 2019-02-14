import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  
  <a href="/" style={{color: '#ff5a61'}} onClick={firebase.doSignOut}>Sign Out</a>
);

export default withFirebase(SignOutButton);
