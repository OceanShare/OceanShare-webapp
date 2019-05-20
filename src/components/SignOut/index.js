import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  
  <div href="/" style={{color: '#ff5a61'}} onClick={firebase.doSignOut}>Sign Out</div>
);

export default withFirebase(SignOutButton);
