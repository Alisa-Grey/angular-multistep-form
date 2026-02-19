import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { StepsService } from '../../services/questionnaire-steps';
import { BmiPopupVariants } from '../../interfaces/enums';

@Component({
  selector: 'app-bmi-popup',
  imports: [],
  templateUrl: './bmi-popup.html',
  styleUrl: './bmi-popup.scss',
})
export class BmiPopup {
  stepsService = inject(StepsService);

  @Input() popupVariant!: BmiPopupVariants | null;
  @Output() popupVariantChange = new EventEmitter<BmiPopupVariants | null>();

  popupText: string = '';
  image: string = '';

  ngOnChanges() {
    if (this.popupVariant === BmiPopupVariants.underweight) {
      this.popupText = 'Ваш индекс массы тела меньше минимальных значений.';
      this.image = './underweight.png';
    } else if (this.popupVariant === BmiPopupVariants.overweight) {
      this.popupText = 'Ваш индекс массы тела превышает максимальные нормы.';
      this.image = './overweight.png';
    }
  }

  closePopup() {
    this.popupVariantChange.emit(null);
  }

  goToNextStep() {
    this.stepsService.goToNextStep();
  }
}
