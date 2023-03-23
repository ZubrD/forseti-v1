import React from "react";
import RegisterForm from "../components/registerForm";
import NavBar from "../components/navBar";

const Register = () => {
  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            <>
              <h3 className="mb-4">Регистрация</h3>
              <RegisterForm />
            </>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
