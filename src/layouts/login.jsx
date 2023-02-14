import React from "react";
import LoginForm from "../components/loginForm";

const Login = () => {

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <>
            <h3 className="mb-4">Login</h3>
            <LoginForm />
          </>
        </div>
      </div>
    </div>
  );
};
export default Login;
