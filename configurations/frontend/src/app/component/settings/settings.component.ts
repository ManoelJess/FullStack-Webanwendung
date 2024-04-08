import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {

  cities: City[] | undefined;
  languages: string[] = ['French', 'English', 'Spanish', 'German', 'Italian', 'Portuguese', 'Japanese', 'Chinese', 'Arabic'];
  selectedOption: string = '';

  selectedTheme: string = 'light';
  // toggleTheme() {
  //   this.selectedTheme = this.selectedTheme === 'light' ? 'dark' : 'light';
  // }


  theme$: BehaviorSubject<string> = new BehaviorSubject<string>('light');

  // Utilisez theme$ dans le modèle au lieu de theme
  toggleTheme() {
    const currentTheme = this.theme$.value;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.theme$.next(newTheme);
  }
  ngOnInit() {

  }

}
