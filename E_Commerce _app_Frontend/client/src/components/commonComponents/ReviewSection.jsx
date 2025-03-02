import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Rating,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { formatTimestampforreview } from "../../frontendUtil/dateUtil.js";
import styles from "../../styles/Reviewsection.module.css";

const ReviewSection = ({
  pid,
  getLength,
  reviewsList,
  addReview,
  deleteReview,
  canReview,
  orderId,
}) => {
  ////console.log("reviewsList", reviewsList);
  // const [profilePhoto, setProfilePhoto] = useState(
  //   "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
  // );
  const [auth, setAuth] = useAuth();
  const [reviews, setReviews] = useState(reviewsList);
  const [newReview, setNewReview] = useState({
    username: "",
    rating: 0,
    comment: "",
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  // const [canReview, setCanReview] = useState(false);
  ////console.log("selectedReview", selectedReview);
  // useEffect(() => {
  //   const checkEligibility = async () => {
  //     try {
  //       const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/review/can-review/${pid}/${auth?.user?._id}`);
  //       if (data.success) {
  //         setCanReview(true);
  //       }
  //     } catch (error) {
  //       console.error("Error checking review eligibility:", error);
  //     }
  //   };

  //   checkEligibility();
  // }, []);
  const handleRatingChange = (event, newValue) => {
    setNewReview({ ...newReview, rating: newValue });
  };

  // const photo = auth?.user?.photo;
  // if (photo && photo.data && photo.contentType) {
  //   ////console.log("photo", photo);
  //   const base64String = btoa(
  //     String.fromCharCode(...new Uint8Array(photo.data.data))
  //   );
  //   setProfilePhoto(`data:${photo.contentType};base64,${base64String}`);
  // }
  const handleSubmit = async () => {
    if (!newReview.rating || !newReview.comment) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/review/add-review`,
        {
          product: pid,
          user: auth.user._id,
          username: auth.user.name,
          rating: newReview.rating,
          comment: newReview.comment,
          order: orderId,
        }
      );
      ////console.log(response);
      if (response.data.success) {
        const review = {
          _id: response.data.review._id,
          userPhoto: response.data.review.userPhoto,
          ...newReview,
          user: response.data.review.user,
          username: response.data.review.username,
          createdAt: response.data.review.createdAt,
        };

        setReviews((prevReviews) => [...prevReviews, review]);
        setNewReview({ rating: 0, comment: "" });
        if (response?.data?.success) {
          toast.success(response?.data?.message);
          addReview(review);
          getLength();
        }
      } else {
        toast.error(response.data.message, {
          icon: "⚠️",
          style: {
            background: "#fff9c4",
            color: "#000",
          },
        });
      }
    } catch (error) {
      ////console.log(error);
      toast.error("Failed to submit review. Please login.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleMenuOpen = (event, review) => {
    setAnchorEl(event.currentTarget);
    ////console.log("review", review);
    setSelectedReview(review);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedReview(null);
  };

  const handleEditReview = () => {
    // Implement edit functionality here
    ////console.log("Edit review", selectedReview);
    handleMenuClose();
  };

  const handleDeleteReview = async (reviewId) => {
    ////console.log(typeof(reviewId))
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/review/delete-review/${reviewId}`
      );
      if (response?.data?.success) {
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== reviewId)
        );
        toast.success("Review deleted successfully");
        deleteReview((prevReviews) =>
          prevReviews.filter((review) => review._id !== reviewId)
        );
        getLength();
      }
    } catch (error) {
      ////console.log(error);
      toast.error("Failed to delete review.");
    }
    handleMenuClose();
  };
  // ////console.log(reviews);
  // ////console.log(reviews.map(r=>r.user));
  ////console.log(auth?.user?._id);
  return (
    <div>
      {reviews?.length > 0 ? (
        reviews?.map((review) => (
          <Box
            key={review._id}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              position: "relative",
            }}
          >
            {/* <img
              src={review.userPhoto}
              alt={review.username}
              className={styles.images}
            /> */}
            {/* <img
              src={`data:${review.userPhoto.contentType};base64,${btoa(
                String.fromCharCode(
                  ...new Uint8Array(review.userPhoto.data.data)
                )
              )}`}
              alt={review.username}
              className={styles.images}
            /> */}
            <img
              src={
                review.userPhoto?.data
                  ? `data:${review.userPhoto.contentType};base64,${btoa(
                      String.fromCharCode(
                        ...new Uint8Array(review.userPhoto.data.data)
                      )
                    )}`
                  : review.userPhoto.url
              }
              alt={review.username}
              className={styles.images}
            />
            <Box>
              <Typography variant="body1">
                <span style={{ fontWeight: "bold" }}>{review.username}</span>
                <span className={styles.timestamp}>
                  {formatTimestampforreview(review.createdAt)}
                </span>
              </Typography>
              <Rating
                name={`rating-${review._id}`}
                value={review.rating}
                readOnly
                precision={0.5}
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {review.comment}
              </Typography>
            </Box>
            {auth?.user?._id === review.user && (
              <IconButton
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  borderRadius: "8px",
                }}
                onClick={(event) => handleMenuOpen(event, review)}
              >
                <MoreVertIcon />
              </IconButton>
            )}
          </Box>
        ))
      ) : (
        <Typography>No reviews yet.</Typography>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEditReview}>Edit</MenuItem>
        <MenuItem onClick={() => handleDeleteReview(selectedReview._id)}>
          Delete
        </MenuItem>
      </Menu>

      {canReview && (
        <>
          {" "}
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Add a Review
          </Typography>
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
            <Rating
              name="half-rating"
              value={newReview.rating}
              onChange={handleRatingChange}
              precision={0.5}
              sx={{ mb: 2 }}
            />
            <TextArea
              fullWidth
              label="Comment"
              name="comment"
              multiline
              rows={4}
              value={newReview.comment}
              onChange={handleInputChange}
              style={{ marginBottom: "16px" }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit Review
            </Button>
          </Box>
        </>
      )}
    </div>
  );
};

export default ReviewSection;
