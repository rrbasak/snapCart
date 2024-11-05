// original 
// import React from "react";
// import { NavLink } from "react-router-dom";
// const AdminMenu = () => {
//   return (
//     <>
//       <div className="text-center">
//         <div className="list-group">
//           <h4>Admin Panel</h4>
//           <NavLink
//             to="/dashboard/admin/create-category"
//             className="list-group-item list-group-item-action"
//           >
//             Create Category
//           </NavLink>
//           <NavLink
//             to="/dashboard/admin/create-subcategory"
//             className="list-group-item list-group-item-action"
//           >
//             Create Subcategory
//           </NavLink>
//           <NavLink
//             to="/dashboard/admin/create-product"
//             className="list-group-item list-group-item-action"
//           >
//             Create Product
//           </NavLink>
//           <NavLink
//             to="/dashboard/admin/create-product-ram"
//             className="list-group-item list-group-item-action"
//           >
//             Create Product RAM
//           </NavLink>
//           <NavLink
//             to="/dashboard/admin/create-product-size"
//             className="list-group-item list-group-item-action"
//           >
//             Create Product Size
//           </NavLink>
//           <NavLink
//             to="/dashboard/admin/create-product-color"
//             className="list-group-item list-group-item-action"
//           >
//             Create Product Color
//           </NavLink>
//           <NavLink
//             to="/dashboard/admin/products"
//             className="list-group-item list-group-item-action"
//           >
//             Products
//           </NavLink>
//           <NavLink
//             to="/dashboard/admin/orders"
//             className="list-group-item list-group-item-action"
//           >
//             Orders
//           </NavLink>
//           <NavLink
//             to="/dashboard/admin/prime-day"
//             className="list-group-item list-group-item-action"
//           >
//             Prime Day 
//           </NavLink>
//           <NavLink
//             to="/dashboard/admin/users"
//             className="list-group-item list-group-item-action"
//           >
//             Users
//           </NavLink>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminMenu;


// original

import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const [showCategory, setShowCategory] = useState(false);
  const [showProduct, setShowProduct] = useState(false);

  const toggleCategory = () => setShowCategory(!showCategory);
  const toggleProduct = () => setShowProduct(!showProduct);

  return (
    <div className="text-center">
      <div className="list-group">
        <h4>Admin Panel</h4>

        {/* Category Header */}
        <div
          className="list-group-item list-group-item-action"
          onClick={toggleCategory}
        >
          <strong>Category</strong>
          {showCategory ? <span>&#9660;</span> : <span>&#9654;</span>}
        </div>
        {showCategory && (
          <div className="list-group">
            <NavLink
              to="/dashboard/admin/create-category"
              className="list-group-item list-group-item-action"
            >
              Create Category
            </NavLink>
            <NavLink
              to="/dashboard/admin/create-subcategory"
              className="list-group-item list-group-item-action"
            >
              Create Subcategory
            </NavLink>
          </div>
        )}

        {/* Product Header */}
        <div
          className="list-group-item list-group-item-action"
          onClick={toggleProduct}
        >
          <strong>Product</strong>
          {showProduct ? <span>&#9660;</span> : <span>&#9654;</span>}
        </div>
        {showProduct && (
          <div className="list-group">
            <NavLink
              to="/dashboard/admin/products"
              className="list-group-item list-group-item-action"
            >
              Products List
            </NavLink>
            <NavLink
              to="/dashboard/admin/create-product-ram"
              className="list-group-item list-group-item-action"
            >
              Create Product RAM
            </NavLink>
            <NavLink
              to="/dashboard/admin/create-product-size"
              className="list-group-item list-group-item-action"
            >
              Create Product Size
            </NavLink>
            <NavLink
              to="/dashboard/admin/create-product-color"
              className="list-group-item list-group-item-action"
            >
              Create Product Color
            </NavLink>
            <NavLink
              to="/dashboard/admin/create-product"
              className="list-group-item list-group-item-action"
            >
              Create Product
            </NavLink>
          </div>
        )}

        {/* Other Links */}
        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action"
        >
          Orders
        </NavLink>
        <NavLink
          to="/dashboard/admin/prime-day"
          className="list-group-item list-group-item-action"
        >
          Prime Day
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action"
        >
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
