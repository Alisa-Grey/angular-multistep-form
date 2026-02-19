import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage';
import { IProfile } from '../../interfaces/interfaces';
import { calculateAge } from '../../utils/helpers';
import { goals, physicalActivityOptions } from '../../utils/stepsData';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  router = inject(Router);
  localstorageService = inject(LocalStorageService);
  profile!: IProfile;
  ageWithUnit: string = '';
  physicalActivity: { title: string; description: string } = { title: '', description: '' };
  goals = [] as string[];

  ngOnInit() {
    const userProfile: IProfile | null = this.localstorageService.getItem('user');

    if (!userProfile) {
      return;
    }

    const age = calculateAge(userProfile.birthdate);
    const physicalActivityFull = physicalActivityOptions.find(
      (option) => option.id === userProfile?.physicalActivity
    );

    this.profile = {
      ...userProfile,
      fullName: `${userProfile.firstName} ${userProfile.lastName ?? ''}`,
      age: age,
    };

    this.ageWithUnit = this.getAgeUnit(age);
    this.physicalActivity = {
      title: physicalActivityFull!.title,
      description: physicalActivityFull!.description,
    };

    this.goals = userProfile.goals
      .map((goal: string) => goals.find((el) => el.id === goal)?.title)
      .filter((item) => typeof item === 'string');
  }

  getAgeUnit(age: number) {
    if (age === 1 || age % 10 === 1) {
      return `${age} год`;
    } else if (age % 10 >= 2 && age % 10 <= 4) {
      return `${age} года`;
    } else {
      return `${age} лет`;
    }
  }

  deleteProfile() {
    this.localstorageService.removeItem('user');
    this.router.navigate(['/questionnaire']);
  }
}
