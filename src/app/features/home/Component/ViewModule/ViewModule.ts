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

  moduleTopics: IModuleDTO[] = [
    {
      moduleId: 1,
      id: 1,
      title: 'History Of Marketing',
      rows: [
        { id: 1, title: 'History Of Marketing', type: 'PDF', link: '#' },
        { id: 2, title: 'History Of Marketing-Marketing Basics', type: 'VIDEO', link: '#' },
        { id: 3, title: 'Quiz 1: Marketing, Brands & Associated Values', type: 'QUIZ', link: '#' },
      ]
    },
    {
      moduleId: 1,
      id: 2,
      title: 'Traditional Vs. Digital Marketing',
      rows: [
        { id: 4, title: 'Traditional Vs. Digital Marketing', type: 'PDF', link: '#' },
        { id: 5, title: 'Traditional Vs. Digital Marketing', type: 'VIDEO', link: '#' },
        { id: 6, title: 'Quiz 3: Traditional vs. Digital Marketing', type: 'QUIZ', link: '#' },
      ]
    },
    {
      moduleId: 2,
      id: 3,
      title: 'Digital Marketing Opportunities',
      rows: [
        { id: 1, title: 'The Current DM Opportunity', type: 'PDF', link: '#' },
        { id: 2, title: 'The Current DM Opportunity', type: 'VIDEO', link: '#' },
        { id: 3, title: 'Quiz 1: Digital Marketing Opportunity', type: 'QUIZ', link: '#' }
      ]
    },
    {
      moduleId: 2,
      id: 4,
      title: 'Digital Marketing Channels',
      rows: [
        { id: 4, title: 'Digital Marketing Channels', type: 'PDF', link: '#' },
        { id: 5, title: 'Digital Marketing Channels', type: 'VIDEO', link: '#' },
        { id: 6, title: 'Quiz 2: Digital Marketing Channels & Media', type: 'QUIZ', link: '#' }
      ]
    },
    {
      moduleId: 2,
      id: 5,
      title: 'Careers in Digital Marketing',
      rows: [
        { id: 7, title: 'Careers in Digital Marketing', type: 'PDF', link: '#' },
        { id: 8, title: 'Careers in Digital Marketing', type: 'VIDEO', link: '#' },
        { id: 9, title: 'Quiz 3: Careers in Digital Marketing', type: 'QUIZ', link: '#' }
      ]
    },
    {
      moduleId: 3,
      id: 6,
      title: 'Digital Consumer Journey',
      rows: [
        { id: 1, title: 'Digital Consumer Journey', type: 'PDF', link: '#' },
        { id: 2, title: 'Digital Consumer Journey', type: 'VIDEO', link: '#' },
        { id: 3, title: 'Quiz 1: Digital Consumer Journey', type: 'QUIZ', link: '#' }
      ]
    },
    {
      moduleId: 3,
      id: 7,
      title: 'Online Business Goals',
      rows: [
        { id: 4, title: 'Online Business Goals', type: 'PDF', link: '#' },
        { id: 5, title: 'Online Business Goals', type: 'VIDEO', link: '#' },
        { id: 6, title: 'Quiz 2: Online Business/Campaign Goals', type: 'QUIZ', link: '#' }
      ]
    },
    {
      moduleId: 4,
      id: 8,
      title: 'Introduction to Digital Visibility Strategy',
      rows: [
        { id: 1, title: 'Introduction to Digital Visibility Strategy', type: 'PDF', link: '#' },
        { id: 2, title: 'Introduction to Digital Visibility Strategy', type: 'VIDEO', link: '#' },
        { id: 3, title: 'Exercise 1 - Digital Visibility Strategy', type: 'EXERCISE', link: '#' },
        { id: 4, title: 'Quiz 1: Digital Visibility Strategy', type: 'QUIZ', link: '#' }
      ]
    },
    {
      moduleId: 4,
      id: 9,
      title: 'Website Planning',
      rows: [
        { id: 5, title: 'Website Planning', type: 'PDF', link: '#' },
        { id: 6, title: 'Website Planning', type: 'VIDEO', link: '#' },
        { id: 7, title: 'Exercise 2 - Website Blueprint Creation', type: 'EXERCISE', link: '#' },
        { id: 8, title: 'Quiz 2: Website Strategy', type: 'QUIZ', link: '#' }
      ]
    },
    {
      moduleId: 4,
      id: 10,
      title: 'Local Visibility Strategy',
      rows: [
        { id: 9, title: 'Local Visibility Strategy', type: 'PDF', link: '#' },
        { id: 10, title: 'Local Visibility Strategy', type: 'VIDEO', link: '#' },
        { id: 11, title: 'Exercise 3 - Local Visibility Analysis', type: 'EXERCISE', link: '#' },
        { id: 12, title: 'Quiz 3: Local Visibility Strategy', type: 'QUIZ', link: '#' }
      ]
    },
    {
      moduleId: 4,
      id: 11,
      title: 'Social Media Visibility',
      rows: [
        { id: 13, title: 'Social Media Visibility', type: 'PDF', link: '#' },
        { id: 14, title: 'Social Media Visibility', type: 'VIDEO', link: '#' },
        { id: 15, title: 'Exercise 4 - Social Media Strategy Analysis', type: 'EXERCISE', link: '#' },
        { id: 16, title: 'Quiz 4: Social Media Strategy', type: 'QUIZ', link: '#' }
      ]
    }
  ];



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
