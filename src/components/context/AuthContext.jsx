import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        // user: {
        //   _id: "65f87751fe540c45222004c6",
        //   username: "sidra",
        //   email: "sidra@gmail.com",
        //   profilePicture: "person/1.jpeg",
        //   coverPicture: "",
        //   followers: [],
        //   followings: [],
        //   isAdmin: false,
        // },
        isFetching: false,
        error: false,
        user:state.user ,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
