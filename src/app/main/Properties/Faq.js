import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const Faq = () => {
  const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: '500',
  margin:'20px 0px',
}));
  return (
    <div style={{  display:"flex",justifyContent:"center",margin:"20px 0px"}}>
      <div style={{width: "80%",}}>
      <StyledTypography variant="h5" gutterBottom>
        Property Buy or Sell Leads
      </StyledTypography>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>
            1: How can I list my property for sale on Asset Experts?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A:You can list your property by either uploading the details and
            images directly on our website or by sending the information to our
            WhatsApp bot. Our staff can also assist you with uploading if
            needed.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>
         
            2:Can I receive notifications for new properties via WhatsApp?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           A: Yes, you can opt-in to receive property notifications through
            our WhatsApp bot. Free users can choose up to 10 areas, while paid
            users have unlimited access for a year for just ₹500.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography>
          3:  How do I set up property alerts for specific areas?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           A:To set up alerts, send “help” message to our WhatsApp number,
            select your areas of interest, and subscribe to notifications via
            WhatsApp. You will receive updates on new properties matching your
            criteria.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <Typography>
        4:How are leads redirected to property owners or agents?**
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
             A:Our system automatically redirects leads and inquiries to the
            property owner or designated agent, ensuring that potential buyers
            can directly contact them for further details.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5-content"
          id="panel5-header"
        >
          <Typography>
    5:Is there a cost to receive property notifications?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
   A:Yes, free users can subscribe to notifications for up to 10
            areas. For unlimited access, there is a nominal fee of ₹500 per
            year.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <StyledTypography variant="h5" gutterBottom>
        Legal Verification of Property Documents
      </StyledTypography>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6-content"
          id="panel6-header"
        >
          <Typography>
 1:What types of legal verification services do you offer?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           A: We provide comprehensive legal verification services to
            authenticate and verify the legality of property documents, ensuring
            they are legitimate and free from any legal disputes.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7-content"
          id="panel7-header"
        >
          <Typography>
           2: How do I request a legal verification for my property
            documents
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
 A: You can request legal verification by contacting us through our
            website or WhatsApp bot. Provide the necessary documents, and our
            legal team will review and verify them.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel8-content"
          id="panel8-header"
        >
    3:What documents do I need to submit for legal verification?
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
      A: Typically, you will need to submit the property title deed, sale
            agreement, encumbrance certificate, and any other relevant
            documents. Our team will guide you on the specific requirements.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel9-content"
          id="panel9-header"
        >
          4: How long does the legal verification process take?
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A: The duration of the verification process can vary depending on
            the complexity of the documents. Generally, it takes between 5 to 10
            business days to complete the verification.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel10-content"
          id="panel10-header"
        >
          5: What are the benefits of getting my property documents
          verified?
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A: Legal verification ensures that your property documents are
            authentic, reducing the risk of legal issues and providing peace of
            mind during transactions.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <StyledTypography variant="h5" gutterBottom>
        Verified Listings
      </StyledTypography>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel11-content"
          id="panel11-header"
        >
          <Typography>1: What is a verified listing?</Typography>
        </AccordionSummary>
        <AccordionDetails>
           A: verified listing is a property that has undergone a thorough
          verification process by our staff to ensure the accuracy of its
          details and the authenticity of its documentation.
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel12-content"
          id="panel12-header"
        >
          2: How do you verify property listings?
        </AccordionSummary>
        <AccordionDetails>
          A: Our team conducts a detailed review of the property documents,
          checks the property’s physical condition, and confirms the details
          provided by the owner or agent before listing it as verified.
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel13-content"
          id="panel13-header"
        >
          3: Why should I choose a verified listing?
        </AccordionSummary>
        <AccordionDetails>
           Choosing a verified listing provides assurance that the property
          details are accurate, reducing the risk of fraud and ensuring a
          smoother transaction process.
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel14-content"
          id="panel14-header"
        >
          4: How can I get my property verified?
        </AccordionSummary>
        <AccordionDetails>
          To get your property verified, upload the necessary documents and
          details on our website or send them via our WhatsApp bot. Our team
          will review and verify your property before listing it.
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel15-content"
          id="panel15-header"
        >
          5: Is there an additional cost for verified listings?
        </AccordionSummary>
        <AccordionDetails>
          No, there is no additional cost for having your property listed as
          verified. This is part of our commitment to ensuring transparency and
          trust in the real estate market.
        </AccordionDetails>
      </Accordion>

      <StyledTypography variant="h5" gutterBottom>
        Property Surveillance and Maintenance
      </StyledTypography>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel16-content"
          id="panel16-header"
        >
          1: What services are included in property surveillance and
          maintenance?
        </AccordionSummary>
        <AccordionDetails>
          Our services include regular visits to your property, providing
          updates through photos and videos, and performing necessary
          maintenance to keep the property in good condition.
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel17-content"
          id="panel17-header"
        >
          2: How often will my property be visited?
        </AccordionSummary>
        <AccordionDetails>
           The frequency of visits can be customized based on your
          preferences. Typically, we offer monthly or quarterly visits, but we
          can accommodate more frequent visits if needed.
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel18-content"
          id="panel18-header"
        >
          3: What types of maintenance services do you provide?**
        </AccordionSummary>
        <AccordionDetails>
           We provide basic maintenance services such as fencing, wastage
          removal etc.
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel19-content"
          id="panel19-header"
        >
          4: How do I request property surveillance and maintenance
          services?
        </AccordionSummary>
        <AccordionDetails>
           You can request these services by contacting us through our
          website or WhatsApp bot. Provide details of your property, and we will
          arrange a service plan that meets your needs.
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel20-content"
          id="panel20-header"
        >
          5: What are the benefits of property surveillance and
          maintenance?
        </AccordionSummary>
        <AccordionDetails>
          A: Regular surveillance and maintenance ensure that your property
          remains in excellent condition, prevents potential issues, and
          provides you with peace of mind, especially if you are not located
          nearby.
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel21-content"
          id="panel21-header"
        >
          6: How will I be informed about the status of my property
        </AccordionSummary>
        <AccordionDetails>
          A: You will receive regular updates through photos and videos, which
          will be shared with you via our WhatsApp bot or email. We will also
          notify you of any necessary maintenance or issues that need attention.
        </AccordionDetails>
      </Accordion>
      </div>
    </div>
  );
};

export default Faq;

// const h5 = styled.h5`
// font-weight : bold`