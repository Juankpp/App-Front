import { types } from "../types/types";
import Swal from "sweetalert2";
const initialState = {
  loading: false,
  msgError: null,
};
//Recibe un estado y una action
//Siempre tiene que regresar algo diferente de null y undefined.
export const uiReducer = (state = { initialState }, action) => {
  switch (action.type) {
    case types.uiSetError:
      Swal.fire("Error", action.payload, "error");
      return { ...state, msgError: action.payload };
    case types.uiRemoveError:
      return { ...state, msgError: null };

    case types.uiStartLoading:
      return { ...state, loading: true };
    case types.uiFinishLoading:
      return { ...state, loading: false };

    default:
      return state;
  }
};
