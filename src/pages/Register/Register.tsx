import React from 'react';
import './register.scss';
import Button from '../../components/UI/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';
// import { useAppDispatch } from '../../hooks';
// import { register } from '../../features/user/userSlice';
// import { toast } from 'react-toastify';
import { user } from '../../store-mobX';
import { Field, Form, Formik } from 'formik';

const Register = () => {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="register">
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={
          (values) =>
            //MOBX 🔶
            user
              .register(values)
              .then(() => user.state === 'success' && navigate('/'))

          //REDUX 🔵
          // dispatch(register(formData))
          //   .unwrap()
          //   .then((_) => navigate('/'))
          //   .catch((error) => {
          //     if (
          //       Object.values(formData).filter((val) => val.length !== 0).length < 4
          //     )
          //       return toast.error('Please fill all the fields');
          //     toast.error(error.split(':')[error.split(':').length - 1]);
          //   });
        }
      >
        <Form>
          <label htmlFor="name">Name</label>
          <Field name="name" type="text" placeholder="Name" />

          <label htmlFor="email">Email</label>
          <Field name="email" type="email" placeholder="Email" />

          <label htmlFor="password">Password</label>
          <Field name="password" type="password" placeholder="Password" />

          <label htmlFor="confirmPassword">Confirm password</label>
          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
          />

          <Button text="Register" isColored type="submit" />
        </Form>
      </Formik>

      <div className="register__bottom">
        Have an account? <Link to={LOGIN_ROUTE}>Log in</Link>
      </div>
    </div>
  );
};

export default Register;
