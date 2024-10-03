import { SidebarItemModel } from "@/models/menu";
import { generateUniqueId } from "@/utils/helpers";
import {
    IconAperture,
    IconCopy,
    IconLayoutDashboard,
    IconLogin,
    IconMoodHappy,
    IconTypography,
    IconUserPlus,
  } from "@tabler/icons-react";

  
  const AdminMenuItems: SidebarItemModel [] = [
    {
      navlabel: true,
      subheader: "Home",
    },
    {
      id: generateUniqueId(),
      title: "Dashboard",
      icon: IconLayoutDashboard,
      href: "/dashboard/admin",
    },
    {
      navlabel: true,
      subheader: "Business",
    },
    {
      id: generateUniqueId(),
      title: "Sales",
      icon: IconTypography,
      href: "/sales/admin",
    },
    {
      id: generateUniqueId(),
      title: "Adverts",
      icon: IconCopy,
      href: "/promotions/admin",
    },
    {
      navlabel: true,
      subheader: "Payments",
    },
    {
      id: generateUniqueId(),
      title: "Balance",
      icon: IconLogin,
      href: "/payments/balance-overview",
    },
    {
      id: generateUniqueId(),
      title: "Transactions",
      icon: IconUserPlus,
      href: "/payments/all-transactions",
    },
    {
      navlabel: true,
      subheader: "Profiles",
    },
    {
      id: generateUniqueId(),
      title: "Admin Users",
      icon: IconMoodHappy,
      href: "/admin/list",
    },
    {
      id: generateUniqueId(),
      title: "Merchants",
      icon: IconAperture,
      href: "/merchants/list",
    },
  ];
  
  export default AdminMenuItems;
  