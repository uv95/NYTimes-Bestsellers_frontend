import React, { useState } from 'react';
import './myInfo.scss';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import { formatCamelCase } from '../../utils/formatCamelCase';

const MyInfo = () => {
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: 'Uliana',
    email: 'ulianav95v@gmail.com',
  });
  const [inputType] = useState({
    name: 'text',
    email: 'email',
  });

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  return (
    <div className="myInfo">
      <h2>Personal Information</h2>
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
          <Button text="Save" isColored onClick={() => setDisabled(true)} />
          <Button text="Cancel" hasOutline onClick={() => setDisabled(true)} />
        </div>
      )}
    </div>
  );
};

export default MyInfo;
