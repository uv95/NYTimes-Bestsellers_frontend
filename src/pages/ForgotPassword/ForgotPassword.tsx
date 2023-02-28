import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { useAppDispatch } from '../../hooks';
import { toast } from 'react-toastify';
import './forgotPassword.scss';
import { forgotPassword } from '../../features/user/userSlice';
import { user } from '../../store-mobX';

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '' });
  const [currentStep, setCurrentStep] = useState('enterEmail');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //MOBX 🔶
    user
      .forgotPassword(formData)
      .then(() => user.state === 'success' && setCurrentStep('linkSent'));

    //REDUX 🔵
    // dispatch(forgotPassword(formData))
    //   .unwrap()
    //   .then((_) => setCurrentStep('linkSent'))
    //   .catch((error) => toast.error(error));
  };

  return (
    <div className="forgotPassword">
      {currentStep === 'enterEmail' ? (
        <>
          <form>
            <Input
              name="email"
              label="Please enter your email"
              type="email"
              value={formData.email}
              onChange={onChange}
              placeholder="Email"
            />
            <Button text="Submit" isColored onClick={onSubmit} />
          </form>
          <Button text="Back" onClick={() => navigate(-1)} />
        </>
      ) : (
        <p>To reset your password, please follow the link in the email.</p>
      )}
    </div>
  );
};

export default ForgotPassword;
