import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCategories } from "../features/categories/categoriesSlice";

export default function useCategory() {
  const [local_categories, setLocalCategories] = useState([]);
  const dispatch = useDispatch();
  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      setLocalCategories(data?.categories);
      //console.log(data);
      dispatch(setCategories(data));
    } catch (error) {
      //////console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return local_categories;
}
