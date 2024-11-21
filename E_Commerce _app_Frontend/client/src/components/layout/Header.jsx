import React, { useState, useEffect, useCallback, memo } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SearchInput from "./Form/SearchInput";
import Badges from "../../Temp/Badges.jsx";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import LeftSideBar from "./LeftSideBar.jsx";
import RightSideBar from "./RightSideBar.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../features/cart/cartSlice.js";
import { useMediaQuery } from "@mui/material";
import { clearPastProducts } from "../../features/pastProduct/pastProductSlice.js";

const pages = ["Category", "Orders"];
const settings = [
  { name: "Dashboard", to: "" },
  { name: "Logout", to: "/login" },
];
const presetting = [{ name: "Login", to: "/login" }];

const Header = memo(() => {
  const cartLength = useSelector(
    (state) => state.cartOnUser.items.filter((item) => item != null).length
  );
  const dispatch = useDispatch();
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  // const categories = useCategory();
  const categories = useSelector((state) => state.categories.list.categories);
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElPage, setAnchorElPage] = useState(null);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openRightSideBar, setOpenRightSideBar] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const isMobileViews = useMediaQuery("(max-width:900px)");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };
  const handleSearchBlur = () => setIsSearchFocused(false);
  const handleAddressHandler = () => {
    navigate("/dashboard/profile", {
      state: { activeTab: "contactReferences" },
    });
  };
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      accessToken: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    setOpenSideBar(true);
  };

  const handleOpenUserMenu = (event) => {
    isMobileView
      ? setOpenRightSideBar(true)
      : setAnchorElUser(event.currentTarget);
  };

  // const handleOpenPageMenu = (event) => {
  //   console.log(event)
  //   setAnchorElPage(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setOpenRightSideBar(false);
    setAnchorElUser(null);
  };

  const handleClosePageMenu = () => {
    setAnchorElPage(null);
  };

  const handleCloseSideBar = () => {
    setOpenSideBar(false);
  };

  const handleMenuItemClick = (setting) => {
    handleCloseUserMenu();

    if (setting.name === "Logout") {
      dispatch(clearPastProducts());
      handleLogOut();
    } else {
      navigate(`/dashboard/${auth?.user?.role === 1 ? "admin" : "profile"}`, {
        state: { activeTab: "personalAndAddress" },
      });
    }
  };

  const extractCityAndPincode = (address) => {
    const addressParts = address.split(" ");
    const pincode = addressParts[addressParts.length - 1];
    const city = addressParts[addressParts.length - 2];
    return { city, pincode };
  };

  const { city, pincode } = auth?.user?.address
    ? extractCityAndPincode(auth.user.address)
    : { city: "San Francisco", pincode: "94301" };

  const fetchCartData = useCallback(async () => {
    if (!auth?.user?._id) return;
    try {
      const { data } = await axios.get(
        `/api/v1/cart/get-cart/${auth.user._id}`
      );
      if (data?.success) {
        dispatch(setCart(data?.cartOnUser));
      } else {
        // console.log("Failed to fetch cart data");
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }, [auth, dispatch]);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  const handleOpenPageMenu = (event, page) => {
    // console.log(page);
    if (page === "Orders") {
      navigate("/dashboard/profile", { state: { activeTab: "orders" } });
    } else {
      setAnchorElPage(event.currentTarget);
    }
  };
  return (
    <>
      <AppBar position="static" style={{ zIndex: 2 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              SnapCart
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 44,
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              SnapCart
            </Typography>
            <Tooltip title="Address" arrow>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                  alignItems: "center",
                  marginRight: 2,
                  color: "inherit",
                  cursor: "pointer",
                }}
                onClick={handleAddressHandler}
              >
                <Typography variant="h8" noWrap>
                  <LocationOnIcon /> Delivery to
                </Typography>
                <Typography variant="h8" noWrap>
                  {city} {pincode}
                </Typography>
              </Box>
            </Tooltip>

            <Box
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                color: "black",
                textDecoration: "none",
                flexGrow: 6,
                paddingLeft: "200px",
              }}
            >
              {/* <SearchInput /> */}
              {!isMobileViews && (
                <SearchInput
                  isSearchFocused={isSearchFocused}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                />
              )}
            </Box>

            {/* <Box sx={{ flexGrow: 0.5, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Tooltip title={page} arrow key={page}>
                  <Button
                    onClick={handleOpenPageMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                    }}
                  >
                    {page}
                  </Button>
                </Tooltip>
              ))}
              <Menu
                disableScrollLock
                sx={{ mt: "40px" }}
                id="menu-appbar"
                anchorEl={anchorElPage}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElPage)}
                onClose={handleClosePageMenu}
              >
                <MenuItem onClick={handleClosePageMenu}>
                  <Typography
                    component={Link}
                    textAlign="center"
                    to="/categories"
                    sx={{
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    All Categories
                  </Typography>
                </MenuItem>
                {categories.map((c) => (
                  <MenuItem key={c._id} onClick={handleClosePageMenu}>
                    <Typography
                      component={Link}
                      textAlign="center"
                      to={`/category/${c.slug}`}
                      sx={{
                        color: "black",
                        textDecoration: "none",
                      }}
                    >
                      {c.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box> */}
            <Box sx={{ flexGrow: 0.5, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Tooltip title={page} arrow key={page}>
                  <Button
                    onClick={(event) => handleOpenPageMenu(event, page)}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                    }}
                  >
                    {page}
                  </Button>
                </Tooltip>
              ))}
              <Menu
                disableScrollLock
                sx={{ mt: "40px" }}
                id="menu-appbar"
                anchorEl={anchorElPage}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElPage)}
                onClose={handleClosePageMenu}
              >
                <MenuItem onClick={handleClosePageMenu}>
                  <Typography
                    component={Link}
                    textAlign="center"
                    to="/categories"
                    sx={{
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    All Categories
                  </Typography>
                </MenuItem>
                {categories.map((c) => (
                  <MenuItem
                    key={c._id}
                    onClick={() => {
                      // console.log("cid", c._id);
                      navigate(`/category/${c.slug}`, {
                        state: { cid: c._id },
                      });
                      handleClosePageMenu();
                    }}
                  >
                    <Typography
                      // component={Link}
                      textAlign="center"
                      // to={navigate(`/category/${c.slug}`, { state: { cid: c._id } })}
                      // to={`/category/${c.slug}`}

                      sx={{
                        color: "black",
                        textDecoration: "none",
                      }}
                      // onClick={navigate(`/category/${c.slug}`, {
                      //   state: { cid: c._id },
                      // })}
                    >
                      {c.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 0.5, display: "flex", alignItems: "center" }}>
              {!auth?.user ? (
                <Typography
                  variant="body1"
                  noWrap
                  component={Link}
                  to="/login"
                  sx={{
                    mr: 2,
                    // display: { xs: "none", md: "flex" },
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ display: "block" }}>Hello , </span>
                  <span style={{ display: "block", fontSize: "smaller" }}>
                    Sign in
                  </span>
                </Typography>
              ) : (
                <>
                  <Typography
                    variant="body1"
                    noWrap
                    // component={Link}
                    // to="/"
                    sx={{
                      mr: 2,
                      // display: { xs: "none", md: "flex" },
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    <span style={{ display: "block" }}>Hello , </span>
                    <span style={{ display: "block", fontSize: "smaller" }}>
                      {auth?.user?.name.split(" ")[0]}
                    </span>
                  </Typography>
                  <Tooltip title="My Profile" arrow>
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0, backgroundColor: "#ADD8E6" }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          auth?.user?.photo?.data
                            ? `/api/v1/auth/user-photo/${auth?.user?._id}`
                            : "/static/images/avatar/2.jpg"
                        }
                      />
                    </IconButton>
                  </Tooltip>
                  {auth?.user && (
                    <Menu
                      disableScrollLock
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem
                          key={setting.name}
                          onClick={() => handleMenuItemClick(setting)}
                        >
                          <Typography textAlign="center">
                            {setting.name}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  )}
                </>
              )}
            </Box>

            <Tooltip title="My Orders" arrow>
              <Box sx={{ flexGrow: 0 }}>
                <Badges count={auth?.user ? cartLength : 0} />
              </Box>
            </Tooltip>
          </Toolbar>
        </Container>
        {openSideBar && (
          <LeftSideBar open={openSideBar} onClose={handleCloseSideBar} />
        )}
        {openRightSideBar && (
          <RightSideBar open={openRightSideBar} onClose={handleCloseUserMenu} />
        )}
      </AppBar>
      {/* <Box
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "center",
          backgroundColor: "primary.main",
          padding: 1,
        }}
      >
        <SearchInput />
      </Box> */}
      {isMobileViews && (
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
            backgroundColor: "primary.main",
            padding: 1,
          }}
        >
          <SearchInput onFocus={handleSearchFocus} onBlur={handleSearchBlur} />
        </Box>
      )}
      <Tooltip title="Address" arrow>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
            backgroundColor: "primary.main",
            padding: 1,
            cursor: "pointer",
          }}
          onClick={handleAddressHandler}
        >
          <Typography variant="h8" noWrap>
            <LocationOnIcon /> Delivery to {city} {pincode}
          </Typography>
        </Box>
      </Tooltip>

      {isSearchFocused && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#000000",
            zIndex: 10,
            opacity: 0.5,
          }}
          onClick={handleSearchBlur}
        />
      )}
    </>
  );
});

export default Header;
