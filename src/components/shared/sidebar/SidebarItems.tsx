import React from "react";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { useSession } from "next-auth/react";
import AdminMenuItems from "./MenuItems/AdminMenuItems";
import MerchantMenuItems from "./MenuItems/MerchantMenuItems";
import CustomerMenuItems from "./MenuItems/CustomerMenuItems";
import { NavLabelModel, SidebarItemModel } from "@/models/menu";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;

  const { data: session } = useSession();

  function isNavLabelModel(item: SidebarItemModel): item is NavLabelModel {
    return (item as NavLabelModel).navlabel !== undefined;
  }

  if (session) { 
    const { user } = session;
    return (
      <Box sx={{ px: 3 }}>
        <List sx={{ pt: 0 }} className="sidebarNav" component="div">
          { (user.role == 1 || user.role == 2) ? (
            // For Admin role
            AdminMenuItems.map((item: SidebarItemModel) => {
              // {/********SubHeader**********/}
              if (isNavLabelModel(item)) {
                return <NavGroup item={item} key={item.subheader} />;
    
                // {/********If Sub Menu**********/}
                /* eslint no-else-return: "off" */
              } else {
                return (
                  <NavItem
                    item={item}
                    key={item.id}
                    pathDirect={pathDirect}
                    onClick={toggleMobileSidebar}
                  />
                );
              }
            })
          ) : user.role == 3 ? (
            // For Merchant role
            MerchantMenuItems.map((item: SidebarItemModel) => {
              // {/********SubHeader**********/}
              if (isNavLabelModel(item)) {
                return <NavGroup item={item} key={item.subheader} />;
    
                // {/********If Sub Menu**********/}
                /* eslint no-else-return: "off" */
              } else {
                return (
                  <NavItem
                    item={item}
                    key={item.id}
                    pathDirect={pathDirect}
                    onClick={toggleMobileSidebar}
                  />
                );
              }
            })) : (
              // For Customer role
              CustomerMenuItems.map((item) => {
                if (item.subheader) {
                  return <NavGroup item={item} key={item.subheader} />;
                } else {
                  return (
                    <NavItem
                      item={item}
                      key={item.id}
                      pathDirect={pathDirect}
                      onClick={toggleMobileSidebar}
                    />
                  );
                }
              })
            )}
        </List>
      </Box>
    );
  }
}
export default SidebarItems;
