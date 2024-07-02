import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { NAVIGATION_MENU } from '@core_models/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
  styleUrl: './app.menu.component.scss'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];
  menus: any[] = [];
  constructor(public layoutService: LayoutService) { }

  ngOnInit() {
    // let permission: any[] = JSON.parse(window.localStorage.getItem('permissions') ?? '[]') as any[];
    // this.cloneMenu();
    // permission.sort((a, b) => (a.key < b.key ? -1 : 1));
    // permission.forEach((v, i) => {
    //   let mainGroup: any = this.menus.filter(x => x.label == v.label)[0];
    //   let ParentGroup: any[] = mainGroup.items as any[];
    //   mainGroup.items = [];

    //   v.items.sort((a: any, b: any) => (a.key < b.key ? -1 : 1));
    //   v.items.forEach((v1: any, i1: any) => {
    //     let grantedParentGroup = ParentGroup.filter(x => x.label == v1.label)[0];

    //     if (grantedParentGroup !== undefined && grantedParentGroup.items !== undefined) {

    //       let childGroup = grantedParentGroup.items as any[];
    //       if (v1.items.length !== 0)
    //         grantedParentGroup.items = [];
    //       else grantedParentGroup.items = undefined;

    //       /* v1.items.sort((a: any, b: any) => (a.key < b.key ? -1 : 1));*/
    //       v1.items.forEach((v2: any, i2: any) => {
    //         let grantedChildGroup = childGroup.filter(x => x.label == v2.label)[0];
    //         grantedParentGroup.items.push(grantedChildGroup);
    //       });
    //     }
    //     mainGroup.items.push(grantedParentGroup);
    //   });

    //   this.model.push(mainGroup);
    // });

    // if (permission.length == 0)
    //   this.model = this.menus;
    
    this.cloneMenu();
    this.model=this.menus;
  }

  cloneMenu(): void {
    this.menus = JSON.parse(JSON.stringify(NAVIGATION_MENU));
  }
}
