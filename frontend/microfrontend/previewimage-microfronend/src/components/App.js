import React from 'react';
import ImagePopup from './ImagePopup';

function Main({ params, parentFuncs }) {
  const [selectedCard] = React.useState(params.card);
  let isVisible = false
  
  React.useEffect(() => {
    isVisible = !!selectedCard
  }, [selectedCard]);

  function closePopup() {
    parentFuncs.closePreview();
  }


  return (
    <div>
        {isVisible && <ImagePopup card={selectedCard} onClose={closePopup} />}
    </div>
  );
}

export default Main;
