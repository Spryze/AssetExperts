// import { yupResolver } from "@hookform/resolvers/yup";
// import { Controller, useForm } from "react-hook-form";
// import Button from "@mui/material/Button";
// import Checkbox from "@mui/material/Checkbox";
// import FormControl from "@mui/material/FormControl";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";
// import { Link, useNavigate } from "react-router-dom";
// import * as yup from "yup";
// import _ from "@lodash";
// import AvatarGroup from "@mui/material/AvatarGroup";
// import Avatar from "@mui/material/Avatar";
// import Box from "@mui/material/Box";
// import CheckIcon from "@mui/icons-material/Check";
// import Alert from "@mui/material/Alert";
// import Paper from "@mui/material/Paper";
// import FormHelperText from "@mui/material/FormHelperText";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import InputLabel from "@mui/material/InputLabel";
// import { useDispatch } from "react-redux";
// import { signUpWithEmailAndPassword } from "app/store/userSlice";
// import { useEffect, useState } from "react";
// import axios from "axios";

// /**
//  * Form Validation Schema
//  */

// const schema = yup.object().shape({
//   displayName: yup.string().required("You must enter a display name"),
//   email: yup
//     .string()
//     .email("You must enter a valid email")
//     .required("You must enter an email"),
//   ph_num_1: yup
//     .string()
//     .matches(/^[0-9]+$/, "Phone number must be only digits")
//     .required("You must enter a phone number"),
//   password: yup
//     .string()
//     .required("Please enter your password.")
//     .min(8, "Password is too short - should be 8 chars minimum."),
//   passwordConfirm: yup
//     .string()
//     .oneOf([yup.ref("password"), null], "Passwords must match"),
//   acceptTermsConditions: yup
//     .boolean()
//     .oneOf([true], "The terms and conditions must be accepted."),
//   role: yup.string().required("You must select who you are"),
// });

// const defaultValues = {
//   displayName: "",
//   email: "",
//   ph_num_1: "",
//   password: "",
//   passwordConfirm: "",
//   acceptTermsConditions: false,
// };

// function SignUpPage() {
//   const navigate = useNavigate();
//   const { control, formState, handleSubmit, reset } = useForm({
//     mode: "onChange",
//     defaultValues,
//     resolver: yupResolver(schema),
//   });
//   const { isValid, dirtyFields, errors } = formState;
//   const [Message, setMessage] = useState(null);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (Message) {
//       const timer = setTimeout(() => {
//         setMessage(null);
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, [Message]);

//   const onSubmit = (data) => {
//     console.log("Form data:", data);
//     const { email, password, displayName } = data;
//     dispatch(signUpWithEmailAndPassword(data)).then(
//       (response) => {
//         if(response.status === 201){
//           navigate("/");
//         }
        
//       }
//     );
//   };

//   return (
//     <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
//       <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
//         <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
//           <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" />

//           <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
//             Sign up
//           </Typography>
//           <div className="flex items-baseline mt-2 font-medium">
//             <Typography>Already have an account?</Typography>
//             <Link className="ml-4" to="/sign-in">
//               Sign in
//             </Link>
//           </div>

//           <form
//             name="registerForm"
//             noValidate
//             className="flex flex-col justify-center w-full mt-32"
//             onSubmit={handleSubmit(onSubmit)}
//           >
//             <Controller
//               name="displayName"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   className="mb-24"
//                   label="Display name"
//                   autoFocus
//                   type="name"
//                   error={!!errors.displayName}
//                   helperText={errors?.displayName?.message}
//                   variant="outlined"
//                   required
//                   fullWidth
//                 />
//               )}
//             />

//             <Controller
//               name="ph_num_1"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   className="mb-24"
//                   label="Phone Number"
//                   type="number"
//                   error={!!errors.ph_num_1}
//                   helperText={errors?.ph_num_1?.message}
//                   variant="outlined"
//                   required
//                   fullWidth
//                 />
//               )}
//             />

//             <Controller
//               name="email"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   className="mb-24"
//                   label="Email"
//                   type="email"
//                   error={!!errors.email}
//                   helperText={errors?.email?.message}
//                   variant="outlined"
//                   required
//                   fullWidth
//                 />
//               )}
//             />
//             <Controller
//               name="password"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   className="mb-24"
//                   label="Password"
//                   type="password"
//                   error={!!errors.password}
//                   helperText={errors?.password?.message}
//                   variant="outlined"
//                   required
//                   fullWidth
//                 />
//               )}
//             />

//             <Controller
//               name="passwordConfirm"
//               control={control}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   className="mb-24"
//                   label="Password (Confirm)"
//                   type="password"
//                   error={!!errors.passwordConfirm}
//                   helperText={errors?.passwordConfirm?.message}
//                   variant="outlined"
//                   required
//                   fullWidth
//                 />
//               )}
//             />

//             <Controller
//               name="acceptTermsConditions"
//               control={control}
//               render={({ field }) => (
//                 <FormControl
//                   className="items-center"
//                   error={!!errors.acceptTermsConditions}
//                 >
//                   <FormControlLabel
//                     label="I agree to the Terms of Service and Privacy Policy"
//                     control={<Checkbox size="small" {...field} />}
//                   />
//                   <FormHelperText>
//                     {errors?.acceptTermsConditions?.message}
//                   </FormHelperText>
//                 </FormControl>
//               )}
//             />

//             <Button
//               variant="contained"
//               color="secondary"
//               className="w-full mt-24"
//               aria-label="Register"
//               disabled={_.isEmpty(dirtyFields) || !isValid}
//               type="submit"
//               size="large"
//             >
//               Create your free account
//             </Button>
//           </form>
//         </div>
//       </Paper>

//       <Box
//         className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
//         sx={{ backgroundColor: "primary.main" }}
//       >
//         <div className="z-10 relative w-full max-w-2xl">
//           <div className="text-7xl font-bold leading-none text-gray-100">
//             <div>Welcome to</div>
//             <div>our community</div>
//           </div>
//           <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
//             Rabit helps developers to build organized and well coded dashboards
//             full of beautiful and rich modules.
//           </div>
//         </div>
//       </Box>

//       {Message && (
//         <Alert
//           sx={{
//             position: "fixed",
//             top: "10px",
//             left: "50%",
//             transform: "translateX(-50%)",
//             width: "300px",
//             backgroundColor: "#dff0d8",
//             border: "1px solid #3c763d",
//             borderRadius: "5px",
//             boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
//           }}
//           severity={Message.includes("failed") ? "error" : "success"}
//         >
//           {Message}
//         </Alert>
//       )}
//     </div>
//   );
// }

// export default SignUpPage;


import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import _ from "lodash";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import FormHelperText from "@mui/material/FormHelperText";
import { useDispatch } from "react-redux";
import { signUpWithEmailAndPassword } from "app/store/userSlice";
import { useEffect, useState } from "react";

const schema = yup.object().shape({
  displayName: yup.string().required("You must enter a display name"),
  email: yup.string().email("You must enter a valid email").required("You must enter an email"),
  ph_num_1: yup.string().matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits").required("You must enter a phone number"),
  ph_num_2: yup.string().matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits").required("You must enter a phone number"),
  password: yup.string().required("Please enter your password.").min(8, "Password is too short - should be 8 chars minimum."),
  passwordConfirm: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
  acceptTermsConditions: yup.boolean().oneOf([true], "The terms and conditions must be accepted."),
  // role: yup.string().required("You must select who you are"),
});

const defaultValues = {
  displayName: "",
  email: "",
  ph_num_1: "",
  ph_num_2: "",
  password: "",
  passwordConfirm: "",
  acceptTermsConditions: false,
};

function SignUpPage() {
  const navigate = useNavigate();
  const { control, formState, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;
  console.log("errors",errors)
  const [Message, setMessage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [Message]);

  const onSubmit = async (data) => {
    console.log("Form submitted with data:", data);
    try {
      const { email, password, displayName, ph_num_1, ph_num_2 } = data;
      const formattedData = {
        ...data,
        ph_num_1: `91${ph_num_1}`,
        ph_num_2: `91${ph_num_2}`,
      };
      const response = await dispatch(signUpWithEmailAndPassword(formattedData));
      console.log("API Response:", response);
      if (response.meta.requestStatus === "fulfilled") {
        navigate("/");
        window.location.reload();
        
        
      }
      
       else {
        setMessage("Sign up failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      setMessage("Sign up failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" />

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Sign up
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Already have an account?</Typography>
            <Link className="ml-4" to="/sign-in">
              Sign in
            </Link>
          </div>

          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="displayName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Display name"
                  autoFocus
                  type="name"
                  error={!!errors.displayName}
                  helperText={errors?.displayName?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="ph_num_1"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Whatsapp Number"
                  type="number"
                  error={!!errors.ph_num_1}
                  helperText={errors?.ph_num_1?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
            <Controller
              name="ph_num_2"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Phone Number"
                  type="number"
                  error={!!errors.ph_num_2}
                  helperText={errors?.ph_num_2?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Password (Confirm)"
                  type="password"
                  error={!!errors.passwordConfirm}
                  helperText={errors?.passwordConfirm?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="acceptTermsConditions"
              control={control}
              render={({ field }) => (
                <FormControl
                  className="items-center"
                  error={!!errors.acceptTermsConditions}
                >
                  <FormControlLabel
                    label="I agree to the Terms of Service and Privacy Policy"
                    control={<Checkbox size="small" {...field} />}
                  />
                  <FormHelperText>
                    {errors?.acceptTermsConditions?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              className="w-full mt-24"
              aria-label="Register"
              // disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Create your free account
            </Button>
          </form>
        </div>
      </Paper>

      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundColor: "primary.main" }}
      >
        <div className="z-10 relative w-full max-w-2xl">
          <div className="text-7xl font-bold leading-none text-gray-100">
            <div>Welcome to</div>
            <div>our community</div>
          </div>
          <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
            Rabit helps developers to build organized and well coded dashboards
            full of beautiful and rich modules.
          </div>
        </div>
      </Box>

      {Message && (
        <Alert
          sx={{
            position: "fixed",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "300px",
            backgroundColor: "#dff0d8",
            border: "1px solid #3c763d",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          }}
          severity={Message.includes("failed") ? "error" : "success"}
        >
          {Message}
        </Alert>
      )}
    </div>
  );
}

export default SignUpPage;

