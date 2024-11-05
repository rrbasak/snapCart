import React from "react";
import styles from "../../styles/CartPage.module.css";

const CustomTooltip = ({ brand, model, damage }) => {
  const getDamageTypeLabel = (type) => {
    switch (type) {
      case "no_damage":
        return "No Damage";
      case "body_damage":
        return "Body Damage";
      case "screen_damage":
        return "Screen Damage";
      default:
        return type; // fallback to the original type if no match is found
    }
  };

  return (
    <div className={styles.customTooltip}>
      <div>
        <strong>Brand:</strong> {brand}
      </div>
      <div>
        <strong>Model:</strong> {model}
      </div>
      <div>
        <strong>Damage Details:</strong>
      </div>
      <ul>
        {damage.length === 0 ? (
          <li>No damage</li>
        ) : (
          damage.map((item) => (
            <li key={item._id}>
              <div>
                <strong>Type:</strong> {getDamageTypeLabel(item.damage_type)}
              </div>
              <div>
                <strong>Price:</strong> ₹{item.exchange_price}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CustomTooltip;
