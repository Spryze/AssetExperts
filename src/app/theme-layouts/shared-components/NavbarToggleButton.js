import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectRabitCurrentSettings, setDefaultSettings } from 'app/store/rabit/settingsSlice';
import _ from '@lodash';
import useThemeMediaQuery from '@rabit/hooks/useThemeMediaQuery';
import { navbarToggle, navbarToggleMobile } from 'app/store/rabit/navbarSlice';
import RabitSvgIcon from '@rabit/core/RabitSvgIcon';

function NavbarToggleButton(props) {
  const dispatch = useDispatch();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const settings = useSelector(selectRabitCurrentSettings);
  const { config } = settings.layout;

  return (
    <IconButton
      className={props.className}
      color="inherit"
      size="small"
      onClick={(ev) => {
        if (isMobile) {
          dispatch(navbarToggleMobile());
        } else if (config.navbar.style === 'style-2') {
          dispatch(
            setDefaultSettings(
              _.set({}, 'layout.config.navbar.folded', !settings.layout.config.navbar.folded)
            )
          );
        } else {
          dispatch(navbarToggle());
        }
      }}
    >
      {props.children}
    </IconButton>
  );
}

NavbarToggleButton.defaultProps = {
  children: (
    <RabitSvgIcon size={20} color="action">
      heroicons-outline:view-list
    </RabitSvgIcon>
  ),
};

export default NavbarToggleButton;
