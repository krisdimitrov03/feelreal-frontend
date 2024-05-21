import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, HeaderComponent, FooterComponent],
  providers: [AuthService],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
