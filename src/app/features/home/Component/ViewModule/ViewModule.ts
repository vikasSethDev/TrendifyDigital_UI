import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IModuleDTO } from '../../../../core/DTOs/IModuleDTO';

@Component({
  selector: 'app-view-module',
  standalone: false,
  templateUrl: './ViewModule.html',
  styleUrl: './ViewModule.css'
})



export class ViewModule {

  currentModuleId = 1;
  currentModule: IModuleDTO[] = [];
  currentSectionTitle = '';

  moduleTopics: IModuleDTO[] = []; // This should be populated with real data, possibly from a service



  constructor(private route: ActivatedRoute, private router: Router) { }
 ngOnInit() {
  this.route.queryParams.subscribe(params => {
    const moduleIdFromUrl = +params['id'];
    if (!isNaN(moduleIdFromUrl)) {
      this.currentModuleId = moduleIdFromUrl;
      this.loadCurrentModule();
    }
  });
}

  loadCurrentModule() {
    
    // Get all topics for the current module
    this.currentModule = this.moduleTopics.filter(m => m.moduleId === this.currentModuleId);
    this.currentSectionTitle = this.getSectionTitleByModuleId(this.currentModuleId);
  }

 getUniqueModules() {
  const seen = new Set<number>();
  return this.moduleTopics.filter(m => {
    if (seen.has(m.moduleId)) return false;
    seen.add(m.moduleId);
    return true;
  });
}

nextModule() {
  const uniqueModules = this.getUniqueModules();
  const currentIndex = uniqueModules.findIndex(m => m.moduleId === this.currentModuleId);
  if (currentIndex < uniqueModules.length - 1) {
    this.currentModuleId = uniqueModules[currentIndex + 1].moduleId;
    this.updateURL();
    this.loadCurrentModule();
  }
}

prevModule() {
  const uniqueModules = this.getUniqueModules();
  const currentIndex = uniqueModules.findIndex(m => m.moduleId === this.currentModuleId);
  if (currentIndex > 0) {
    this.currentModuleId = uniqueModules[currentIndex - 1].moduleId;
    this.updateURL();
    this.loadCurrentModule();
  }
}

  updateURL() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id: this.currentModuleId },
      queryParamsHandling: 'merge'
    });
  }


  hasPrev(): boolean {
    const uniqueModules = this.getUniqueModuleIds();
    return uniqueModules.indexOf(this.currentModuleId) > 0;
  }

  hasNext(): boolean {
    const uniqueModules = this.getUniqueModuleIds();
    return uniqueModules.indexOf(this.currentModuleId) < this.getUniqueModuleIds().length - 1;
  }

  getUniqueModuleIds(): number[] {
    return [...new Set(this.moduleTopics.map(m => m.moduleId))];
  }

  getModuleTitle(moduleId: number): string {
    const module = this.moduleTopics.find(m => m.moduleId === moduleId);
    return module ? module.title : '';
  }

  getSectionTitleByModuleId(moduleId: number): string {
    // Replace with real logic if using `sectionsData`
    return 'Marketing & Web Presence Foundation'; // Example fallback
  }


  getIcon(type: string): string {
    switch (type.toUpperCase()) {
      case 'PDF': return 'bi bi-file-earmark-pdf';
      case 'VIDEO': return 'bi bi-camera-video';
      case 'QUIZ': return 'bi bi-question-circle';
      default: return 'bi bi-file-earmark';
    }
  }

  getColor(type: string): string {
    switch (type.toUpperCase()) {
      case 'PDF': return '#007bff';       // Blue
      case 'VIDEO': return '#dc3545';     // Red
      case 'QUIZ': return '#6c757d';      // Gray
      default: return '#333';
    }
  }
}
