// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// import { BrowserRouter as Router } from "react-router-dom";
// import { AuthProvider } from "./context/auth";
// import "antd/dist/reset.css";
// import { SearchProvider } from "./context/search";
// import { CartProvider } from "./context/cart";
// import { Auth0Provider } from "@auth0/auth0-react";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Auth0Provider
//     domain="dev-dzlbazokb0c2m15d.us.auth0.com"
//     clientId="6QHmxaI5euigAtgQftVafs8nKHpwgndn"
//     authorizationParams={{
//       redirect_uri: window.location.origin,
//     }}
//   >
//     <AuthProvider>
//       <SearchProvider>
//         <CartProvider>
//           <Router>
//             <App />
//           </Router>
//         </CartProvider>
//       </SearchProvider>
//     </AuthProvider>
//   </Auth0Provider>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(//////console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import "antd/dist/reset.css";
import { SearchProvider } from "./context/search";
import { CartProvider } from "./context/cart";
import { Auth0Provider } from "@auth0/auth0-react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GoogleOAuthProvider clientId="472255133850-2jad9hdgh9d6q02e6uvcrsmhecbbsi1g.apps.googleusercontent.com">
        <AuthProvider>
          <SearchProvider>
            <CartProvider>
              <Router>
                <App />
              </Router>
            </CartProvider>
          </SearchProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//////console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
