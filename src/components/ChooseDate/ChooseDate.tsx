import React, { useState } from 'react';
import Button from '../UI/Button/Button';
import './chooseDate.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setDate } from '../../features/books/booksSlice';
import { today } from '../../utils/consts';

const ChooseDate = () => {
  const dispatch = useAppDispatch();
  const { date } = useAppSelector((state) => state.books);
  const [formData, setFormData] = useState(date || today);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setDate(formData));
  };

  return (
    <div className="chooseDate">
      <form className="chooseDate__form">
        <label htmlFor="date">Search books by date:</label>
        <div className="chooseDate__form__input">
          <input
            id="date"
            value={formData}
            type="date"
            min={'2008-07-01'}
            max={today}
            onChange={onChange}
          />
          <Button text="Search" hasOutline onClick={onSubmit} />
        </div>
      </form>
    </div>
  );
};

export default ChooseDate;
