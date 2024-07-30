import { Grid, Typography, Paper } from '@mui/material';
import React from 'react';

const AboutUs = () => {
  return (
    <div style={{ padding: 20 }}>


        <Typography variant="body1" paragraph>
          <strong>About Us</strong><br />
          Welcome to Asset Experts, your trusted partner in the real estate journey. We are dedicated to transforming the way you buy, sell, and maintain properties, ensuring a seamless and transparent experience.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Our Story</strong><br />
          Founded by Mr. Durga Prasad Gandi and Mr. Srinivas Gandi, Asset Experts was born out of a shared vision to address the pain points in the real estate market. With years of experience in various technologies, financial products, management, and legal services, Mr. Durga Prasad Gandi and Mr. Srinivas Gandi recognized the need for a more efficient, trustworthy, and customer-centric approach to real estate.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Our Mission</strong><br />
          At Asset Experts, our mission is to simplify the complexities of real estate transactions, provide reliable buy or sell leads, legal support, and ensure the well-being of your properties. We strive to offer services that cater to the diverse needs of property buyers, sellers, and owners, making real estate a hassle-free and rewarding experience for everyone.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Our Services</strong><br />
          <ul>
            <li>Property Buy or Sell Leads</li>
            <li>Legal Verification of Property Documents</li>
            <li>Verified Listings</li>
            <li>Property Surveillance and Maintenance</li>
          </ul>
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Why Choose Us?</strong><br />
          The real estate market is often plagued by misinformation, legal challenges, and maintenance issues. At Asset Experts, we are committed to overcoming these obstacles by providing a transparent platform, reliable legal services, and comprehensive property management solutions.
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Our Founders</strong><br />
          <ul>
            <li>Mr. Durga Prasad Gandi: With a robust background in various software technologies and verification of property documents, Mr. Durga Prasad Gandi brings extensive knowledge and a keen eye for detail to the team.</li>
            <li>Mr. Srinivas Gandi: As a seasoned Financial and Legal expert, Mr. Srinivas ensures that every aspect of our services meets the highest legal standards.</li>
          </ul>
        </Typography>
        <Typography variant="body1" align="center" style={{ marginTop: 20 }}>
          Thank you for choosing Asset Experts. We look forward to serving you and helping you achieve your real estate goals.
        </Typography>

    </div>
  );
};

export default AboutUs;
