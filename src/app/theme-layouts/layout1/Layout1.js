import { memo, useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRoutes } from "react-router-dom";
import { selectRabitCurrentLayoutConfig } from "app/store/rabit/settingsSlice";
import { styled } from "@mui/material/styles";
import AppContext from "app/AppContext";
import StickyButtons from "src/app/main/Properties/property-components/StickyButtons";
import FooterLayout1 from "./components/FooterLayout1";
import LeftSideLayout1 from "./components/LeftSideLayout1";
import NavbarWrapperLayout1 from "./components/NavbarWrapperLayout1";
import RabitDialog from "@rabit/core/RabitDialog";
import RabitMessage from "@rabit/core/RabitMessage";
import RabitSuspense from "@rabit/core/RabitSuspense";
import ToolbarLayout1 from "./components/ToolbarLayout1";
import ScrollToTopButton from "src/app/main/Properties/property-components/ScrollToButton";
import { debounce } from "lodash";
const Root = styled("div")(({ theme, config }) => ({
  ...(config.mode === "boxed" && {
    clipPath: "inset(0)",
    maxWidth: `${config.containerWidth}px`,
    margin: "0 auto",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  }),
  ...(config.mode === "container" && {
    "& .container": {
      maxWidth: `${config.containerWidth}px`,
      width: "100%",
      margin: "0 auto",
    },
  }),
}));

function Layout1(props) {
  const config = useSelector(selectRabitCurrentLayoutConfig);
  const appContext = useContext(AppContext);
  const { routes } = appContext;
  const mainContentRef = useRef(null);
  const [showFooter, setShowFooter] = useState(false);

  const debouncedHandleScroll = debounce(() => {
    const { scrollTop, clientHeight, scrollHeight } =
      document.documentElement || document.body;
    if (scrollTop + clientHeight >= scrollHeight - 1) {
      setShowFooter(true);
    } else {
      setShowFooter(false);
    }
  }, 5000);

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [debouncedHandleScroll]);

  return (
    <Root id="rabit-layout" config={config} className="w-full flex">
      {config.leftSidePanel.display && <LeftSideLayout1 />}

      <div className="flex flex-auto min-w-0">
        {config.navbar.display && config.navbar.position === "left" && (
          <NavbarWrapperLayout1 />
        )}

        <main
          ref={mainContentRef}
          id="rabit-main"
          className="flex flex-col flex-auto min-h-full min-w-0 relative z-10 overflow-y-auto"
        >
          {config.toolbar.display && (
            <ToolbarLayout1
              className={config.toolbar.style === "fixed" && "sticky top-0"}
            />
          )}
          <StickyButtons />
          <ScrollToTopButton/>
          <div className="flex flex-col flex-auto min-h-0 relative z-10">
            <RabitDialog />
            <RabitSuspense>{useRoutes(routes)}</RabitSuspense>
            {props.children}
          </div>
          
          {showFooter && config.footer.display && (
            <FooterLayout1 className={config.footer.style === 'fixed' && 'sticky bottom-0'} />
          )}
        </main>

        {config.navbar.display && config.navbar.position === "right" && (
          <NavbarWrapperLayout1 />
        )}
      </div>

      <RabitMessage />
    </Root>
  );
}

export default memo(Layout1);
