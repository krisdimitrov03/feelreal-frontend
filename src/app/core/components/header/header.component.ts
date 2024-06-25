import {
  Component,
  HostListener,
  ElementRef,
  Renderer2
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectId, selectUsername } from '../../../features/auth/store/selectors/auth.selectors';
import { AuthState } from '../../../features/auth/store/state';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LOGOUT } from '../../../features/auth/store/actions/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {
  username$ = this.store.select(selectUsername);
  id$ = this.store.select(selectId);
  manageProfileLink = '';
  dropdownVisible = false;

  constructor(
    private store: Store<AuthState>,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.id$.subscribe((id) => {
      this.manageProfileLink = `/profile/manage/${id}`;
    });
    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.el.nativeElement.contains(e.target)) {
        this.dropdownVisible = false;
      }
    });
  }

  logout() {
    this.store.dispatch(LOGOUT());
    this.toggleDropdown();
  }

  toggleDropdown(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.dropdownVisible = !this.dropdownVisible;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.dropdownVisible = false;
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
