import { RouterModule, Routes } from '@angular/router';

export namespace NavigationUtils{

export class NavigationItem{
  public label: string;
  public order: number;
  public link: string;
  public icon: string;

  constructor(lab: string, order:number, lnk:string, ico?:string){
    this.label = lab;
    this.order = order;
    this.link = lnk;
    this.icon = ico ?? "";
  }
}

export class Icon{
  public path?: string;
  public icon?: string;

  constructor(pa: string, ico:string){
    this.path = pa;
    this.icon = ico;
  }
}

export declare type Icons = Icon[];
}
