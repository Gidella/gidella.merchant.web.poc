import { useMediaQuery, Box, Drawer } from "@mui/material";
import SidebarItems from "./SidebarItems";
// import { Upgrade } from "./Updrade";
import { Sidebar } from 'react-mui-sidebar';
import Image from "next/image";

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const MSidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: ItemType) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));

  const sidebarWidth = "270px";

  // Custom CSS for short scrollbar
  const scrollbarStyles = {
    '&::-webkit-scrollbar': {
      width: '7px',

    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#eff2f7',
      borderRadius: '15px',
    },
  };


  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              boxSizing: "border-box",
              ...scrollbarStyles,
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: "100%",
            }}
          >
            <Sidebar
              width={'270px'}
              collapsewidth="80px"
              open={isSidebarOpen}
              themeColor="#5d87ff"
              themeSecondaryColor="#49beff"
              showProfile={false}
            >
              {/* ------------------------------------------- */}
              {/* Logo */}
              {/* ------------------------------------------- */}
              <Box sx={{ pt: 2, pr: 0, pb: 0, pl:4 }}> {/* p adds padding, 2 means 16px (MUI uses an 8px scale) */}
                <Image
                  src="/images/logos/gidella_logo.png"
                  alt="logo"
                  height={45}
                  width={154}
                  priority
                />
              </Box>
              <Box>
                {/* ------------------------------------------- */}
                {/* Sidebar Items */}
                {/* ------------------------------------------- */}
                <SidebarItems />
                {/* <Upgrade /> */}
              </Box>
            </Sidebar >
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          boxShadow: (theme) => theme.shadows[8],
          ...scrollbarStyles,
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Sidebar Box */}
      {/* ------------------------------------------- */}
      <Box px={2}>
        <Sidebar
          width={'270px'}
          collapsewidth="80px"
          isCollapse={false}
          mode="light"
          direction="ltr"
          themeColor="#5d87ff"
          themeSecondaryColor="#49beff"
          showProfile={false}
        >
          {/* ------------------------------------------- */}
          {/* Logo */}
          {/* ------------------------------------------- */}
          <Box sx={{ pt: 2, pr: 0, pb: 0, pl:4 }}> {/* p adds padding, 2 means 16px (MUI uses an 8px scale) */}
            <Image
              src="/images/logos/gidella_logo.png"
              alt="logo"
              height={45}
              width={154}
              priority
            />
          </Box>
          {/* ------------------------------------------- */}
          {/* Sidebar Items */}
          {/* ------------------------------------------- */}
          <SidebarItems />
          {/* <Upgrade /> */}
        </Sidebar>
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}

    </Drawer>
  );
};

export default MSidebar;





