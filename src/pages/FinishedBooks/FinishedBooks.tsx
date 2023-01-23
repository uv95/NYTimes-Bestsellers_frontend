import React from 'react';
import MarkedBooks from '../../components/MarkedBooks/MarkedBooks';
import './finished.scss';

type Props = {};

const FinishedBooks = (props: Props) => {
  return <MarkedBooks heading="Finished books">{}</MarkedBooks>;
};

export default FinishedBooks;
