import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  imports: [],
  templateUrl: './svg-icon.html',
})
export class SvgIcon {
  @Input() icon: string = '';

  get href() {
    return `/${this.icon}.svg#${this.icon}`;
  }
}
