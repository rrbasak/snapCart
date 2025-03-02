import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBRow,
} from "mdb-react-ui-kit";
import styles from "../../styles/ShareModal.module.css";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

export const ShareModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  modalValue,
  index,
}) => {
  const order = modalValue[index];

  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (order?.products?.length > 0) {
      setSelectedProducts([order.products[0]]);
    }
  }, [order]);

  const handleSelectProduct = (product) => {
    let updatedSelection = selectedProducts.some(
      (p) => p.product._id === product.product._id
    )
      ? selectedProducts.filter((p) => p.product._id !== product.product._id)
      : [...selectedProducts, product];

    if (updatedSelection.length === 0) {
      updatedSelection = [product];
    }

    setSelectedProducts(updatedSelection);
  };

  const productNames =
    selectedProducts.map((p) => p.product?.name).join(", ") || "this product";
  const shareMessage = `I just bought ${productNames} from this amazing store! The quality is top-notch and the prices are unbeatable. Highly recommend checking them out! Check it out here:`;

  const isShareDisabled = selectedProducts.length === 0;

  return (
    <div>
      <Modal
        title="Why not tell your friend about your purchase!"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <MDBCardBody>
          <MDBRow>
            <MDBCol md="6">
              {order?.products?.map((p, j) => (
                <MDBCard
                  key={j}
                  className={`mb-4 ${styles.productCard}`}
                  style={{
                    borderRadius: "15px",
                    cursor: "pointer",
                    backgroundColor: selectedProducts.some(
                      (sp) => sp.product._id === p.product._id
                    )
                      ? "#f0f8ff"
                      : "transparent",
                    boxShadow: selectedProducts.some(
                      (sp) => sp.product._id === p.product._id
                    )
                      ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                      : "none",
                  }}
                  onClick={() => handleSelectProduct(p)}
                >
                  <MDBCardBody className="d-flex align-items-center">
                    <div className="me-3">
                      <MDBCardImage
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.product?._id}`}
                        alt={p.product?.name}
                        className="rounded-circle"
                        style={{
                          width: "100px",
                          border: selectedProducts.some(
                            (sp) => sp.product._id === p.product._id
                          )
                            ? "2px solid #4CAF50"
                            : "none",
                        }}
                        fluid
                      />
                    </div>
                    <div>
                      <p
                        className="mb-1"
                        style={{ fontWeight: "bold", display: "inline" }}
                      >
                        Name: {p.product?.name}
                      </p>
                      <p
                        className="text-muted mb-0"
                        style={{ fontWeight: "bold" }}
                      >
                        Price: ₹{p.product?.price}
                      </p>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              ))}
            </MDBCol>
            <MDBCol md="6">
              <MDBCardText>{shareMessage}</MDBCardText>
              <MDBRow className="mb-4 mt-4">
                <MDBCol>
                  <h5>Share on:</h5>
                </MDBCol>
              </MDBRow>
              <MDBRow className={`${styles.shareButtonsRow}`}>
                <MDBCol className={`${styles.shareButtonCol}`}>
                  <FacebookShareButton
                    url={`http://localhost:3000/product/${selectedProducts[0]?.product?.slug}`}
                    title={shareMessage}
                    hashtag="#react"
                    disabled={isShareDisabled}
                  >
                    <FacebookIcon
                      size={32}
                      round={true}
                      style={{ opacity: isShareDisabled ? 0.5 : 1 }}
                    />
                  </FacebookShareButton>
                </MDBCol>
                <MDBCol className={`${styles.shareButtonCol}`}>
                  <TwitterShareButton
                    url={`http://localhost:3000/product/${selectedProducts[0]?.product?.slug}`}
                    title={shareMessage}
                    disabled={isShareDisabled}
                  >
                    <TwitterIcon
                      size={32}
                      round={true}
                      style={{ opacity: isShareDisabled ? 0.5 : 1 }}
                    />
                  </TwitterShareButton>
                </MDBCol>
                <MDBCol className={`${styles.shareButtonCol}`}>
                  <WhatsappShareButton
                    url={`https://localhost:3000/product/${selectedProducts[0]?.product?.slug}`}
                    title={shareMessage}
                    disabled={isShareDisabled}
                  >
                    <WhatsappIcon
                      size={32}
                      round={true}
                      style={{ opacity: isShareDisabled ? 0.5 : 1 }}
                    />
                  </WhatsappShareButton>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </Modal>
    </div>
  );
};
