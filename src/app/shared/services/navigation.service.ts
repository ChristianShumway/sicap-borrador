import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

interface IMenuItem {
  id: string;
  type: string; // Possible values: link/dropDown/icon/separator/extLink
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  id: string;
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

interface Permisos {
  id: string;
  idPerfil: string;
  nombrePerfil: string;
  idModulo: string;
  autorizado: boolean;
}

@Injectable()
export class NavigationService {
  constructor() {}
  iconMenu: IMenuItem[] = [
    {
      id: "1",
      name: "HOME",
      type: "icon",
      tooltip: "Home",
      icon: "home",
      state: "dashboard"
    },
    {
      id: "2",
      name: "PROFILE",
      type: "icon",
      tooltip: "Perfil",
      icon: "person",
      state: "profile/overview"
    },
    {
      id: "3",
      name: "TOUR",
      type: "icon",
      tooltip: "Tour",
      icon: "flight_takeoff",
      state: "tour"
    },
    {
      id: "4",
      type: "separator",
      name: "Menú"
    },
    {
      id: "5",
      name: 'CATÁLOGOS',
      type: 'dropDown',
      tooltip: 'Catálogos',
      icon: "chrome_reader_mode",
      sub:[
        {
          id: "30",
          name: 'ADMINISTRATIVOS',
          type: 'dropDown',
          sub:[
            { id: "91", name: "Usuarios", state: "catalogos-administrativos/usuarios" },
            { id: "92", name: "Empresas", state: "catalogos-administrativos/empresas" },
            { id: "93", name: "Perfiles", state: "catalogos-administrativos/perfiles" },
            { id: "94", name: "Permisos", state: "catalogos-administrativos/permisos" },
          ]         
        },
        {
          id: "31",
          name: 'OBRA',
          type: 'dropDown',
          sub:[
          ]         
        }
      ]
    },
    {
      id: "6",
      name: "DASHBOARD",
      type: "dropDown",
      tooltip: "Dashboard",
      icon: "dashboard",
      state: "dashboard",
      sub: [
        { id: "32", name: "Default", state: "default" },
        { id: "33", name: "Analytics", state: "analytics" },
        { id: "34", name: "Cryptocurrency", state: "crypto" },
        { id: "35", name: "Dark Cards", state: "dark" }
      ]
    },
    {
      id: "7",
      name: "CRUD Table",
      type: "link",
      tooltip: "CRUD Table",
      icon: "format_list_bulleted",
      state: "cruds/ngx-table"
    },
    {
      id: "8",
      name: "ECOMMERCE",
      type: "dropDown",
      tooltip: "Shop",
      icon: "shopping_cart",
      state: "shop",
      sub: [
        { id: "36", name: "PRODUCTS", state: "" },
        { id: "37", name: "PRODUCT DETAILS", state: "products/5a9ae2106f155194e5c95d67" },
        { id: "38", name: "CART", state: "cart" },
        { id: "39", name: "CHECKOUT", state: "checkout" }
      ]
    },
    {
      id: "9",
      name: "INBOX",
      type: "link",
      tooltip: "Inbox",
      icon: "inbox",
      state: "inbox",
      badges: [{ color: "primary", value: "4" }]
    },
    {
      id: "10",
      name: "Invoice",
      type: "link",
      icon: "receipt",
      state: "invoice/list"
    },
    {
      id: "11",
      name: "CHAT",
      type: "link",
      tooltip: "Chat",
      icon: "chat",
      state: "chat",
      badges: [{ color: "warn", value: "1" }]
    },
    {
      id: "12",
      name: "CALENDAR",
      type: "link",
      tooltip: "Calendar",
      icon: "date_range",
      state: "calendar"
    },
    {
      id: "13",
      name: "Todo",
      type: "link",
      tooltip: "Todo",
      icon: "center_focus_strong",
      state: "todo/list"
    },
    {
      id: "14",
      name: "DIALOGS",
      type: "dropDown",
      tooltip: "Dialogs",
      icon: "filter_none",
      state: "dialogs",
      sub: [
        { id: "40", name: "CONFIRM", state: "confirm" },
        { id: "41", name: "LOADER", state: "loader" }
      ]
    },
    {
      id: "15",
      name: "Material Kits",
      type: "dropDown",
      tooltip: "Material",
      icon: "favorite",
      state: "material",
      badges: [{ color: "primary", value: "60+" }],
      sub: [
        {
          id: "42",
          name: "Form controls",
          type: "dropDown",
          sub: [
            { id: "95", name: "Autocomplete", state: "autocomplete" },
            { id: "96", name: "Checkbox", state: "checkbox" },
            { id: "97", name: "Datepicker", state: "datepicker" },
            { id: "98", name: "Form Field", state: "form-field" },
            { id: "99", name: "Input Field", state: "input-field" },
            { id: "100", name: "Radio Button", state: "radio-button" },
            { id: "101", name: "Select", state: "select" },
            { id: "102", name: "Slider", state: "slider" },
            { id: "103", name: "Slider Toggle", state: "slider-toggle" }
          ]
        },
        {
          id: "43",
          name: "Navigation",
          type: "dropDown",
          sub: [
            {  id: "104", name: "Menu", state: "menu" },
            {  id: "105", name: "Sidenav", state: "sidenav" },
            {  id: "106", name: "Toolbar", state: "toolbar" }
          ]
        },
        {
          id: "44",
          name: "Layout",
          type: "dropDown",
          sub: [
            {  id: "107", name: "Card", state: "card" },
            {  id: "108", name: "Divider", state: "divider" },
            {  id: "109", name: "Expansion Panel", state: "expansion-panel" },
            {  id: "110", name: "Grid", state: "grid" },
            {  id: "111", name: "List", state: "list" },
            {  id: "112", name: "Stepper", state: "stepper" },
            {  id: "113", name: "Tab", state: "tab-group" },
            {  id: "114", name: "Tree", state: "tree" }
          ]
        },
        {
          id: "45",
          name: "Buttons & Indicators",
          type: "dropDown",
          sub: [
            {  id: "115", name: "BUTTONS", state: "buttons" },
            {  id: "116", name: "Button Toggle", state: "button-toggle" },
            {  id: "117", name: "Badge", state: "badge" },
            {  id: "118", name: "Chips", state: "chips" },
            {  id: "119", name: "Icons", state: "icons" },
            {  id: "120", name: "Progress Spinner", state: "progress-spinner" },
            {  id: "121", name: "Progress Bar", state: "progress-bar" },
            {  id: "122", name: "Ripples", state: "ripples" }
          ]
        },
        {
          id: "46",
          name: "Popups & Modals",
          type: "dropDown",
          sub: [
            {  id: "123", name: "Tooltip", state: "tooltip" },
            {  id: "124", name: "Bottom Sheet", state: "bottom-sheet" },
            {  id: "125", name: "Dialog", state: "dialog" },
            {  id: "126", name: "Snackbar", state: "snackbar" }
          ]
        },
        {
          id: "47",
          name: "Data Table",
          type: "dropDown",
          sub: [
            { id: "127", name: "paginator", state: "paginator" },
            { id: "128", name: "Sort Header", state: "sort-header" },
            { id: "129", name: "Table", state: "table" }
          ]
        },
        { id: "48", name: "Buttons Loading", state: "loading-buttons" }
      ]
    },
    {
      id: "16",
      name: "FORMS",
      type: "dropDown",
      tooltip: "Forms",
      icon: "description",
      state: "forms",
      sub: [
        { id: "49", name: "BASIC", state: "basic" },
        { id: "50", name: "EDITOR", state: "editor" },
        { id: "51", name: "UPLOAD", state: "upload" },
        { id: "52", name: "WIZARD", state: "wizard" }
      ]
    },
    {
      id: "17",
      name: "TABLES",
      type: "dropDown",
      tooltip: "Tables",
      icon: "format_line_spacing",
      state: "tables",
      sub: [
        { id: "53", name: "FULLSCREEN", state: "fullscreen" },
        { id: "54", name: "PAGING", state: "paging" },
        { id: "55", name: "FILTER", state: "filter" },
        { id: "56", name: "Material Table", state: "mat-table" }
      ]
    },
    {
      id: "18",
      name: "PROFILE",
      type: "dropDown",
      tooltip: "Profile",
      icon: "person",
      state: "profile",
      badges: [{ color: "primary", value: "2" }],
      sub: [
        { id: "57",name: "OVERVIEW", state: "overview" },
        { id: "58",name: "SETTINGS", state: "settings" },
        { id: "59",name: "BLANK", state: "blank" }
      ]
    },
    {
      id: "19",
      name: "TOUR",
      type: "link",
      tooltip: "Tour",
      icon: "flight_takeoff",
      state: "tour"
    },
    {
      id: "20",
      name: "MAP",
      type: "link",
      tooltip: "Map",
      icon: "add_location",
      state: "map"
    },
    {
      id: "21",
      name: "CHARTS",
      type: "dropDown",
      tooltip: "Charts",
      icon: "show_chart",
      sub: [
        {
          id: "60",
          name: "eChart",
          type: "dropDown",
          state: "chart",
          sub: [
            {  id: "130", name: "Pie", state: "pie" },
            {  id: "131", name: "Bar", state: "bar" },
            {  id: "132", name: "Radar", state: "radar" },
            {  id: "133", name: "Heatmap", state: "heatmap" },
          ]
        },
        { id: "61", name: "Chart js", state: "charts" }
      ]
    },
    // {
    //   name: "CHARTS",
    //   type: "link",
    //   tooltip: "Charts",
    //   icon: "show_chart",
    //   state: "charts"
    // },
    {
      id: "22",
      name: "DND",
      type: "link",
      tooltip: "Drag and Drop",
      icon: "adjust",
      state: "dragndrop"
    },
    {
      id: "23",
      name: "Page Layouts",
      type: "dropDown",
      icon: "view_carousel",
      state: "page-layouts",
      sub: [
        { id: "62", name: "Left sidebar card", state: "left-sidebar-card" },
        { id: "63", name: "Right sidebar card", state: "right-sidebar-card" },
        { id: "64", name: "Full width card", state: "full-width-card" },
        { id: "65", name: "Full width card tab", state: "full-width-card-tab" },
        { id: "66", name: "Full width plain", state: "full-width-plain" },
        { id: "67", name: "Left sidebar plain", state: "left-sidebar-plain" }
      ]
    },
    {
      id: "24",
      name: "SESSIONS",
      type: "dropDown",
      tooltip: "Pages",
      icon: "view_carousel",
      state: "sessions",
      sub: [
        { id: "68", name: "SIGNUP", state: "signup" },
        { id: "69", name: "Signup 2", state: "signup2" },
        { id: "70", name: "Signup 3", state: "signup3" },
        { id: "71", name: "Signup 4", state: "signup4" },
        { id: "72", name: "SIGNIN", state: "signin" },
        { id: "73", name: "Signin 2", state: "signin2" },
        { id: "74", name: "Signin 3", state: "signin3" },
        { id: "75", name: "Signin 4", state: "signin4" },
        { id: "76", name: "FORGOT", state: "forgot-password" },
        { id: "77", name: "LOCKSCREEN", state: "lockscreen" },
        { id: "78", name: "NOTFOUND", state: "404" },
        { id: "79", name: "ERROR", state: "error" }
      ]
    },
    {
      id: "25",
      name: "Utilities",
      type: "dropDown",
      icon: "format_list_bulleted",
      state: "utilities",
      sub: [
        { id: "80", name: "Border", state: "border" },
        { id: "81", name: "Color", state: "color" },
        { id: "82", name: "Spacing", state: "spacing" },
        { id: "83", name: "Typography", state: "typography" }
      ]
    },
    {
      id: "26",
      name: "OTHERS",
      type: "dropDown",
      tooltip: "Others",
      icon: "blur_on",
      state: "others",
      sub: [
        { id: "84", name: "GALLERY", state: "gallery" },
        { id: "85", name: "PRICINGS", state: "pricing" },
        { id: "86", name: "USERS", state: "users" },
        { id: "87", name: "BLANK", state: "blank" }
      ]
    },
    {
      id: "27",
      name: "MATICONS",
      type: "link",
      tooltip: "Material Icons",
      icon: "store",
      state: "icons"
    },
    {
      id: "28",
      name: "Multi Level",
      type: "dropDown",
      tooltip: "Multi Level",
      icon: "format_align_center",
      state: "",
      sub: [
        {
          id: "88",
          name: "Level Two",
          type: "dropDown",
          state: "fake-1",
          sub: [
            {  id: "134", name: "Level Three", state: "fake-2" },
            {  id: "135" ,name: "Level Three", state: "fake-3" }
          ]
        },
        { id: "89", name: "Level Two", state: "fake-4" },
        { id: "90", name: "Level Two", state: "fake-5" }
      ]
    },
    {
      id: "29",
      name: "DOC",
      type: "extLink",
      tooltip: "Documentation",
      icon: "library_books",
      state: "http://demos.ui-lib.com/egret-doc/"
    }
  ];

  permisosMenu: Permisos[] = [
    { id: '1', idPerfil: '1', nombrePerfil: 'Gerencia', idModulo: '5', autorizado: true },
    { id: '2', idPerfil: '1', nombrePerfil: 'Gerencia', idModulo: '30', autorizado: true },
    { id: '3', idPerfil: '1', nombrePerfil: 'Gerencia', idModulo: '31', autorizado: true },
    { id: '4', idPerfil: '1', nombrePerfil: 'Gerencia', idModulo: '91', autorizado: true },
    { id: '5', idPerfil: '1', nombrePerfil: 'Gerencia', idModulo: '92', autorizado: true },
    { id: '6', idPerfil: '1', nombrePerfil: 'Gerencia', idModulo: '93', autorizado: true },
    { id: '7', idPerfil: '1', nombrePerfil: 'Gerencia', idModulo: '94', autorizado: true },
  ];

  // separatorMenu: IMenuItem[] = [
  //   {
  //     id: "1",
  //     type: "separator",
  //     name: "Custom components"
  //   },
  //   {
  //     id: "2",
  //     name: "DASHBOARD",
  //     type: "link",
  //     tooltip: "Dashboard",
  //     icon: "dashboard",
  //     state: "dashboard"
  //   },
  //   {
  //     id: "3",
  //     name: "INBOX",
  //     type: "link",
  //     tooltip: "Inbox",
  //     icon: "inbox",
  //     state: "inbox"
  //   },
  //   {
  //     id: "4",
  //     name: "CHAT",
  //     type: "link",
  //     tooltip: "Chat",
  //     icon: "chat",
  //     state: "chat"
  //   },
  //   {
  //     id: "5",
  //     name: "CRUD Table",
  //     type: "link",
  //     tooltip: "CRUD Table",
  //     icon: "format_list_bulleted",
  //     state: "cruds/ngx-table"
  //   },
  //   {
  //     id: "6",
  //     name: "DIALOGS",
  //     type: "dropDown",
  //     tooltip: "Dialogs",
  //     icon: "filter_none",
  //     state: "dialogs",
  //     sub: [
  //       { name: "CONFIRM", state: "confirm" },
  //       { name: "LOADER", state: "loader" }
  //     ]
  //   },
  //   {
  //     id: "7",
  //     name: "PROFILE",
  //     type: "dropDown",
  //     tooltip: "Profile",
  //     icon: "person",
  //     state: "profile",
  //     sub: [
  //       { name: "OVERVIEW", state: "overview" },
  //       { name: "SETTINGS", state: "settings" },
  //       { name: "BLANK", state: "blank" }
  //     ]
  //   },
  //   {
  //     id: "8",
  //     name: "TOUR",
  //     type: "link",
  //     tooltip: "Tour",
  //     icon: "flight_takeoff",
  //     state: "tour"
  //   },
  //   {
  //     id: "9",
  //     type: "separator",
  //     name: "Integrated components"
  //   },
  //   {
  //     id: "10",
  //     name: "CALENDAR",
  //     type: "link",
  //     tooltip: "Calendar",
  //     icon: "date_range",
  //     state: "calendar"
  //   },
  //   {
  //     id: "11",
  //     name: "MATERIAL",
  //     type: "dropDown",
  //     tooltip: "Material",
  //     icon: "favorite",
  //     state: "material",
  //     sub: [
  //       { name: "BUTTONS", state: "buttons" },
  //       { name: "Button Toggle", state: "button-toggle" },
  //       { name: "Buttons Loading", state: "loading-buttons" },
  //       { name: "CARDS", state: "cards" },
  //       { name: "GRIDS", state: "grids" },
  //       { name: "LISTS", state: "lists" },
  //       { name: "MENU", state: "menu" },
  //       { name: "TABS", state: "tabs" },
  //       { name: "SELECT", state: "select" },
  //       { name: "RADIO", state: "radio" },
  //       { name: "AUTOCOMPLETE", state: "autocomplete" },
  //       { name: "SLIDER", state: "slider" },
  //       { name: "PROGRESS", state: "progress" },
  //       { name: "SNACKBAR", state: "snackbar" }
  //     ]
  //   },
  //   {
  //     id: "12",
  //     name: "FORMS",
  //     type: "dropDown",
  //     tooltip: "Forms",
  //     icon: "description",
  //     state: "forms",
  //     sub: [
  //       { name: "BASIC", state: "basic" },
  //       { name: "EDITOR", state: "editor" },
  //       { name: "UPLOAD", state: "upload" },
  //       { name: "WIZARD", state: "wizard" }
  //     ]
  //   },
  //   {
  //     id: "13",
  //     name: "TABLES",
  //     type: "dropDown",
  //     tooltip: "Tables",
  //     icon: "format_line_spacing",
  //     state: "tables",
  //     sub: [
  //       { name: "FULLSCREEN", state: "fullscreen" },
  //       { name: "PAGING", state: "paging" },
  //       { name: "FILTER", state: "filter" }
  //     ]
  //   },
  //   {
  //     id: "14",
  //     name: "MAP",
  //     type: "link",
  //     tooltip: "Map",
  //     icon: "add_location",
  //     state: "map"
  //   },
  //   {
  //     id: "15",
  //     name: "CHARTS",
  //     type: "link",
  //     tooltip: "Charts",
  //     icon: "show_chart",
  //     state: "charts"
  //   },
  //   {
  //     id: "16",
  //     name: "DND",
  //     type: "link",
  //     tooltip: "Drag and Drop",
  //     icon: "adjust",
  //     state: "dragndrop"
  //   },
  //   {
  //     id: "17",
  //     type: "separator",
  //     name: "Other components"
  //   },
  //   {
  //     id: "18",
  //     name: "SESSIONS",
  //     type: "dropDown",
  //     tooltip: "Pages",
  //     icon: "view_carousel",
  //     state: "sessions",
  //     sub: [
  //       { name: "SIGNUP", state: "signup" },
  //       { name: "SIGNIN", state: "signin" },
  //       { name: "FORGOT", state: "forgot-password" },
  //       { name: "LOCKSCREEN", state: "lockscreen" },
  //       { name: "NOTFOUND", state: "404" },
  //       { name: "ERROR", state: "error" }
  //     ]
  //   },
  //   {
  //     id: "19",
  //     name: "OTHERS",
  //     type: "dropDown",
  //     tooltip: "Others",
  //     icon: "blur_on",
  //     state: "others",
  //     sub: [
  //       { name: "GALLERY", state: "gallery" },
  //       { name: "PRICINGS", state: "pricing" },
  //       { name: "USERS", state: "users" },
  //       { name: "BLANK", state: "blank" }
  //     ]
  //   },
  //   {
  //     id: "20",
  //     name: "MATICONS",
  //     type: "link",
  //     tooltip: "Material Icons",
  //     icon: "store",
  //     state: "icons"
  //   },
  //   {
  //     id: "21",
  //     name: "DOC",
  //     type: "extLink",
  //     tooltip: "Documentation",
  //     icon: "library_books",
  //     state: "http://demos.ui-lib.com/egret-doc/"
  //   }
  // ];

  // plainMenu: IMenuItem[] = [
  //   {
  //     id: "1",
  //     name: "DASHBOARD",
  //     type: "link",
  //     tooltip: "Dashboard",
  //     icon: "dashboard",
  //     state: "dashboard"
  //   },
  //   {
  //     id: "2",
  //     name: "INBOX",
  //     type: "link",
  //     tooltip: "Inbox",
  //     icon: "inbox",
  //     state: "inbox"
  //   },
  //   {
  //     id: "3",
  //     name: "CHAT",
  //     type: "link",
  //     tooltip: "Chat",
  //     icon: "chat",
  //     state: "chat"
  //   },
  //   {
  //     id: "4",
  //     name: "CRUD Table",
  //     type: "link",
  //     tooltip: "CRUD Table",
  //     icon: "format_list_bulleted",
  //     state: "cruds/ngx-table"
  //   },
  //   {
  //     id: "5",
  //     name: "CALENDAR",
  //     type: "link",
  //     tooltip: "Calendar",
  //     icon: "date_range",
  //     state: "calendar"
  //   },
  //   {
  //     id: "6",
  //     name: "DIALOGS",
  //     type: "dropDown",
  //     tooltip: "Dialogs",
  //     icon: "filter_none",
  //     state: "dialogs",
  //     sub: [
  //       { name: "CONFIRM", state: "confirm" },
  //       { name: "LOADER", state: "loader" }
  //     ]
  //   },
  //   {
  //     id: "7",
  //     name: "MATERIAL",
  //     type: "dropDown",
  //     icon: "favorite",
  //     state: "component",
  //     sub: [
  //       { name: "BUTTONS", state: "buttons" },
  //       { name: "Button Toggle", state: "button-toggle" },
  //       { name: "Buttons Loading", state: "loading-buttons" },
  //       { name: "CARDS", state: "cards" },
  //       { name: "GRIDS", state: "grids" },
  //       { name: "LISTS", state: "lists" },
  //       { name: "MENU", state: "menu" },
  //       { name: "TABS", state: "tabs" },
  //       { name: "SELECT", state: "select" },
  //       { name: "RADIO", state: "radio" },
  //       { name: "AUTOCOMPLETE", state: "autocomplete" },
  //       { name: "SLIDER", state: "slider" },
  //       { name: "PROGRESS", state: "progress" },
  //       { name: "SNACKBAR", state: "snackbar" }
  //     ]
  //   },
  //   {
  //     id: "8",
  //     name: "FORMS",
  //     type: "dropDown",
  //     tooltip: "Forms",
  //     icon: "description",
  //     state: "forms",
  //     sub: [
  //       { name: "BASIC", state: "basic" },
  //       { name: "EDITOR", state: "editor" },
  //       { name: "UPLOAD", state: "upload" },
  //       { name: "WIZARD", state: "wizard" }
  //     ]
  //   },
  //   {
  //     id: "9",
  //     name: "TABLES",
  //     type: "dropDown",
  //     tooltip: "Tables",
  //     icon: "format_line_spacing",
  //     state: "tables",
  //     sub: [
  //       { name: "FULLSCREEN", state: "fullscreen" },
  //       { name: "PAGING", state: "paging" },
  //       { name: "FILTER", state: "filter" }
  //     ]
  //   },
  //   {
  //     id: "10",
  //     name: "PROFILE",
  //     type: "dropDown",
  //     tooltip: "Profile",
  //     icon: "person",
  //     state: "profile",
  //     sub: [
  //       { name: "OVERVIEW", state: "overview" },
  //       { name: "SETTINGS", state: "settings" },
  //       { name: "BLANK", state: "blank" }
  //     ]
  //   },
  //   {
  //     id: "11",
  //     name: "TOUR",
  //     type: "link",
  //     tooltip: "Tour",
  //     icon: "flight_takeoff",
  //     state: "tour"
  //   },
  //   {
  //     id: "12",
  //     name: "MAP",
  //     type: "link",
  //     tooltip: "Map",
  //     icon: "add_location",
  //     state: "map"
  //   },
  //   {
  //     id: "13",
  //     name: "CHARTS",
  //     type: "link",
  //     tooltip: "Charts",
  //     icon: "show_chart",
  //     state: "charts"
  //   },
  //   {
  //     id: "14",
  //     name: "DND",
  //     type: "link",
  //     tooltip: "Drag and Drop",
  //     icon: "adjust",
  //     state: "dragndrop"
  //   },
  //   {
  //     id: "15",
  //     name: "SESSIONS",
  //     type: "dropDown",
  //     tooltip: "Pages",
  //     icon: "view_carousel",
  //     state: "sessions",
  //     sub: [
  //       { name: "SIGNUP", state: "signup" },
  //       { name: "SIGNIN", state: "signin" },
  //       { name: "FORGOT", state: "forgot-password" },
  //       { name: "LOCKSCREEN", state: "lockscreen" },
  //       { name: "NOTFOUND", state: "404" },
  //       { name: "ERROR", state: "error" }
  //     ]
  //   },
  //   {
  //     id: "16",
  //     name: "OTHERS",
  //     type: "dropDown",
  //     tooltip: "Others",
  //     icon: "blur_on",
  //     state: "others",
  //     sub: [
  //       { name: "GALLERY", state: "gallery" },
  //       { name: "PRICINGS", state: "pricing" },
  //       { name: "USERS", state: "users" },
  //       { name: "BLANK", state: "blank" }
  //     ]
  //   },
  //   {
  //     id: "17",
  //     name: "MATICONS",
  //     type: "link",
  //     tooltip: "Material Icons",
  //     icon: "store",
  //     state: "icons"
  //   },
  //   {
  //     id: "18",
  //     name: "DOC",
  //     type: "extLink",
  //     tooltip: "Documentation",
  //     icon: "library_books",
  //     state: "http://demos.ui-lib.com/egret-doc/"
  //   }
  // ];

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle: string = "";
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  publishNavigationChange(menuType: string) {
    switch (menuType) {
      case "separator-menu":
        // this.menuItems.next(this.separatorMenu);
        break;
      case "icon-menu":
        this.menuItems.next(this.iconMenu);
        break;
      default:
        // this.menuItems.next(this.plainMenu);
    }
  }
}
