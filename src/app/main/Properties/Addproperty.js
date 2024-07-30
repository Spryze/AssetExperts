// import * as React from "react";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Form from "./MultiStepForm/Form";
// import { useSelector } from "react-redux";
// import { selectUser } from "app/store/userSlice";
// import { Paper } from "@mui/material";
// const Addproperty = (propertyData) => {
// const user = useSelector(selectUser);
// console.log("user",user)

//   return (
//     <Container
//       sx={{
//         position: "absolute",
//         left: "20px",
//         top: "20px",
//         background: "white",
//       }}
//     >
//       {user?.role === "guest" && (<div className="flex flex-col flex-auto items-center sm:justify-center min-w-0">
//         <Paper className="flex items-center w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
//           <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
//             <img
//               className="w-48 mx-auto"
//               src="assets/images/logo/logo.svg"
//               alt="logo"
//             />

//             <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight text-center">
//               You have signed out!
//             </Typography>
//           </div>
//         </Paper>
//       </div>)}

//       <Form propertyData={propertyData} />
//     </Container>
//   );
// };

// export default Addproperty;


import * as React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Form from "./MultiStepForm/Form";
import { useSelector } from "react-redux";
import { selectUser } from "app/store/userSlice";
import { Paper } from "@mui/material";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { ResetIndividualPropertState, resetProperty } from "./PropertySlice1";

const AddProperty = (propertyData) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  console.log("user", user);
  useEffect(() => {
    // Dispatch the action when the component mounts
    dispatch(resetProperty());
  }, [dispatch]);

  return (
    <Container
      sx={{
        // position: "absolute",
        left: "20px",
        top: "20px",
        
        // background: "white",
      }}
    >
      {user?.role === "guest" ? (
        <div className="flex flex-col flex-auto items-center sm:justify-center min-w-0" >
          <Paper className="flex items-center w-full sm:w-auto min-h-full sm:min-h-auto rounded-0 py-32 px-16 sm:p-48 sm:rounded-2xl sm:shadow">
            <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
              <img
                className="w-48 mx-auto"
                src="assets/images/logo/logo.svg"
                alt="logo"
              />
             <Link to="/sign-in" className="block mt-32 text-4xl font-extrabold tracking-tight leading-tight text-center">
  Please Login!
</Link>
            </div>
          </Paper>
        </div>
      ) : 
        <Form  />
      }
      {/* <Form propertyData={propertyData} /> */}
    </Container>
  );
};

export default AddProperty;
