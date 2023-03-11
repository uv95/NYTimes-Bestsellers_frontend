import React from 'react';
import './login.scss';
import Button from '../../components/UI/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { FORGOT_PASSWORD_ROUTE, REGISTER_ROUTE } from '../../utils/consts';
import { useAppDispatch } from '../../hooks';
import { login } from '../../features/user/userSlice';
import { toast } from 'react-toastify';
import { user } from '../../store-mobX';
import { Field, Form, Formik } from 'formik';

const Login = () => {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="login">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={
          (values) =>
            //MOBX 🔶
            user.login(values).then(() => user.user && navigate('/'))
          //REDUX 🔵
          // dispatch(login(formData))
          //   .unwrap()
          //   .then((_) => navigate('/'))
          //   .catch((error) => toast.error(error));
        }
      >
        <Form>
          <label htmlFor="email">Email</label>
          <Field name="email" type="email" placeholder="Email" />

          <label htmlFor="password">Password</label>
          <Field name="password" type="password" placeholder="Password" />

          <Button text="Log in" isColored type="submit" />
        </Form>
      </Formik>
      <div className="login__bottom">
        <Link to={FORGOT_PASSWORD_ROUTE}>Forgot password?</Link>

        <p>
          Not registered yet? <Link to={REGISTER_ROUTE}>Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
