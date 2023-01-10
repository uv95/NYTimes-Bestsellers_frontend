import React from 'react';
import { classNames } from '../../utils/utils';
import './shadow.scss';

type Props = { type: 'isSlanting' | 'isBlurred' | 'isBottom' };

const Shadow = ({ type }: Props) => {
  return <div className={`shadow ${classNames('shadow', type)}`}></div>;
};

export default Shadow;
