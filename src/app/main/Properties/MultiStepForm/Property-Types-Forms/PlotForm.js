import {
    TextField,
    Grid
  } from '@mui/material';
  
  const PlotForm = (props) => {
    const { formik } = props;
    return (
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={6}
        >
          <TextField
            name="firstName"
            label="First Name"
            variant="outlined"
            size='small'
            fullWidth
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid
          item
          xs={6}
        >
          <TextField
            name="lastName"
            label="Last Name"
            variant="outlined"
            size="small"
            fullWidth
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastNamel)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <TextField
            name="phone"
            label="Phone Number"
            variant="outlined"
            type="phone"
            fullWidth
            size="small"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <TextField
            name="residence"
            label="Residence"
            variant="outlined"
            size="small"
            fullWidth
            value={formik.values.residence}
            onChange={formik.handleChange}
            error={formik.touched.residence && Boolean(formik.errors.residence)}
            helperText={formik.touched.residence && formik.errors.residence}
          />
        </Grid>
        <Grid
          item
          xs={6}
        >
          <TextField
            name="lastName"
            label="Last Name"
            variant="outlined"
            size="small"
            fullWidth
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastNamel)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
        <Grid
          item
          xs={6}
        >
          <TextField
            name="lastName"
            label="Last Name"
            variant="outlined"
            size="small"
            fullWidth
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastNamel)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
      </Grid>
    )
  }
  
  export default PlotForm
