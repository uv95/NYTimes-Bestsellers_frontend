import React, { useState } from 'react';
import ChangePassword from '../../components/ChangePassword/ChangePassword';
import Container from '../../components/Container/Container';
import DeleteAccount from '../../components/DeleteAccount/DeleteAccount';
import MyInfo from '../../components/MyInfo/MyInfo';
import Navigation from '../../components/Navigation/Navigation';
import './userAccount.scss';

type Props = {};

const UserAccount = (props: Props) => {
  const [currentTab, setCurrentTab] = useState('Personal information');

  return (
    <Container heading="My Account">
      <div className="userAccount">
        <Navigation setCurrentTab={setCurrentTab} currentTab={currentTab} />
        <div className="userAccount__section">
          {currentTab === 'Personal information' ? <MyInfo /> : null}
          {currentTab === 'Change password' ? <ChangePassword /> : null}
          {currentTab === 'Delete account' ? <DeleteAccount /> : null}
        </div>
      </div>
    </Container>
  );
};

export default UserAccount;
