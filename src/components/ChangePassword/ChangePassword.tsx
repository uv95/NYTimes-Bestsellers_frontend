import React, { useState } from 'react';
import './changePassword.scss';
import { formatCamelCase } from '../../utils/formatCamelCase';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

type Props = {};

const ChangePassword = (props: Props) => {
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({
    currentPassword: 'qqqqqqqqq',
    newPassword: '',
    confirmNewPassword: '',
  });

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  return (
    <div className="changePassword">
      <h2>Change password</h2>
      {disabled ? (
        <Input
          label="Current password"
          name="Current password"
          type="password"
          value={formData.currentPassword}
          disabled={disabled}
          onChange={onChange}
          placeholder="Current password"
        />
      ) : (
        Object.entries(formData).map(([key, value]) => (
          <Input
            key={key}
            label={formatCamelCase(key)}
            name={key}
            type="password"
            value={value}
            disabled={disabled}
            onChange={onChange}
            placeholder={formatCamelCase(key)}
          />
        ))
      )}
      {disabled ? (
        <Button text="Edit" hasOutline onClick={() => setDisabled(false)} />
      ) : (
        <div className="changePassword__buttons">
          <Button text="Save" isColored onClick={() => setDisabled(true)} />
          <Button text="Cancel" hasOutline onClick={() => setDisabled(true)} />
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
