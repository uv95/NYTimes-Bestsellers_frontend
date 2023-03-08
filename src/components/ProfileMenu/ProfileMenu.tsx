import React from 'react';
import { useNavigate } from 'react-router-dom';
import { user } from '../../store-mobX';
import { USER_ACCOUNT_ROUTE } from '../../utils/consts';
import Menu from '../Menu/Menu';
import Button from '../UI/Button/Button';

type Props = { setOpenMenu: React.Dispatch<React.SetStateAction<boolean>> };

const ProfileMenu = ({ setOpenMenu }: Props) => {
  const navigate = useNavigate();
  return (
    <Menu>
      <Button
        text="Profile"
        isLeftAligned
        onClick={() => {
          navigate(USER_ACCOUNT_ROUTE);
          setOpenMenu(false);
        }}
      />

      <Button
        text="Log out"
        isLeftAligned
        onClick={() => {
          //REDUX 🔵
          // dispatch(logout());
          user.logout();
          navigate('/');
          setOpenMenu(false);
        }}
      />
    </Menu>
  );
};

export default ProfileMenu;
