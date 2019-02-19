import React from 'react';

import PasswordChangeForm from '../PasswordChange';
import { withAuthorization } from '../Session';

const AccountPage = () => (
  <div>
    <PasswordChangeForm />
  </div>
);

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);
