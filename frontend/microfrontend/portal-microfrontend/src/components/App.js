import React from 'react';

function Main({}) {

  // здесь объявляются методы и параметры для микрофронтов
  const paramsProfile = {}
  const outerFuncsProfile = {}

  const paramsPlaces = {}
  const outerFuncsPlaces = {
    handleAddPlace: () => {}
  }
  
  const paramsPreviewImage = {}
  const outerFuncsPreviewImage = {}

  function onAddPlace () {
    outerFuncsPlaces.handleAddPlace()
  }

  return (
    <main className="content">
      <div className="">
        <profile-microfrontend 
          params={paramsProfile}
          outerFuncs={outerFuncsProfile}
        />
        
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </div>

      <places-mocrofrontend
        params={paramsPlaces}
        outerFuncs={outerFuncsPlaces}
      />

      <previewimage-microfronted 
        params={paramsPreviewImage}
        outerFuncs={outerFuncsPreviewImage}
      />

    </main>
  );
}

export default Main;
