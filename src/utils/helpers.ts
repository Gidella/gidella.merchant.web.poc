import { APIResponseModel, ResponseModel } from "@/models/auth";
import { MenuItemModel, NavLabelModel } from "@/models/menu";

export const catchActionError = (
    action: () => Promise<APIResponseModel>
  ): Promise<APIResponseModel> => {
    try {
      return action();
    } catch (error) {
      console.error("Error occurred:", error);
      return Promise.resolve({
        status: false,
        data: { message: "Error perfoming request" },
      });
    }
  };

  export const capitalizeFirstLetter = (name: string) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  export const transformToGidellaSubdomain = (name: string) => {
    if (!name) return '';
    return "https://"+name.toLowerCase()+".gidella.site";
  };
  
  export const extractRoutes = (menuItems: (MenuItemModel | NavLabelModel)[]): string[] => {
    return menuItems
      .filter((item): item is MenuItemModel => 'href' in item) // Type guard to filter MenuItemModel
      .map(item => item.href as string); // Cast href as string
  };

  export const formatNaira = (amount: Number) => {
    //code for naira \u20A6
    return `₦${amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  };

  export const generateUniqueId = () => {
    return `${Math.random().toString(36).substr(2, 9)}`;
  }