import React, { useState } from 'react';
import './login.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import { FORGOT_PASSWORD_ROUTE, REGISTER_ROUTE } from '../../utils/consts';
import { formatCamelCase } from '../../utils/formatCamelCase';
import { useAppDispatch } from '../../hooks';
import { login } from '../../features/user/userSlice';
import { toast } from 'react-toastify';
import { user } from '../../store-mobX';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //MOBX 🔶
    user.login(formData).then(() => user.state === 'success' && navigate('/'));

    // user
    //   .login(formData)
    //   .then(() => navigate('/'))
    //   .catch((error) => {});

    //REDUX 🔵
    // dispatch(login(formData))
    //   .unwrap()
    //   .then((_) => navigate('/'))
    //   .catch((error) => toast.error(error));
  };

  return (
    <div className="login">
      <form>
        {Object.entries(formData).map(([key, value]) => (
          <Input
            key={key}
            name={key}
            label={formatCamelCase(key)}
            type={key}
            value={value}
            required
            onChange={onChange}
            placeholder={formatCamelCase(key)}
          />
        ))}
        <Button text="Log in" isColored onClick={onSubmit} />
      </form>
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
