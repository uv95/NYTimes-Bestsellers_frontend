import React, { useState } from 'react';
import './login.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTER_ROUTE } from '../../utils/consts';
import { formatCamelCase } from '../../utils/formatCamelCase';
import { useAppDispatch } from '../../hooks';
import { login } from '../../features/auth/authSlice';

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
    dispatch(login(formData))
      .unwrap()
      .then((_) => navigate('/'))
      .catch((error) => console.log(error));
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
        <p>Forgot password?</p>

        <p>
          Not registered yet? <Link to={REGISTER_ROUTE}>Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
