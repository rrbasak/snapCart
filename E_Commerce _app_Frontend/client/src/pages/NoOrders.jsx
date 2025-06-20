import { Button } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 

const noOrders = "/images/noOrders.webp";

const NoOrders = () => {
  const navigate = useNavigate(); 

  const handleStartShopping = () => {
    navigate("/"); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="p-10 flex flex-col items-center text-center border-gray-300 min-w-[320px]"
      >
        <motion.img
          src={noOrders}
          alt="No Orders"
          className="w-40 h-40 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          🛒 No Orders Yet!
        </h2>
        <p className="text-gray-500 mb-6">
          Start shopping to find amazing products! 🎉
        </p>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-8"
        >
          <Button
            type="primary"
            size="large"
            onClick={handleStartShopping} 
          >
            🛍️ Start Shopping
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NoOrders;
