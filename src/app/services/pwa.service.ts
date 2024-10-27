import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { take, timer, filter } from 'rxjs';
import { PromptComponent } from '../components/prompt-component/prompt-component.component';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private promptEvent: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private platform: Platform,
    private authService: AuthService
  ) { }

  public initPwaPrompt() {
    // First check if user is authenticated
    this.authService.user.pipe(
      filter(user => !!user) // Only proceed if user exists
    ).subscribe(() => {
      if (this.platform.ANDROID) {
        window.addEventListener('beforeinstallprompt', (event: any) => {
          event.preventDefault();
          this.promptEvent = event;
          this.openPromptComponent('android');
        });
      }
      
      if (this.platform.IOS) {
        const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
        if (!isInStandaloneMode) {
          this.openPromptComponent('ios');
        }
      }
    });
  }

  private openPromptComponent(mobileType: 'ios' | 'android') {
    // Double-check authentication status before showing prompt
    this.authService.user.pipe(
      take(1),
      filter(user => !!user)
    ).subscribe(() => {
      timer(3000)
        .pipe(take(1))
        .subscribe(() => this.bottomSheet.open(PromptComponent, { 
          data: { mobileType, promptEvent: this.promptEvent } 
        }));
    });
  }
}