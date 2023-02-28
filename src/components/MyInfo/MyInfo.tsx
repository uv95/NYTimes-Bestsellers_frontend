import React, { useEffect, useState } from 'react';
import './myInfo.scss';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import { formatCamelCase } from '../../utils/formatCamelCase';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateMe } from '../../features/user/userSlice';
import { toast } from 'react-toastify';
import { user } from '../../store-mobX';

const MyInfo = () => {
  //REDUX 🔵
  // const { user } = useAppSelector((state) => state.user);
  // const { isLoading } = useAppSelector((state) => state.user);
  // const dispatch = useAppDispatch();

  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [inputType] = useState({
    name: 'text',
    email: 'email',
  });

  useEffect(() => {
    user.user &&
      setFormData({
        name: user.user.name,
        email: user.user.email,
      });
  }, [user.user]);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //MOBX 🔶
    user.updateMe(formData).then(() => {
      if (user.state === 'success') {
        toast.success('Your info successfully updated');
        setDisabled(true);
      }
    });

    //REDUX 🔵
    // dispatch(updateMe(formData))
    //   .unwrap()
    //   .then((_) => {
    //     toast.success('Your info successfully updated');
    //     setDisabled(true);
    //   })
    //   .catch((error) => toast.error(error));
  };

  // if (isLoading) return <p>Loading...</p>;

  return (
    <div className="myInfo">
      <h2>Personal Information</h2>
      <form>
        {Object.entries(formData).map(([key, value]) => (
          <Input
            key={key}
            label={formatCamelCase(key)}
            name={key}
            type={inputType[key as keyof typeof inputType]}
            value={value}
            disabled={disabled}
            onChange={onChange}
            placeholder={formatCamelCase(key)}
          />
        ))}
        {disabled ? (
          <Button text="Edit" hasOutline onClick={() => setDisabled(false)} />
        ) : (
          <div className="myInfo__buttons">
            <Button text="Save" isColored onClick={onSubmit} />
            <Button
              text="Cancel"
              hasOutline
              onClick={() => setDisabled(true)}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default MyInfo;
