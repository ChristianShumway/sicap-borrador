import { Routes } from "@angular/router";

import { AnalyticsComponent } from "./analytics/analytics.component";
import { DashboardDarkComponent } from "./dashboard-dark/dashboard-dark.component";
import { CryptocurrencyComponent } from "./cryptocurrency/cryptocurrency.component";
import { DefaultDashboardComponent } from "./default-dashboard/default-dashboard.component";

export const DashboardRoutes: Routes = [
  {
    path: "",
    component: DefaultDashboardComponent,
    data: { title: "Default", breadcrumb: "Default" }
  },
  {
    path: "analytics",
    component: AnalyticsComponent,
    data: { title: "Analytics", breadcrumb: "Analytics" }
  },
  {
    path: "crypto",
    component: CryptocurrencyComponent,
    data: { title: "Cryptocurrency", breadcrumb: "Cryptocurrency" }
  },
  {
    path: "dark",
    component: DashboardDarkComponent,
    data: { title: "Dark Cards", breadcrumb: "Dark Cards" }
  }
];
