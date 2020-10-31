import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import HistoryIcon from "@material-ui/icons/History";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import SignOutIcon from "@material-ui/icons/ExitToApp";
import MoreIcon from "@material-ui/icons/MoreVert";
import { signOut } from "../hooks/authUtils";

import { Page } from "../types";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export interface HeaderProps {
  page?: Page;
  actions: {
    setPage: (page: Page) => void;
    setSearchString: (searchString: string) => void;
  };
  shownRecipe?: string;
}

export default function PrimarySearchAppBar({
  page = "Shopping List" as Page,
  actions = {
    setPage: (page: Page) => {
      console.log("called setPage", page);
    },
    setSearchString: (searchString: string) => {
      console.log("called setSearchString", searchString);
    },
  },
  shownRecipe,
}: HeaderProps) {
  const { setPage, setSearchString } = actions;
  const classes = useStyles();
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
  const isProfileMenuOpen = Boolean(profileAnchorEl);

  const [mobileAnchorEl, setMobileAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileAnchorEl);

  const handleProfileMenuOpen = (event: any) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
  };

  const handleSetPage = (page: Page) => {
    setPage(page);
    handleMobileMenuClose();
    handleProfileMenuClose();
  };

  const profileMenuId = "primary-search-account-menu-profile";
  const renderProfileMenu = (
    <Menu
      anchorEl={profileAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={profileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      {page !== "Profile" && (
        <MenuItem onClick={() => handleSetPage("Profile" as Page)}>
          Profile
        </MenuItem>
      )}
      {page !== "My Account" && (
        <MenuItem onClick={() => handleSetPage("My Account" as Page)}>
          My Account
        </MenuItem>
      )}
      <MenuItem onClick={() => signOut()}>Sign Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {page !== "Shopping List" && (
        <MenuItem onClick={() => handleSetPage("Shopping List" as Page)}>
          <IconButton aria-label="show Shopping List" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <ShoppingBasketIcon />
            </Badge>
          </IconButton>
          <p>Shopping List</p>
        </MenuItem>
      )}
      {page !== "Shopping History" && (
        <MenuItem onClick={() => handleSetPage("Shopping History" as Page)}>
          <IconButton aria-label="show Shopping History" color="inherit">
            <HistoryIcon />
          </IconButton>
          <p>Shopping History</p>
        </MenuItem>
      )}
      {page !== "Recipes" && (
        <MenuItem onClick={() => handleSetPage("Recipes" as Page)}>
          <IconButton aria-label="show Recipes" color="inherit">
            <FormatListBulleted />
          </IconButton>
          <p>Recipes</p>
        </MenuItem>
      )}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={() => handleSetPage("Profile" as Page)}
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={() => signOut()}>
        <IconButton aria-label="sign out" color="inherit">
          <SignOutIcon />
        </IconButton>
        <p>Sign Out</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {shownRecipe || page}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(event) => setSearchString(event.target.value)}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              aria-label="show Shopping List"
              color="inherit"
              onClick={() => handleSetPage("Shopping List" as Page)}
            >
              <Badge badgeContent={4} color="secondary">
                <ShoppingBasketIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="show Shopping History"
              color="inherit"
              onClick={() => handleSetPage("Shopping History" as Page)}
            >
              <HistoryIcon />
            </IconButton>
            <IconButton
              aria-label="show Recipes"
              color="inherit"
              onClick={() => handleSetPage("Recipes" as Page)}
            >
              <FormatListBulleted />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={profileMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderProfileMenu}
    </div>
  );
}
