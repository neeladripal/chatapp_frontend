import React, { useState } from "react";
import * as userService from "../services/userService";
import auth from "../services/authService";
import styled from "styled-components";

const User = () => {
  const [forSignUp, setForSignUp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const newAccount = { ...account };
    newAccount[input.name] = input.value;
    setAccount(newAccount);
  };

  const trimValues = () => {
    const newAccount = { ...account };
    newAccount.name = newAccount.name.trim();
    newAccount.email = newAccount.email.trim();
    return newAccount;
  };

  const validateFields = ({ name, email, password }) => {
    const newErrors = {};
    if (forSignUp) {
      if (name === "") newErrors.name = "Name is required.";
      else if (name > 20) {
        newErrors.name = "Name can be at most 20 characters long.";
      }
    }

    if (email === "") newErrors.email = "Email is required.";
    else if (email.length > 50) {
      newErrors.email = "Email can be at most 50 characters long.";
    }

    if (password === "") newErrors.password = "Password is required.";
    else if (password.length < 4 || password.length > 50) {
      newErrors.password =
        "Password length must be between 4 and 50 characters.";
    }
    return Object.keys(newErrors).length === 0 ? null : newErrors;
  };

  const validate = () => {
    const newAccount = trimValues();
    setAccount(newAccount);
    const newErrors = validateFields(newAccount);
    setErrors(newErrors || {});
    return newErrors ? false : true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Call the server
    try {
      const response = await userService.register(account);
      auth.loginWithJwt(response.headers["x-auth-token"], response.data);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Call the server
    try {
      await auth.login(account.email, account.password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data);
      }
    }
  };

  return (
    <>
      <Container>
        <SideImg
          src="https://mazipan.github.io/login-page-css/undraw-login.1df4c833.svg"
          alt=""
        />
        {forSignUp ? (
          <CustomForm>
            <Header>
              <p>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7AzTFrLQWcLwhDP8TA4v0Gv_sAcTKUBI1qDyQ5U_Iq6rZCFn5WJOfZn6jGgZX412DeAs&usqp=CAU"
                  alt=""
                />
                Sign Up
              </p>
              <span onClick={() => setForSignUp(!forSignUp)}>
                Already have an account?
              </span>
            </Header>

            <CustomLogin onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={account.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={account.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={account.password}
                onChange={handleChange}
                required
              />

              <div>
                {loading ? (
                  <button>
                    <img
                      src="https://media1.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif"
                      alt=""
                    />
                  </button>
                ) : (
                  <button type="submit">Sign up</button>
                )}
              </div>
            </CustomLogin>
          </CustomForm>
        ) : (
          <CustomForm>
            <Header>
              <p>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7AzTFrLQWcLwhDP8TA4v0Gv_sAcTKUBI1qDyQ5U_Iq6rZCFn5WJOfZn6jGgZX412DeAs&usqp=CAU"
                  alt=""
                />
                Sign in
              </p>
              <span onClick={() => setForSignUp(!forSignUp)}>
                create an account
              </span>
            </Header>

            <CustomLogin onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={account.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={account.password}
                onChange={handleChange}
                required
              />

              <div>
                {loading ? (
                  <button>
                    <img
                      src="https://media1.giphy.com/media/L05HgB2h6qICDs5Sms/giphy.gif"
                      alt=""
                    />
                  </button>
                ) : (
                  <button type="submit"> Sign in</button>
                )}
              </div>
            </CustomLogin>
          </CustomForm>
        )}
      </Container>
    </>
  );
};

export default User;

const Container = styled.div`
  min-height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 2rem;

  @media (min-width: 900px) {
    min-height: calc(100vh - 62px);
  }
`;

const CustomForm = styled.div`
  height: auto;
  width: 388.797px;
  background-color: #fff;
  padding: 1rem;
  padding-bottom: 2.5rem;
  border-radius: 6px;
  box-shadow: 1px 1px 20px 0px #ebe5e5;

  @media (max-width: 860px) {
    width: 90vw;
  }

  @media (min-width: 1600px) {
    width: 27vw;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  p {
    font-size: 1.15rem;
    font-weight: 500;
    display: flex;
    align-items: center;

    img {
      height: 2rem;
    }
  }

  span {
    font-size: 0.78rem;
    cursor: pointer;
    color: violet;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const GoogleLogin = styled.button`
  width: 100%;
  margin: 0.8rem 0;
  height: 38px;
  border-radius: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  font-weight: 500;
  background-color: #2265d4;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 0.6rem;

  img {
    margin-right: 0.7rem;
  }

  p {
    flex: 1;
    display: flex;
    color: #fff;
    justify-content: center;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
    align-items: center;
    height: 100%;
  }
`;
const AppleLogin = styled(GoogleLogin)`
  background-color: black;
  p {
    border-left: 1px solid #bfabab82;
  }
`;
const Option = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  align-items: center;
  margin: 0.8rem auto;

  div {
    height: 1px;
    width: 45%;
    background-color: #c1b8b8;
  }

  p {
    font-size: 0.95rem;
  }
`;
const CustomLogin = styled.form`
  input {
    width: 95%;
    padding: 0.5rem;
    font-size: 1rem;
    outline: none;
    margin-top: 0.6rem;
    border: none;
    border-bottom: 1px solid #d5c5c5;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;

    a {
      font-size: 0.75rem;
      text-decoration: none;
      color: violet;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    button {
      padding: 0.5rem;
      min-width: 85px;
      border: none;
      background: linear-gradient(#168add, #2265d4);
      border-radius: 20px;
      color: white;
      font-weight: 500;
      cursor: pointer;
      display: grid;
      place-items: center;

      img {
        height: 1.4rem;
      }
    }
  }

  p {
    font-size: 0.7rem;
    line-height: 0.84rem;
    margin-top: 0.8rem;
  }
`;
const SideImg = styled.img`
  width: 27vw;
  margin-right: 5rem;

  @media (max-width: 900px) {
    display: none;
  }

  @media (max-width: 1000px) {
    margin-right: 2vw;
  }

  @media (min-width: 1600px) {
    width: 27vw;
  }
`;
const MobileHeader = styled.div`
  padding: 2rem;
  padding-bottom: 0.8rem;

  @media (min-width: 900px) {
    display: none;
  }

  @media (max-width: 380px) {
    h1 {
      font-size: 1.8rem;
    }
    h3 {
      font-size: 1rem;
    }
  }

  h3 {
    color: #2265d4;
    line-height: 1.6rem;
    font-weight: 500;
  }
`;
