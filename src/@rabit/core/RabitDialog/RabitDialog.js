import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeDialog,
  selectRabitDialogOptions,
  selectRabitDialogState,
} from 'app/store/rabit/dialogSlice';

function RabitDialog(props) {
  const dispatch = useDispatch();
  const state = useSelector(selectRabitDialogState);
  const options = useSelector(selectRabitDialogOptions);

  return (
    <Dialog
      open={state}
      onClose={(ev) => dispatch(closeDialog())}
      aria-labelledby="rabit-dialog-title"
      classes={{
        paper: 'rounded-8',
      }}
      {...options}
    />
  );
}

export default RabitDialog;
