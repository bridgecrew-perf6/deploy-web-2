import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useSelector } from "react-redux";

import { SidebarItem, SidebarItemProps } from "./SideBarItem";
import { State } from "../../../redux/reducers";
import { useGlobalStyles } from "../../../styles/global";

export interface SideBarProps {
  items: Array<SidebarItemProps>;
  userRole: string;
  onClose?: () => void;
}
export const SideBar = (props: SideBarProps): JSX.Element => {
  const globalClasses = useGlobalStyles();
  const { status } = useSelector<State>((store) => store.menu) as any;
  const { isLoggedIn } = useSelector<State>((store) => store.auth) as any;
  const theme = useTheme();
  const ref = useRef(false);
  const [open, setOpen] = useState(status);
  useEffect(() => {
    ref.current = status;
  }, [status]);
  const handleDrawerClose = () => {
    setOpen(false);
    if (props.onClose) {
      props.onClose();
    }
  };

  return isLoggedIn ? (
    <div>
      <Drawer
        variant="permanent"
        className={clsx(globalClasses.drawer, {
          [globalClasses.drawerOpen]: ref.current,
          [globalClasses.drawerClose]: !ref.current,
        })}
        classes={{
          paper: clsx({
            [globalClasses.drawerOpen]: ref.current,
            [globalClasses.drawerClose]: !ref.current,
          }),
        }}
      >
        <div className={globalClasses.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon style={{ fill: "#fff" }} />
            ) : (
              <ChevronLeftIcon style={{ fill: "#fff" }} />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {props.items
            // fix item.allowedRoles to be there
            .filter((item) => item.allowedRoles?.includes(props.userRole))
            .map((item) => (
              <SidebarItem {...item} key={item.text}></SidebarItem>
            ))}
        </List>
        <Divider />
      </Drawer>
    </div>
  ) : (
    <span></span>
  );
};
