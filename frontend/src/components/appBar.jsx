import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => setOpen(true);
  const handleClickClose = () => setOpen(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <img
            src="https://cdn-icons-png.flaticon.com/512/6194/6194029.png"
            style={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              width: "40px",
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "arial",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            TODO
          </Typography>
          <Button color="inherit" onClick={handleClickOpen}>
            Log Out
          </Button>
          <Dialog
            open={open}
            onClose={handleClickClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to logout?"}
            </DialogTitle>

            <DialogActions>
              <Button color="error" onClick={handleClickClose} variant="contained">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  localStorage.clear();
                  setTimeout(() => {
                    navigate("/");
                    handleClickClose();
                  }, 500);
                }}
                color="inherit"
                variant="outlined"
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
