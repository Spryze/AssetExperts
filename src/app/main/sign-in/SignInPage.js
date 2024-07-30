import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import CircularProgress from '@mui/material/CircularProgress';
import GoogleIcon from '@mui/icons-material/Google';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { signinwithpopup } from 'app/store/userSlice';
import { auth,provider} from './Config'; 
import { signInWithPopup } from 'firebase/auth';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import RabitUtils from '@rabit/utils/RabitUtils';
import Alert from "@mui/material/Alert";
import { useDispatch } from 'react-redux';
import { signInWithEmailPassword } from 'app/store/userSlice';
import googleImage from '../../../assets/Default/branding_guide_do_1.png'
import { useState } from 'react';




/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(4, 'Password is too short - must be at least 4 chars.'),
});

const defaultValues = {
  email: '',
  password: '',
  remember: true,
};


function SignInPage() {
  
const navigate = useNavigate();
 const dispatch = useDispatch();
 const [loading,SetLoading] = useState(false);
  const [message,setMessage]=useState(null);
  const [loginError,setloginError]=useState(false);

  useEffect(() => {
    // authentication()
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, []);
  
  //google signin
  const handleClick = () => {
    console.log("hii")
   dispatch(signinwithpopup({ auth, provider })).then((response)=>{
    console.log(response);
    if(response?.payload.status == 201 || response?.payload.data.message == "user alredy exists"){
      navigate("/");
    }
   });
  };
  
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  // useEffect(() => {
  //   setValue('email', 'admin@rabittheme.com', { shouldDirty: true, shouldValidate: true });
  //   setValue('password', 'admin', { shouldDirty: true, shouldValidate: true });
  // }, [setValue]);
 
  
  async function onSubmit({ email, password }) {
    try {
      SetLoading(true);
       dispatch(signInWithEmailPassword({ email, password })).then(response =>{
        console.log("response of signinin",response)
        SetLoading(false);
        if(response.meta.requestStatus === "fulfilled"){
          navigate("/")
        }else{setloginError(true)}
       });
 
      
      
      
    } catch (error) {
      console.log("Signin", error);
      // Handle error
    }
  }


  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          {/* <img className="w-48" src="assets/images/logo/logo.svg" alt="logo" /> */}

          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Sign in
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Don't have an account?</Typography>
            <Link className="ml-4" to="/sign-up">
              Sign up
            </Link>
          </div>
          {loginError && <Typography sx={{color :"red"}}>Invalid Credentials</Typography>}
          <form
            name="loginForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Email"
                  autoFocus
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

            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
              <Controller
                name="remember"
                control={control}
                render={({ field }) => (
                  <FormControl>
                    <FormControlLabel
                      label="Remember me"
                      control={<Checkbox size="small" {...field} />}
                    />
                  </FormControl>
                )}
              />

              <Link className="text-md font-medium" to="/forgetPassword">
                Forgot password?
              </Link>
            </div>

            <Button
              variant="contained"
              // color="secondary"
              className=" w-full mt-16"
              aria-label="Sign in"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Sign in
            </Button>
           { loading && <div style={{display:"flex",justifyContent:"center", marginTop:"10px"}}><CircularProgress /></div>}

            <div className="flex items-center mt-32">
              <div className="flex-auto mt-px border-t" />
              <Typography className="mx-8" color="text.secondary">
                Or continue with
              </Typography>
              <div className="flex-auto mt-px border-t" />
            </div>

            <div className="flex items-center mt-32 space-x-16">
              {/* <Button variant="outlined" className="flex-auto">
                <RabitSvgIcon size={20} color="action">
                  feather:facebook
                </RabitSvgIcon>
              </Button>
              <Button variant="outlined" className="flex-auto">
                <RabitSvgIcon size={20} color="action">
                  feather:twitter
                </RabitSvgIcon>
              </Button>
              <Button variant="outlined" className="flex-auto">
                <RabitSvgIcon size={20} color="action">
                  feather:github
                </RabitSvgIcon>
              </Button> */}
              <Button onClick={handleClick} sx={{fontWeight:"bold"}} variant="outlined" className="flex-auto">
                {/* <RabitSvgIcon size={20} color="action"> */}
                <GoogleIcon sx={{margin:"0px 10px"}}/> SignIn with Google
               
                {/* </RabitSvgIcon> */}
              </Button>
            </div>
          </form>
        </div>
      </Paper>

      <Box
        className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
        sx={{ backgroundColor: 'primary.main' }}
      >


        <div className="z-10 relative w-full max-w-2xl">
          <div className="text-7xl font-bold leading-none text-gray-100">
            <div>Welcome to</div>
            <div>our community</div>
          </div>
          <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
            Rabit helps developers to build organized and well coded dashboards full of beautiful and
            rich modules. Join us and start building your application today.
          </div>

        </div>
      </Box>
      {message && (
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
          severity={message.includes("failed") ? "error" : "success"}
        >
          {message}
        </Alert>
      )}
    </div>
  );
}

export default SignInPage;
