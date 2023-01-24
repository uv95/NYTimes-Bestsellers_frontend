import React, { useState } from 'react';
import './login.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { Link } from 'react-router-dom';
import { REGISTER_ROUTE } from '../../utils/consts';
import { formatCamelCase } from '../../utils/formatCamelCase';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  //   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     dispatch();
  //   };

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
        <Button text="Log in" isColored />
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
