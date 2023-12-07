import { ConfigsService } from './../../Services/ConfigurationService/configuration.service';
import { Component, OnInit } from '@angular/core';
import { AiService } from 'src/app/Services/AiService/ai.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  
  constructor(private config: ConfigsService, private aiService: AiService){
    this.aiService.Init()
  }
  
  ngOnInit(): void {
    this.config.init();
  }

}
