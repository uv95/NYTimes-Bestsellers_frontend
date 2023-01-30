import React, { useState } from 'react';
import './changePassword.scss';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import { useAppDispatch } from '../../hooks';
import { updatePassword } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: '',
    password: '',
    confirmPassword: '',
  });
  const labels = ['Current password', 'New password', 'Confirm password'];

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updatePassword(formData))
      .unwrap()
      .then((_) => navigate(LOGIN_ROUTE))
      .catch((error) => console.log(error));
  };

  return (
    <div className="changePassword">
      <h2>Change password</h2>
      {Object.entries(formData).map(([key, value], i) => (
        <Input
          key={key}
          label={labels[i]}
          name={key}
          type="password"
          value={value}
          onChange={onChange}
          placeholder={labels[i]}
        />
      ))}
      <div className="changePassword__buttons">
        <Button text="Save" isColored onClick={onSubmit} />
      </div>
    </div>
  );
};

export default ChangePassword;
