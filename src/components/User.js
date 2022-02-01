import React, { useState } from "react";
import styled from "styled-components";

const User = () => {
  const [forSignUp, setForSignUp] = useState(true);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const register = (e) => {
    e.preventDefault();
  };

  const loginUser = (e) => {};

  return (
    <>
      <MobileHeader>
        <h1>College Window </h1>
        <h3>helps you to get college updates </h3>
      </MobileHeader>
      <Container>
        <SideImg
          src="https://mazipan.github.io/login-page-css/undraw-login.1df4c833.svg"
          alt=""
        />
        {forSignUp ? (
          <LoginForm>
            <Header>
              <p>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7AzTFrLQWcLwhDP8TA4v0Gv_sAcTKUBI1qDyQ5U_Iq6rZCFn5WJOfZn6jGgZX412DeAs&usqp=CAU"
                  alt=""
                />{" "}
                Sign Up
              </p>
              <span onClick={() => setForSignUp(!forSignUp)}>
                Already have an account?
              </span>
            </Header>

            <GoogleLogin
              onClick={() => alert("Google login will be added soon")}
            >
              <img
                src="https://mazipan.github.io/login-page-css/google.ddf4da71.svg"
                alt=""
              />
              <p>Continue with Google</p>
            </GoogleLogin>

            <Option>
              <div></div>
              <p>or</p>
              <div></div>
            </Option>

            <CustomLogin onSubmit={register}>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div>
                <a onClick={() => alert("Google login will be added soon")}>
                  Google Signup
                </a>
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
              <p>
                This page is protected by Google Authentication, and subject to
                the Google Privacy Policy and Terms of service.
              </p>
            </CustomLogin>
          </LoginForm>
        ) : (
          <LoginForm>
            <Header>
              <p>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7AzTFrLQWcLwhDP8TA4v0Gv_sAcTKUBI1qDyQ5U_Iq6rZCFn5WJOfZn6jGgZX412DeAs&usqp=CAU"
                  alt=""
                />{" "}
                Sign in
              </p>
              <span onClick={() => setForSignUp(!forSignUp)}>
                create an account
              </span>
            </Header>

            <GoogleLogin
              onClick={() => alert("Google login will be added soon")}
            >
              <img
                src="https://mazipan.github.io/login-page-css/google.ddf4da71.svg"
                alt=""
              />
              <p>Continue with Google</p>
            </GoogleLogin>
            <Option>
              <div></div>
              <p>or</p>
              <div></div>
            </Option>
            <CustomLogin onSubmit={loginUser}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div>
                <a onClick={() => alert("This feature will be added soon")}>
                  Forget Password
                </a>
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

              <p>
                This page is protected by Google Authentication, and subject to
                the Google Privacy Policy and Terms of service.
              </p>
            </CustomLogin>
          </LoginForm>
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

const LoginForm = styled.div`
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
    width: 100%;
    padding: 0.2rem 0.8rem;
    font-size: 1rem;
    outline: none;
    margin-top: 0.6rem;
    border: none;
    border-bottom: 1px solid #d5c5c5;
  }

  div {
    display: flex;
    justify-content: space-between;
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
      padding: 0.35rem 1.1rem;
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
