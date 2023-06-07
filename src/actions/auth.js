import Swal from "sweetalert2";

import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
import {fetchSinToken} from "../hooks/axios";
import { Route, Redirect } from 'react-router-dom';

export const startLoginUsernamePassword = (username, password) => {
  return async (dispatch) => {

    dispatch(startLoading());
    const encodedCredentials = window.btoa(`${username}:${password}`);
    const res = fetchSinToken('token', {}, "GET", {
      headers: {
        Authorization: `basic ${encodedCredentials}` // Agrega el token de autorización al encabezado
      }
    })

    res.then(response => {
      const { username, user_id, token } = response.data;
      // Manejar la respuesta de la solicitud
      dispatch(finishLoading());
      localStorage.setItem('token', token)
      dispatch(login(username, user_id, token));
    })
      .catch(error => {
        dispatch(finishLoading());
        // Manejar el error de la solicitud
        Swal.fire("Error", "Bad Credencials", "error");
      });
  };
};


export const startRegisterWithUsernamePassword = (username, password) => {
  return async (dispatch) => {
    dispatch(startLoading());

    const res = fetchSinToken('register', {
      username: username,
      password: password
    }, "POST", {})

    res.then(response => {
      const { registration } = response.data;
      const { username, id, token} = registration;

      // Manejar la respuesta de la solicitud
      dispatch(finishLoading());
      Swal.fire(
        "Registrado correctamente",
        "",
        "success"
      );
      dispatch(finishLoading());
      localStorage.setItem('token', token)
      dispatch(login(username, id, token));
    })
      .catch(error => {
        dispatch(finishLoading());
        // Manejar el error de la solicitud
        Swal.fire("Error", "Bad Credencials", "error");
      });
  };  
};

export const login = (username, id, access_token) => ({
  type: types.login,
  payload: {
    username,
    id,
    access_token,
  },
});

export const verificarAutenticacion = () => {
  const token = localStorage.getItem('token');
  
  if (token && token !== '') {
    
    return true; 
  }
  return false; 
}

export const startLogout = () => {
  return async (dispatch) => {
    try {

      localStorage.removeItem("token")
      localStorage.clear();
      dispatch(logout());
    } catch (error) {
      Swal.fire("Error", error.error_description || error.message, "error");
    }
  };
};

//const checkingFinish = ()=>({type:types.authCheckingFinish});

export const logout = () => ({
  type: types.logout,
});
