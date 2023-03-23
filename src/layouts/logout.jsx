import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../store/user";
import { useHistory } from "react-router-dom";
const LogOut = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logOut());
  }, []);
  history.push("/");
  return null;
};

export default LogOut;
