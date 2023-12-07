import { Component, OnInit, ViewChild } from '@angular/core';
import { SideNavService } from '../sidenav_service';
import { SearchBarComponent } from 'src/app/Common Components/search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title: string = "Gradientflow";

  @ViewChild('searchbar') searchbar: SearchBarComponent;

  constructor(private sideNavService: SideNavService) {

  }

  clickMenu() {
    this.sideNavService.toggle();
  }
}
