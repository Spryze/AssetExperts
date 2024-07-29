import { useSelector } from 'react-redux';
import RabitScrollbars from '@rabit/core/RabitScrollbars';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { selectContrastMainTheme } from 'app/store/rabit/settingsSlice';
import clsx from 'clsx';

function RabitPageCardedSidebarContent(props) {
  const theme = useTheme();
  const contrastTheme = useSelector(selectContrastMainTheme(theme.palette.primary.main));

  return (
    
    <RabitScrollbars enable={props.innerScroll}>
      {props.header && (
        <ThemeProvider theme={contrastTheme}>
          <div
            className={clsx(
              'RabitPageCarded-sidebarHeader',
              props.variant,
              props.sidebarInner && 'RabitPageCarded-sidebarHeaderInnerSidebar'
            )}
          >
            {props.header}
          </div>
        </ThemeProvider>
      )}

      {props.content && <div className="RabitPageCarded-sidebarContent">{props.content}</div>}
      
    </RabitScrollbars>
  );
}

export default RabitPageCardedSidebarContent;
