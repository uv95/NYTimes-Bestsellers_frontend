import React from 'react';
import './changePassword.scss';
import Button from '../UI/Button/Button';
// import { useAppDispatch } from '../../hooks';
// import { updatePassword } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';
import { toast } from 'react-toastify';
import { user } from '../../store-mobX';
import { Field, Form, Formik } from 'formik';

const ChangePassword = () => {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="changePassword">
      <h2 data-testid="change-password">Change password</h2>
      <Formik
        initialValues={{
          currentPassword: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={
          (values) =>
            //MOBX 🔶
            user.updatePassword(values).then(() => {
              if (user.state === 'success') {
                toast.success(
                  'Your password successfully changed. Please log in again'
                );
                navigate(LOGIN_ROUTE);
              }
            })

          //REDUX 🔵
          // dispatch(updatePassword(formData))
          //   .unwrap()
          //   .then((_) => {
          //     toast.success(
          //       'Your password successfully changed. Please log in again'
          //     );
          //     navigate(LOGIN_ROUTE);
          //   })
          //   .catch((error) => toast.error(error));
        }
      >
        <Form>
          <label htmlFor="currentPassword">Current password</label>
          <Field
            name="currentPassword"
            type="password"
            placeholder="Current password"
          />

          <label htmlFor="password">New password</label>
          <Field name="password" type="password" placeholder="New password" />

          <label htmlFor="confirmPassword">Confirm password</label>
          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
          />

          <Button text="Save" isColored type="submit" />
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePassword;
