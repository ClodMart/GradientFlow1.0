import { Component, Input, OnInit, ViewChild  } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideNavService } from '../sidenav_service';
import { Router } from '@angular/router';
import { NavigationUtils } from '../../Classes/navigation-classes';
import {AppRoutingModule} from '../../app-routing.module';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {
  @Input() path : string;
  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private sideNavService: SideNavService, private approuting: AppRoutingModule, private router: Router) {
  }

  public menuItems: Array<NavigationUtils.NavigationItem>

navigateToRoute() {
    console.log('Before navigation');
    this.router.navigate(['/my-route']);
    console.log('After navigation');
}

  ngOnInit() {
    this.path = "app";
    this.menuItems = this.approuting.getRoutes(this.path);
    this.sideNavService.sideNavToggleSubject.subscribe(()=> {
    console.log(this.sidenav);
    if(this.sidenav){
      this.sidenav.toggle();
    }      
      console.log("toggle done");
    });
  }
}
