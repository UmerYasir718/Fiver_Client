import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cancel from "../myComponents/Cancel";
import Cards from "../myComponents/Cards";
import Detail from "../myComponents/Detail";
import ForgetPassword from "../myComponents/ForgetPassword";
import Login from "../myComponents/Login";
import Register from "../myComponents/Register";
import ResetPassword from "../myComponents/ResetPassword";
import SearchQuery from "../myComponents/SearchQuery";
import Success from "../myComponents/Success";
import Store from "./Store";

export default function MainRoutes() {
  const [user, setUser] = useState([]);
  const [queryData, setQueryData] = useState([]);
  const [cookies] = useCookies(["userToken"]);
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch("http://localhost:8000/userVerify", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.userToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          toast.success(data.message);
          setUser(data.userData.userData);
          setQueryData([]);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
          // console.error("Token verification failed:", errorData.message);
          // Redirect to login or handle unauthorized access
        }
      } catch (error) {
        console.error("Token verification failed:", error.message);
        // Redirect to login or handle unauthorized access
      }
    };
    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Store.Provider value={{ user, setUser, queryData, setQueryData }}>
        <Router basename='/'>
          <Routes>
            <Route exact path='/' element={<Cards />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/signup' element={<Register />}></Route>
            <Route
              exact
              path='/forgetPassword'
              element={<ForgetPassword />}
            ></Route>
            <Route exact path='/detail' element={<Detail />}></Route>
            <Route
              exact
              path='/UserReset-Password/:id/:userToken'
              element={<ResetPassword />}
            ></Route>
            <Route exact path='/query' element={<SearchQuery />}></Route>
            <Route exact path='/sucess' element={<Success />}></Route>
            <Route exact path='/cancel' element={<Cancel />}></Route>
          </Routes>
        </Router>
      </Store.Provider>
    </div>
  );
}
