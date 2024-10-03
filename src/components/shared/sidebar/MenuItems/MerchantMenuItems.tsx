import { SidebarItemModel } from "@/models/menu";
import { generateUniqueId } from "@/utils/helpers";
import {
    IconCopy,
    IconLayoutDashboard,
    IconLogin,
    IconMoodHappy,
    IconTypography,
    IconUserPlus,
  } from "@tabler/icons-react";
  
  
  const MerchantMenuItems : SidebarItemModel [] = [
    {
      navlabel: true,
      subheader: "Home",
    },
    {
      id: generateUniqueId(),
      title: "Dashboard",
      icon: IconLayoutDashboard,
      href: "/dashboard/merchant",
    },
    {
      navlabel: true,
      subheader: "Business",
    },
    {
      id: generateUniqueId(),
      title: "Sales",
      icon: IconTypography,
      href: "/sales/merchant",
    },
    {
      id: generateUniqueId(),
      title: "Products",
      icon: IconCopy,
      href: "/products/list",
    },
    {
        id: generateUniqueId(),
        title: "Adverts",
        icon: IconCopy,
        href: "/promotions/merchant",
      },
    {
      navlabel: true,
      subheader: "Payments",
    },
    {
      id: generateUniqueId(),
      title: "Balance",
      icon: IconLogin,
      href: "/payments/balance",
    },
    {
      id: generateUniqueId(),
      title: "Transactions",
      icon: IconUserPlus,
      href: "/payments/transactions",
    },
    {
      navlabel: true,
      subheader: "Profiles",
    },
    {
      id: generateUniqueId(),
      title: "Customers",
      icon: IconMoodHappy,
      href: "/customers/list",
    }
  ];
  
  export default MerchantMenuItems;
  