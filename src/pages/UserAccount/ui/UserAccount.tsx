import React, { useState } from 'react';
import ChangePassword from '../../../components/ChangePassword/ChangePassword';
import Container from '../../../components/MarkedBooksContainer/MarkedBooksContainer';
import DeleteAccount from '../../../components/DeleteAccount/DeleteAccount';
import MyInfo from '../../../components/MyInfo/MyInfo';
import Navigation from '../../../components/Navigation/Navigation';
import './userAccount.scss';

const UserAccount = () => {
  const [currentTab, setCurrentTab] = useState('Personal information');

  return (
    <Container heading="My Account">
      <div className="userAccount">
        <Navigation setCurrentTab={setCurrentTab} currentTab={currentTab} />
        <div className="userAccount__content">
          {currentTab === 'Personal information' ? <MyInfo /> : null}
          {currentTab === 'Change password' ? <ChangePassword /> : null}
          {currentTab === 'Delete account' ? <DeleteAccount /> : null}
        </div>
      </div>
      <div className="userAccount--mobile">
        <div className="userAccount__content userAccount__content--mobile">
          <section>
            <MyInfo />
          </section>
          <section>
            <ChangePassword />
          </section>
          <section>
            <DeleteAccount />
          </section>
        </div>
      </div>
    </Container>
  );
};

export default UserAccount;
