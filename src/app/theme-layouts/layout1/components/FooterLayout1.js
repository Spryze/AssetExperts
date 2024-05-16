import AppBar from "@mui/material/AppBar";
import { ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { memo } from "react";
import { useSelector } from "react-redux";
import { selectFooterTheme } from "app/store/rabit/settingsSlice";
import clsx from "clsx";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function FooterLayout1(props) {
  const footerTheme = useSelector(selectFooterTheme);

  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar
        id="rabit-footer"
        className={clsx("relative z-20 shadow-md", props.className)}
        color="default"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? footerTheme.palette.background.paper
              : footerTheme.palette.background.default,
        }}
      >
        <Box
          sx={{ bgcolor: "default", color: "white", marginTop: "30px" }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {/* About Us */}
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6">About Us</Typography>
                <Typography variant="body2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Typography>
              </Grid>
              {/* Quick Links */}
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6">Quick Links</Typography>
                <Box>
                  <Link sx={{ margin: "0px 5px" }} href="#">
                    Home
                  </Link>
                  <Link sx={{ margin: "0px 5px" }} href="#">
                    Services
                  </Link>
                  <Link sx={{ margin: "0px 5px" }} href="#">
                    Products
                  </Link>
                  <Link sx={{ margin: "0px 5px" }} href="#">
                    Contact Us
                  </Link>
                </Box>
              </Grid>
              {/* Social Media */}
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6">Follow Us</Typography>
                <Box>
                  <IconButton color="inherit" aria-label="Facebook">
                    <FacebookIcon />
                  </IconButton>
                  <IconButton color="inherit" aria-label="Twitter">
                    <TwitterIcon />
                  </IconButton>
                  <IconButton color="inherit" aria-label="LinkedIn">
                    <LinkedInIcon />
                  </IconButton>
                </Box>
              </Grid>
              {/* Contact Info */}
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6">Contact Info</Typography>
                <Typography variant="body2">Email: info@example.com</Typography>
                <Typography variant="body2">Phone: +1234567890</Typography>
                <Typography variant="body2">
                  Address: 123, Street Name, City, Country
                </Typography>
              </Grid>
            </Grid>
            {/* Bottom Text */}
            <Box pt={4} textAlign="center">
              <Typography variant="body2">
                © {new Date().getFullYear()} Your Company Name. All rights
                reserved.
              </Typography>
            </Box>
          </Container>
        </Box>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(FooterLayout1);
