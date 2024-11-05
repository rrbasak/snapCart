// import axios from "axios";
// import { useState, useEffect, useContext, createContext } from "react";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     user: null,
//     accessToken: "",
//   });
//   axios.defaults.headers.common["Authorization"] = auth?.accessToken;
//   useEffect(() => {
//     const data = localStorage.getItem("auth");
//     if (data) {
//       const parseData = JSON.parse(data);
//       setAuth({
//         ...auth,
//         user: parseData.user,
//         accessToken: parseData.accessToken,
//       });
//     }
//     //eslint-disable-next-line
//   }, []);
//   return (
//     <AuthContext.Provider value={[auth, setAuth]}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // custom hook
// const useAuth = () => useContext(AuthContext);

// export { useAuth, AuthProvider };

// import axios from "axios";
// import {
//   useState,
//   useEffect,
//   useContext,
//   createContext,
//   useCallback,
// } from "react";

// // Axios instance
// const axiosInstance = axios.create({
//   baseURL: "http://localhost:3000",
// });

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     user: null,
//     accessToken: "",
//   });

//   // Function to refresh the token
//   const refreshToken = useCallback(async () => {
//     try {
//       const response = await axiosInstance.post(
//         "/refresh-token",
//         {},
//         {
//           withCredentials: true, // Include cookies
//         }
//       );
//       const newAccessToken = response.data.accessToken;
//       setAuth((prevAuth) => {
//         const updatedAuth = {
//           ...prevAuth,
//           accessToken: newAccessToken,
//         };
//         localStorage.setItem("auth", JSON.stringify(updatedAuth));
//         return updatedAuth;
//       });
//       return newAccessToken;
//     } catch (error) {
//       console.error("Failed to refresh token", error);
//       throw error;
//     }
//   }, []);

//   axiosInstance.defaults.headers.common["Authorization"] = auth?.accessToken;

//   useEffect(() => {
//     const data = localStorage.getItem("auth");
//     if (data) {
//       const parseData = JSON.parse(data);
//       setAuth({
//         user: parseData.user,
//         accessToken: parseData.accessToken,
//       });
//     }
//   }, []);

//   // Interceptor to handle token expiration
//   useEffect(() => {
//     const interceptor = axiosInstance.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 403 && !originalRequest._retry) {
//           originalRequest._retry = true;
//           const newAccessToken = await refreshToken();
//           axiosInstance.defaults.headers.common[
//             "Authorization"
//           ] = `${newAccessToken}`;
//           return axiosInstance(originalRequest);
//         }
//         return Promise.reject(error);
//       }
//     );
//     return () => {
//       axiosInstance.interceptors.response.eject(interceptor);
//     };
//   }, [refreshToken]);

//   return (
//     <AuthContext.Provider value={[auth, setAuth]}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook
// const useAuth = () => useContext(AuthContext);

// export { useAuth, AuthProvider, axiosInstance };

// import axios from "axios";
// import { useState, useEffect, useContext, createContext } from "react";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     user: null,
//     accessToken: "",
//   });

//   useEffect(() => {
//     const data = localStorage.getItem("auth");
//     if (data) {
//       const parseData = JSON.parse(data);
//       setAuth({
//         ...auth,
//         user: parseData.user,
//         accessToken: parseData.accessToken,
//       });
//     }

//     const updateAccessToken = () => {
//       axios.interceptors.response.use(
//         (response) => {
//           const newAccessToken = response.headers["new-access-token"];
//           if (newAccessToken) {
//             const updatedAuth = { ...auth, accessToken: newAccessToken };
//             localStorage.setItem("auth", JSON.stringify(updatedAuth));
//             setAuth(updatedAuth);
//           }
//           return response;
//         },
//         (error) => {
//           return Promise.reject(error);
//         }
//       );
//     };

//     updateAccessToken();
//   }, []);

//   axios.defaults.headers.common["Authorization"] = auth?.accessToken;

//   return (
//     <AuthContext.Provider value={[auth, setAuth]}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook
// const useAuth = () => useContext(AuthContext);

// export { useAuth, AuthProvider };

import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    accessToken: "",
  });
  // const [updatedheader,setUpdatedHeader] = useState();
  useEffect(() => {
    const data = localStorage.getItem("auth");
    //console.log("data: " + JSON.parse(data));
    if (data) {
      const parseData = JSON.parse(data);
      //console.log("parseData", parseData);
      setAuth({
        user: parseData.user,
        accessToken: parseData.accessToken,
      });
    }

    // const updateAccessToken = () => {
    //   axios.interceptors.response.use(
    //     (response) => {
    //       //console.log("response", response);
    //       const newAccessToken = response.headers["new-access-token"];
    //       //console.log("newAccessToken",newAccessToken);
    //       //console.log("response.headers", response.headers);
    //       if (newAccessToken && newAccessToken !== auth.accessToken) {
    //         const updatedAuth = { ...auth, accessToken: newAccessToken };
    //         //console.log("updatedAuth", updatedAuth);
    //         localStorage.setItem("auth", JSON.stringify(updatedAuth));
    //         setAuth(updatedAuth);
    //         axios.defaults.headers.common["Authorization"] = newAccessToken;
    //       }
    //       return response;
    //     },
    //     (error) => {
    //       return Promise.reject(error);
    //     }
    //   );
    // };

    // updateAccessToken();
    // axios.defaults.headers.common["Authorization"] = auth?.accessToken;
    // setUpdatedHeader(true);
  }, []);

  // useEffect(() => {
  //   //console.log("auth?.accessToken", auth?.accessToken);
  //   axios.defaults.headers.common["Authorization"] = auth?.accessToken;
  // }, [auth?.accessToken]);
  axios.defaults.headers.common["Authorization"] = auth?.accessToken;
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
