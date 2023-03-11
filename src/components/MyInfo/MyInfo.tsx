import React, { useEffect, useState } from 'react';
import './myInfo.scss';
import Button from '../UI/Button/Button';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateMe } from '../../features/user/userSlice';
import { toast } from 'react-toastify';
import { user } from '../../store-mobX';
import { Field, Form, Formik } from 'formik';

const MyInfo = () => {
  //REDUX 🔵
  // const { user } = useAppSelector((state) => state.user);
  // const { isLoading } = useAppSelector((state) => state.user);
  // const dispatch = useAppDispatch();
  const { user: currUser } = user;

  const [disabled, setDisabled] = useState(true);
  const [formData] = useState({
    name: currUser ? currUser.name : '',
    email: currUser ? currUser.email : '',
  });

  // if (isLoading) return <p>Loading...</p>;

  return (
    <div className="myInfo">
      <h2>Personal Information</h2>
      <Formik
        initialValues={formData}
        onSubmit={
          (values = formData) =>
            //MOBX 🔶
            user.updateMe(values).then(() => {
              if (user.state === 'success') {
                toast.success('Your info successfully updated');
                setDisabled(true);
              }
            })

          //REDUX 🔵
          // dispatch(updateMe(formData))
          //   .unwrap()
          //   .then((_) => {
          //     toast.success('Your info successfully updated');
          //     setDisabled(true);
          //   })
          //   .catch((error) => toast.error(error));
        }
      >
        <Form>
          <label htmlFor="name">Name</label>
          <Field name="name" type="text" disabled={disabled} />

          <label htmlFor="email">Email</label>
          <Field name="email" type="email" disabled={disabled} />

          {disabled ? (
            <Button text="Edit" hasOutline onClick={() => setDisabled(false)} />
          ) : (
            <div className="myInfo__buttons">
              <Button text="Save" isColored type="submit" />
              <Button
                text="Cancel"
                hasOutline
                onClick={() => setDisabled(true)}
              />
            </div>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default MyInfo;
