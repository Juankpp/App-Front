import React, { useState } from "react";

export const useForm = (initialState = {}) => {
  ///Recibe un objeto en el cual tiene las propiedades
  const [values, setValues] = useState(initialState);
  const reset = (newState = initialState) => {
    setValues(newState);
  };
  //Leerlo rapidamente
  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
      //Toma el name de los input y segun esto cambia el valor.
    });
  };

  return [values, handleInputChange, reset];
};
