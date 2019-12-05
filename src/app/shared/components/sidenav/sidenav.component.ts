import { Component, OnInit, Input } from '@angular/core';
import { IMenuItem } from './../../models/i-menu-item';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.template.html'
})
export class SidenavComponent {
  @Input('items') public menuItems: IMenuItem[] = [];
  @Input('hasIconMenu') public hasIconTypeMenuItem: boolean;
  @Input('iconMenuTitle') public iconTypeMenuTitle: string;
  
  constructor(
  ) {}

  ngOnInit() {}

  // Only for demo purpose
  addMenuItem() {
    this.menuItems.push({
      id: 130,
      name: "ALTA",
      type: "icon",
      tooltip: "Home",
      icon: "home",
      state: "dashboard"
    });
  }

}