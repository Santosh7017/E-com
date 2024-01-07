"use client"
import Container from '@/app/components/Container'
import Card_1 from './Card_1';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import Card_2 from './Card_2';





const Page = () => {

  const [cardNumber, setCardNumber] = useState(0);
    const handleCardClick = (cardnumber: number) => {
        setCardNumber(cardnumber);
    } 
  return (
    <div>
      <Container>
          <Button onClick={() => handleCardClick(1)} >
            Card_1
          </Button>
          <Button onClick={() => handleCardClick(2)} >
            Card_2
          </Button>

          {cardNumber === 1? <Card_1/>: cardNumber == 2 ? <Card_2/>: <></>}
          
      </Container>
    </div>
  );
};

export default Page;
