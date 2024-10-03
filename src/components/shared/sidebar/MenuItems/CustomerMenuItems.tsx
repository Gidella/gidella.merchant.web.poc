import {
    IconMoodHappy,
  } from "@tabler/icons-react";
  
  import { uniqueId } from "lodash";
  
  const CustomerMenuItems = [
    {
      navlabel: true,
      subheader: "Business",
    },
    {
      id: uniqueId(),
      title: "Merchant",
      icon: IconMoodHappy,
      href: "/merchant/create",
    }
  ];
  
  export default CustomerMenuItems;
  