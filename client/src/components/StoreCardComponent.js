import React, { useEffect } from 'react';

const StoreCardComponent = ({ customerId, onCardStored }) => {
  useEffect(() => {
    async function storeCard() {
      if (!window.Square) {
        console.error('Square.js failed to load properly');
        return;
      }

      try {
        const payments = window.Square.payments(process.env.REACT_APP_SQUARE_APP_ID, process.env.REACT_APP_SQUARE_LOCATION_ID);
        const card = await payments.card();
        const token = await card.tokenize();
        if (token) {
          console.log('Tokenization successful:', token.token);
          // Store the card details using the token and customer ID.
          onCardStored(token.token, customerId);
        }
      } catch (error) {
        console.error('Failed to store card:', error);
      }
    }

    storeCard();
  }, [customerId, onCardStored]);

  return (
    <div>
      <button id="store-card-button" type="button">Store Card</button>
    </div>
  );
};

export default StoreCardComponent;