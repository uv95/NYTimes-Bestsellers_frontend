import React from 'react';
import Button from '../UI/Button/Button';

type Props = {};

const DeleteAccount = (props: Props) => {
  return (
    <>
      <h2>Delete account</h2>
      <p>Once you delete your account, there is no going back. </p>
      <Button text="Delete account" isColored />
    </>
  );
};

export default DeleteAccount;
