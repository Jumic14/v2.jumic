import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-mean-system',
  templateUrl: './mean-system.component.html',
  styleUrl: './mean-system.component.scss',
})
export class MeanSystemComponent {
  meanDark: string = './../../assets/logo/mean/mean_dark.png';
  meanLight: string = './../../assets/logo/mean/mean_light.png';
  mongoDark: string = './../../assets/logo/mean/mongodb_dark.png';
  mongoLight: string = './../../assets/logo/mean/mongodb_light.png';
  expressDark: string = './../../assets/logo/mean/expressjs_dark.png';
  expressLight: string = './../../assets/logo/mean/expressjs_light.png';
  angularDark: string = './../../assets/logo/mean/angular_dark.png';
  angularLight: string = './../../assets/logo/mean/angular_light.png';
  nodeDark: string = './../../assets/logo/mean/nodejs_dark.png';
  nodeLight: string = './../../assets/logo/mean/nodejs_light.png';
  sassDark: string = './../../assets/logo/mean/sass_dark.png';
  sassLight: string = './../../assets/logo/mean/sass_light.png';
  typescriptDark: string = './../../assets/logo/mean/typescript_dark.png';
  typescriptLight: string = './../../assets/logo/mean/typescript_light.png';

  constructor(private themeService: ThemeService) {}
  getMeanLogo() {
    return this.themeService.isDarkMode ? this.meanDark : this.meanLight;
  }
  getMongoLogo() {
    return this.themeService.isDarkMode ? this.mongoDark : this.mongoLight;
  }
  getExpressLogo() {
    return this.themeService.isDarkMode ? this.expressDark : this.expressLight;
  }
  getAngularLogo() {
    return this.themeService.isDarkMode ? this.angularDark : this.angularLight;
  }
  getNodeLogo() {
    return this.themeService.isDarkMode ? this.nodeDark : this.nodeLight;
  }
  getSassLogo() {
    return this.themeService.isDarkMode ? this.sassDark : this.sassLight;
  }
  getTypescriptLogo() {
    return this.themeService.isDarkMode
      ? this.typescriptDark
      : this.typescriptLight;
  }
}
