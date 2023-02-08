import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from '../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Button from '../UI/Button/Button';
import { toast } from 'react-toastify';

const DeleteAccount = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  return (
    <>
      <h2>Delete account</h2>
      <p>Once you delete your account, there is no going back. </p>
      <Button
        text="Delete account"
        isColored
        onClick={() => {
          dispatch(deleteAccount(user.id))
            .unwrap()
            .then((_) => {
              toast.success('Your account successfully deleted');
              navigate('/');
            })
            .catch((error) => toast.error(error));
        }}
      />
    </>
  );
};

export default DeleteAccount;
