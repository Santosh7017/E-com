"use client"
import Container from '@/app/components/Container';
import { Button } from '@mui/material';
import { useState } from 'react'
import { Cart_1 } from './Cart_1';

const Carts = () => {
 
    const [cardNumber, setCardNumber] = useState(0);
    const handleCardClick = (cardnumber: number) => {
        setCardNumber(cardnumber);
    } 
  return (
    <div>
      <Container>
          <Button onClick={() => handleCardClick(1)}  >
            Cart_1
          </Button>
          <Button onClick={() => handleCardClick(2)} >
            Cart_2
          </Button>

          {cardNumber === 1? <Cart_1/>: <></>}
          
      </Container>
    </div>
  )
}

export default Carts