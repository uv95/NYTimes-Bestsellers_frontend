import React from 'react';
import './input.scss';

interface InputProps {
  onChange: (arg: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value?: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <div className="input">
      <label
        className={`label ${props.required && 'required'}`}
        htmlFor={props.name}
      >
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.name}
        name={props.name}
        value={props.value}
        required={props.required}
        placeholder={props.placeholder}
        onChange={props.onChange}
        defaultChecked={props.defaultChecked}
        disabled={props.disabled}
      />
    </div>
  );
};

export default Input;
