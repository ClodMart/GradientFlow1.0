import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.css']
})
export class NavigationItemComponent implements OnInit {

  @Input()
	set text(name: string) {
		this.buttonText = name.toUpperCase();
	}
	get name(): string {
		return this.buttonText;
	}

  @Input()
  set icon(iconName: string) {
		this.iconValue = iconName;
	}
	get iconName(): string {
		return this.iconValue;
	}


  	@Input() link: string = '';
	@Input() color: string = '0068B4';
	@Input() type: string = 'button';
	@Input() isDisabled = false;

  @Output() btnClick = new EventEmitter();

	public buttonText = '';
  public iconValue = '';

	constructor() {}

  ngOnInit() {
  }

  onClick() {
		this.btnClick.emit();
	}

}
