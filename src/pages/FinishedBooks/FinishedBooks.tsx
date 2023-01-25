import React from 'react';
import Container from '../../components/Container/Container';
import MarkedBooks from '../../components/MarkedBooks/MarkedBooks';
import './finished.scss';

type Props = {};

const FinishedBooks = (props: Props) => {
  return (
    <Container heading="Finished Books">
      <MarkedBooks>{}</MarkedBooks>
    </Container>
  );
};

export default FinishedBooks;
