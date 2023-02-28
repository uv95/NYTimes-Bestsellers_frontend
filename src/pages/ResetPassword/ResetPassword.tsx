import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { resetPassword } from '../../features/user/userSlice';
import { useAppDispatch } from '../../hooks';
import { user } from '../../store-mobX';
import { LOGIN_ROUTE } from '../../utils/consts';
import { formatCamelCase } from '../../utils/formatCamelCase';
import './resetPassword.scss';

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (params.token)
      //MOBX 🔶
      user.resetPassword(formData).then((_) => {
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
  };

  return (
    <div className="resetPassword">
      <form>
        {Object.entries(formData).map(([key, value]) => (
          <Input
            key={key}
            name={key}
            label={formatCamelCase(key)}
            type="password"
            value={value}
            required
            onChange={onChange}
            placeholder={formatCamelCase(key)}
          />
        ))}
        <Button text="Save" isColored onClick={onSubmit} />
      </form>
    </div>
  );
};
export default ResetPassword;
