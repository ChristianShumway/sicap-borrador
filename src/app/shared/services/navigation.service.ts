import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { IMenuItem } from './../models/i-menu-item';

interface Permisos {
  id: string;
  idPerfil: string;
  nombrePerfil: string;
  idModulo: string;
  autorizado: boolean;
}

@Injectable()
export class NavigationService {
  
  iconMenu: IMenuItem[] = [];
 
  constructor(
    private http: HttpClient
  ) {}

  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  
  // // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();
  
  getMenu(id) {
    return this.http.get<IMenuItem[]>(`${environment.apiURL}/dashboard/getMenu/${id}`);
  }

  getOptionsMenu(){
    return this.http.get<any[]>(`${environment.apiURL}/config/getOptionsMenu/`)
  }

  permisosMenu: Permisos[] = [
    { id: '1', idPerfil: '1', nombrePerfil: 'Gerencia', idModulo: '5', autorizado: true },
    { id: '2', idPerfil: '1', nombrePerfil: 'Gerencia', idModulo: '30', autorizado: true },
    { id: '3', idPerfil: '1', nombrePerfil: 'Gerencia', idModulo: '31', autorizado: true },
    { id: '4', idPerfil: '1', nombrePerfil: 'Gerencia', idModulo: '91', autorizado: true },
    { id: '5', idPerfil: '1', nombrePerfil: 'Gerencia', idModulo: '92', autorizado: true },
    { id: '6', idPerfil: '1', nombrePerfil: 'Gerencia', idModulo: '93', autorizado: true },
    { id: '7', idPerfil: '1', nombrePerfil: 'Gerencia', idModulo: '94', autorizado: true },
    { id: '8', idPerfil: '2', nombrePerfil: 'Planeación y Presupuestos', idModulo: '91', autorizado: true },
    { id: '9', idPerfil: '2', nombrePerfil: 'Planeación y Presupuestos', idModulo: '92', autorizado: true },
    { id: '10', idPerfil: '2', nombrePerfil: 'Planeación y Presupuestos', idModulo: '93', autorizado: true },
    { id: '11', idPerfil: '2', nombrePerfil: 'Planeación y Presupuestos', idModulo: '94', autorizado: true },
    { id: '12', idPerfil: '3', nombrePerfil: 'Control de Obra', idModulo: '91', autorizado: true },
    { id: '13', idPerfil: '3', nombrePerfil: 'Control de Obra', idModulo: '92', autorizado: true },
    { id: '14', idPerfil: '3', nombrePerfil: 'Control de Obra', idModulo: '93', autorizado: true },
    { id: '15', idPerfil: '3', nombrePerfil: 'Control de Obra', idModulo: '94', autorizado: true },
    { id: '16', idPerfil: '4', nombrePerfil: 'Compras y Materiales', idModulo: '91', autorizado: true },
    { id: '17', idPerfil: '4', nombrePerfil: 'Compras y Materiales', idModulo: '92', autorizado: true },
    { id: '18', idPerfil: '4', nombrePerfil: 'Compras y Materiales', idModulo: '93', autorizado: true },
    { id: '19', idPerfil: '4', nombrePerfil: 'Compras y Materiales', idModulo: '94', autorizado: true },
    { id: '20', idPerfil: '5', nombrePerfil: 'Supervisión', idModulo: '91', autorizado: false },
    { id: '21', idPerfil: '5', nombrePerfil: 'Supervisión', idModulo: '92', autorizado: true },
    { id: '22', idPerfil: '5', nombrePerfil: 'Supervisión', idModulo: '93', autorizado: true },
    { id: '23', idPerfil: '5', nombrePerfil: 'Supervisión', idModulo: '94', autorizado: true },
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
