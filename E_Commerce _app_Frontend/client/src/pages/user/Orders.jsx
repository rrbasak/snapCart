/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
import OrdersSkeleton from "../../skeleton/Users/Profile/OrdersSkeleton";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useAuth();

  //loader
  const [orderLoader, setOrderLoader] = useState(false);
  const getOrders = async () => {
    try {
      setOrderLoader(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      ////console.log(error);
    } finally {
      setTimeout(() => {
        setOrderLoader(false);
      }, 100000);
    }
  };

  useEffect(() => {
    if (auth?.accessToken) getOrders();
  }, [auth?.accessToken]);

  return (
    // <Layout title={"Your Orders"}>
    <div className="container-flui p-3 m-3">
      <div className="row">
        {/* <div className="col-md-3">
            <UserMenu />
          </div> */}
        <div className="col-md-9">
          {/* <h1 className="text-center">All Orders</h1> */}
          {orderLoader ? (
            <>
              <OrdersSkeleton />
            </>
          ) : (
            <>
              {orders?.map((o, i) => {
                return (
                  <div className="border shadow">
                    <table className="table">
                      <thead
                        style={{
                          backgroundColor: "#f0f8ff",
                          color: "#333",
                          textAlign: "center",
                        }}
                      >
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col"> date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createAt).fromNow()}</td>
                          <td>{o?.payment.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {o?.products?.map((p, i) => (
                        <div className="row mb-2 p-3 card flex-row" key={p._id}>
                          <div className="col-md-4">
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top"
                              alt={p.name}
                              width="100px"
                              height={"100px"}
                            />
                          </div>
                          <div className="col-md-8">
                            <p>{p.name}</p>
                            <p>{p.description.substring(0, 30)}</p>
                            <p>Price : $ {p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
    // </Layout>
  );
}
