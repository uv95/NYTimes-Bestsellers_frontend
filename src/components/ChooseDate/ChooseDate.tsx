import React, { useState } from 'react';
import Button from '../UI/Button/Button';
import './chooseDate.scss';
// import { useAppDispatch, useAppSelector } from '../../hooks';
// import { setDate } from '../../features/bestsellers/bestsellersSlice';
import { today } from '../../utils/consts';
import { ReactComponent as Search } from '../../assets/icons/search.svg';
import { bestsellers } from '../../store-mobX';
import { observer } from 'mobx-react-lite';

const ChooseDate = () => {
  //REDUX 🔵
  // const dispatch = useAppDispatch();
  // const { date } = useAppSelector((state) => state.bestsellers);

  const [formData, setFormData] = useState(bestsellers.date || today);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('sdsddssd')
    setFormData(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //MOBX 🔶
    bestsellers.setDate(formData);
    //REDUX 🔵
    // dispatch(setDate(formData));
  };

  console.log(formData, 'formData', today,'today')

  return (
    <div className="chooseDate">
      <form className="chooseDate__form">
        <label htmlFor="date">Search books by date:</label>
        <div className="chooseDate__form__input">
          <input
            data-testid="date-input"
            id="date"
            value={formData}
            type="date"
            min={'2008-07-01'}
            max={today}
            onChange={onChange}
          />
          <Button Icon={Search} onClick={onSubmit} />
        </div>
      </form>
    </div>
  );
};

export default observer(ChooseDate);
