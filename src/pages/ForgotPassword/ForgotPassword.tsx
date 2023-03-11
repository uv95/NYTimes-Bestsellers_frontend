import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import { useAppDispatch } from '../../hooks';
import { toast } from 'react-toastify';
import './forgotPassword.scss';
import { forgotPassword } from '../../features/user/userSlice';
import { user } from '../../store-mobX';
import { Field, Form, Formik } from 'formik';

const ForgotPassword = () => {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState('enterEmail');

  return (
    <div className="forgotPassword">
      {currentStep === 'enterEmail' ? (
        <>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={
              (values) =>
                //MOBX 🔶
                user
                  .forgotPassword(values)
                  .then(
                    () => user.state === 'success' && setCurrentStep('linkSent')
                  )

              //REDUX 🔵
              // dispatch(forgotPassword(formData))
              //   .unwrap()
              //   .then((_) => setCurrentStep('linkSent'))
              //   .catch((error) => toast.error(error));
            }
          >
            <Form>
              <label htmlFor="email">Please enter your email</label>
              <Field name="email" type="email" placeholder="Email" />

              <Button text="Submit" isColored type="submit" />
            </Form>
          </Formik>
          <Button text="Back" onClick={() => navigate(-1)} />
        </>
      ) : (
        <p>To reset your password, please follow the link in the email.</p>
      )}
    </div>
  );
};

export default ForgotPassword;
