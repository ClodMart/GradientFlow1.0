import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'aiChat-page-page1',
  templateUrl: './aiChat-page.component.html',
  styleUrls: ['./aiChat-page.component.css']
})
export class AiChatPageComponent {
  constructor(
    private route: ActivatedRoute)
    {

    }
}
