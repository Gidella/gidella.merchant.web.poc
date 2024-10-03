
export interface MenuItemModel {
    id: string;
    title: string;
    icon?: React.ComponentType;
    href?: string;
}

export interface NavLabelModel {
    navlabel: true;
    subheader: string;
}

export type SidebarItemModel = MenuItemModel | NavLabelModel;