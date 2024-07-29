import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

// Reusable Dropdown Component
const Dropdown = ({ label, options, value, onChange }) => {
  return (
    <div style={{display:"flex",alignItems:"center"}}>
    <ManageAccountsIcon sx={{marginRight:"18px"}}/>
    <Box sx={{ width: "100px" }}>
      <FormControl fullWidth>
        <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-select-label`}
          id={`${label}-select`}
          value={value}
          label={label}
          onChange={onChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    </div>
  );
};


const ManageMenu = () => {
  const [selectedRoute, setSelectedRoute] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedRoute(selectedValue);
    if (selectedValue) {
      navigate(selectedValue);
    }
    setSelectedRoute(null);
  };

  const routeOptions = [
 
    { value: '/route1', label: 'User' },
    { value: '/MyProperties', label: 'Properties' },
  ];

  return (
    <div style={{margin:"0 0 0 28px"}}>
      <Dropdown
        label="Manage"
        options={routeOptions}
        value={selectedRoute}
        onChange={handleChange}
      />
    </div>
  );
};

export default ManageMenu;
