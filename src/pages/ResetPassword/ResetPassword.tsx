import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/UI/Button/Button';
// import { resetPassword } from '../../features/user/userSlice';
// import { useAppDispatch } from '../../hooks';
import { user } from '../../store-mobX';
import { LOGIN_ROUTE } from '../../utils/consts';
import './resetPassword.scss';
import { Field, Form, Formik } from 'formik';

const ResetPassword = () => {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div className="resetPassword">
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(values) => {
          if (params.token)
            //MOBX 🔶
            user.resetPassword(values, params.token).then((_) => {
              if (user.state === 'success') {
                navigate(LOGIN_ROUTE);
                toast.success('Password successfully reset');
              }
            });

          //REDUX 🔵
          // dispatch(resetPassword({ token: params.token, updatedData: formData }))
          //   .unwrap()
          //   .then((_) => {
          //     navigate(LOGIN_ROUTE);
          //     toast.success('Password successfully reset');
          //   })
          //   .catch((error) => toast.error(error));
        }}
      >
        <Form>
          <label htmlFor="password">Password</label>
          <Field name="password" type="password" placeholder="Password" />

          <label htmlFor="confirmPassword">Confirm password</label>
          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
          />

          <Button text="Save" isOrange type="submit" />
        </Form>
      </Formik>
    </div>
  );
};
export default ResetPassword;
