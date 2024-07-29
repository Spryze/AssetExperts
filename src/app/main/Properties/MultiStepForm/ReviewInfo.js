import { Typography, List, ListItem, ListItemText, Grid } from '@mui/material';

const ReviewInfo = ({ formik }) => {
  const { values } = formik;

  return (
    <>
      <Typography variant="overline">Property Details</Typography>
      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <List>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="Property Name" secondary={values.PropertyName} />
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="Property Types" secondary={values.PropertyTypes} />
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="Location" secondary={values.Location} />
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="Property Facing" secondary={values.PropertyFacing} />
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="DepositAmount" secondary={values.DepositAmount} />
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="phone" secondary={values.phone} />
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="PropertyStatus" secondary={values.PropertyStatus} />
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="AboutDeveloper" secondary={values.AboutDeveloper} />
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="Units" secondary={values.Units} />
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="PropertyHighlights" secondary={values.PropertyHighlights} />
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="Area" secondary={values.Area} />
                </ListItem>
              </Grid>
            </Grid>
          </List>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6}>
          <List>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="Amenities" secondary={values.Amenities} />
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="aroundtheProject" secondary={values.aroundtheProject} />
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="propertyConfiguration" secondary={values.propertyConfiguration} />
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="price" secondary={values.price} />
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="AboutProject" secondary={values.AboutProject} />
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="generalPrice" secondary={values.generalPrice} />
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="emiprice" secondary={values.emiprice} />
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="moreAboutProject" secondary={values.moreAboutProject} />
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="RegidtryRecords" secondary={values.RegidtryRecords} />
                </ListItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItem>
                  <ListItemText primary="locality" secondary={values.locality} />
                </ListItem>
              </Grid>
            </Grid>
          </List>
        </Grid>
      </Grid>
    </>
  );
};

export default ReviewInfo;
