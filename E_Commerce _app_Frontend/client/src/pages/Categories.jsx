import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
} from "mdb-react-ui-kit";
import styles from "../styles/Categories.module.css";
import CategorySkeleton from "../skeleton/Users/Category/CategorySkeleton";

export default function Categories() {
  const categories = useCategory();
  const navigate = useNavigate();

  //loader
  const [categoryloader, setCategoryLoader] = useState(false);
  useEffect(() => {
    if (categories.length === 0) {
      setCategoryLoader(true);
    } else {
      setCategoryLoader(false);
      // setTimeout(()=>{

      // },1000000)
    }
  }, [categories]);
  return (
    <Layout title={"All Categories"}>
      <div style={{ marginTop: "20px" }}>
        <MDBContainer>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>Shop by Category</h2>
          </div>
          <MDBRow className={`mb-4 ${styles.cardContainer}`}>
            {categoryloader ? (
              <>
                <CategorySkeleton />
              </>
            ) : (
              <>
                {categories.map((c) => (
                  <MDBCol
                    md="4"
                    className={`mb-4 d-flex justify-content-center ${styles.cardCol}`}
                    key={c._id}
                  >
                    {/* <Link to={`/category/${c.slug}`} className={styles.cardText}> */}
                    <Link className={styles.cardText}>
                      <MDBCard
                        className={styles.card}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/category/${c.slug}`, {
                            state: { cid: c._id },
                          });
                        }}
                      >
                        <MDBCardImage
                          // src="/images/m2.png"
                          src={
                            c.photo
                              ? `/api/v1/category/category-photo/${c?._id}`
                              : "/images/m2.png"
                          }
                          position="top"
                          alt={`${c.name} image`}
                          className={styles.cardImage}
                        />
                        <MDBCardBody className={styles.cardBody}>
                          <MDBCardText>{c.name}</MDBCardText>
                        </MDBCardBody>
                      </MDBCard>
                    </Link>
                  </MDBCol>
                ))}
              </>
            )}
          </MDBRow>
        </MDBContainer>
      </div>
    </Layout>
  );
}
