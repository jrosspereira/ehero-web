import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  constructor( zone: NgZone,
    private router: Router) {
      this.mediaMatcher.addListener(mql =>
        zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
    }

    @ViewChild(MatSidenav, {
      static: false
    }) 
    sidenav: MatSidenav;

    ngOnInit() {
      this.router.events.subscribe(() => {
        if (this.isScreenSmall())
          this.sidenav.close();
      })
    }
  
    isScreenSmall(): boolean {
      return this.mediaMatcher.matches;
    }

}
