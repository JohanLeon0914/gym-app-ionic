import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title: string;
  @Input() backButton: string;
  @Input() isModal: boolean;
  @Input() color: string;
  @Input() centerTitle: boolean;
  
  darkMode: BehaviorSubject<Boolean>;
  constructor(
    private utilSvc: UtilService
  ) { }

  ngOnInit() {}

  dismissModal() {
    this.utilSvc.dismissModal({ success: true });
  }

}
