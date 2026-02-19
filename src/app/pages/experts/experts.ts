import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SvgIcon } from '../../components/svg-icon/svg-icon';
import { ExpertsService } from '../../services/experts';
import { Observable } from 'rxjs';
import { IExpert } from '../../interfaces/interfaces';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-experts',
  imports: [SvgIcon, AsyncPipe],
  templateUrl: './experts.html',
  styleUrl: './experts.scss',
})
export class Experts {
  router = inject(Router);
  expertsService = inject(ExpertsService);

  experts!: Observable<IExpert[]>;

  ngOnInit() {
    this.experts = this.expertsService.fetchExperts();
  }

  goBack() {
    this.router.navigate(['/profile']);
  }
}
