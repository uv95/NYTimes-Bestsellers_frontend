import React, { useState } from 'react';
import './register.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';
import { formatCamelCase } from '../../utils/formatCamelCase';
import { useAppDispatch } from '../../hooks';
import { register } from '../../features/user/userSlice';
import { toast } from 'react-toastify';
import { user } from '../../store-mobX';

const Register = () => {
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [inputType] = useState({
    name: 'text',
    email: 'email',
    password: 'password',
    confirmPassword: 'password',
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
    user
      .register(formData)
      .then(() => user.state === 'success' && navigate('/'));

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
  };

  return (
    <div className="register">
      <form>
        {Object.entries(formData).map(([key, value]) => (
          <Input
            key={key}
            name={key}
            label={formatCamelCase(key)}
            type={inputType[key as keyof typeof inputType]}
            value={value}
            required
            onChange={onChange}
            placeholder={formatCamelCase(key)}
          />
        ))}
        <Button text="Register" isColored onClick={onSubmit} />
      </form>
      <div className="register__bottom">
        Have an account? <Link to={LOGIN_ROUTE}>Log in</Link>
      </div>
    </div>
  );
};

export default Register;
