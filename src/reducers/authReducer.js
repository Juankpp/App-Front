import { types } from "../types/types";

//Recibe un estado y una action la action login devuelve un estado con las credenciales
//Siempre tiene que regresar algo diferente de null y undefined.
export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        username: action.payload.username,
        id: action.payload.id,
        access_token: action.payload.access_token,
      };
    case types.logout:
      return {};
    case types.isLoggin:
      return {
        value : action.payload.value,
      };

    default:
      return state;
  }
};
