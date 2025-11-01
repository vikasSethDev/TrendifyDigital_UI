import { Component, OnInit } from '@angular/core';
import { CourseStructureService } from '../../Service/courseStructure.service';
import { CourseSectionDTO, ModuleDTO, TopicDTO, ContentDTO } from '../../../../core/DTOs/ICourseStructureDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-course',
  standalone: false,
  templateUrl: './manage-course.html',
  styleUrl: './manage-course.css'
})
export class ManageCourse implements OnInit {
  // Data arrays
  sections: any[] = [];
  modules: any[] = [];
  topics: any[] = [];
  contents: any[] = [];

  // Selected IDs
  selectedSectionId: string = '';
  selectedModuleId: string = '';
  selectedTopicId: string = '';

  constructor(private adminService: CourseStructureService) { }

  ngOnInit(): void {
    this.loadSections();
  }

  // ========================
  // SECTION CRUD
  // ========================
  loadSections() {
    this.adminService.getAllSections().subscribe({
      next: (data) => {
        console.log('Sections data:', data);
        this.sections = data;
      },
      error: (err) => console.error('Error loading sections:', err)
    });
  }

  addSection(sectionName: string) {
    if (!sectionName.trim()) {
      Swal.fire('⚠️ Required', 'Section name is required', 'warning');
      return;
    }

    const section = { sectionName };
    this.adminService.createSection(section).subscribe({
      next: () => {
        this.loadSections();
        Swal.fire('✅ Success', 'Section added successfully!', 'success');
      },
      error: (err) => {
        console.error('Add section error:', err);
        Swal.fire('❌ Error', 'Failed to add section', 'error');
      }
    });
  }

  updateSection(section: any) {
    Swal.fire({
      title: 'Edit Section',
      input: 'text',
      inputValue: section.sectionName,
      inputPlaceholder: 'Enter section name',
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      preConfirm: (value) => {
        if (!value.trim()) {
          Swal.showValidationMessage('Section name cannot be empty');
          return false;
        }
        return value.trim();
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedSection = { sectionName: result.value };
        this.adminService.updateSection(section._id, updatedSection).subscribe({
          next: () => {
            this.loadSections();
            Swal.fire('✅ Updated!', 'Section updated successfully!', 'success');
          },
          error: () => Swal.fire('❌ Error', 'Failed to update section.', 'error')
        });
      }
    });
  }


  deleteSection(id: string) {
    Swal.fire({
      title: 'Delete this section?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteSection(id).subscribe({
          next: () => {
            this.loadSections();
            this.modules = [];
            this.topics = [];
            this.contents = [];
            this.selectedSectionId = '';
            Swal.fire('Deleted!', 'Section has been deleted.', 'success');
          },
          error: (err) => {
            console.error('Delete section error:', err);
            Swal.fire('❌ Error', 'Failed to delete section', 'error');
          }
        });
      }
    });
  }

  // ========================
  // MODULE CRUD
  // ========================
  onSectionChange(event: any) {
    this.selectedSectionId = event.target.value;
    this.selectedModuleId = '';
    this.selectedTopicId = '';
    this.modules = [];
    this.topics = [];
    this.contents = [];

    if (this.selectedSectionId) {
      this.loadModulesBySection();
    }
  }

  loadModulesBySection() {
    this.adminService.getModulesBySection(this.selectedSectionId).subscribe({
      next: (data) => (this.modules = data),
      error: (err) => console.error('Load modules error:', err)
    });
  }

  addModule(title: string) {
    if (!this.selectedSectionId) {
      Swal.fire({
        icon: 'info',
        title: 'Select Section',
        text: 'Please select a section first before adding a module.',
        confirmButtonColor: '#4b6cb7'
      });
      return;
    }

    if (!title.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Module Title Required',
        text: 'Please enter a valid module title.',
        confirmButtonColor: '#f1c40f'
      });
      return;
    }

    const moduleData = { title };

    this.adminService.createModule(this.selectedSectionId, moduleData).subscribe({
      next: () => {
        this.loadModulesBySection();
        Swal.fire({
          icon: 'success',
          title: 'Module Added Successfully',
          text: `"${title}" has been added under the selected section.`,
          confirmButtonColor: '#4b6cb7',
          timer: 2000,
          timerProgressBar: true
        });
      },
      error: (err) => {
        console.error('Add module error:', err);
        Swal.fire({
          icon: 'error',
          title: 'Failed to Add Module',
          text: 'Something went wrong while saving the module. Please try again.',
          confirmButtonColor: '#e74c3c'
        });
      }
    });
  }

  updateModule(module: any) {
    Swal.fire({
      title: 'Edit Module',
      input: 'text',
      inputValue: module.title,
      inputPlaceholder: 'Enter module title',
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      preConfirm: (value) => {
        if (!value.trim()) {
          Swal.showValidationMessage('Module title cannot be empty');
          return false;
        }
        return value.trim();
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedModule = { title: result.value };
        this.adminService.updateModule(module._id, updatedModule).subscribe({
          next: () => {
            this.loadModulesBySection();
            Swal.fire('✅ Updated!', 'Module updated successfully!', 'success');
          },
          error: () => Swal.fire('❌ Error', 'Failed to update module.', 'error')
        });
      }
    });
  }


  deleteModule(id: string) {
    Swal.fire({
      title: 'Delete this module?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteModule(id).subscribe({
          next: () => {
            this.loadModulesBySection();
            this.topics = [];
            this.contents = [];
            Swal.fire('Deleted!', 'Module has been deleted.', 'success');
          },
          error: (err) => {
            console.error('Delete module error:', err);
            Swal.fire('❌ Error', 'Failed to delete module', 'error');
          }
        });
      }
    });
  }
  // ========================
  // TOPIC CRUD
  // ========================
  onModuleChange(event: any) {
    this.selectedModuleId = event.target.value;
    this.selectedTopicId = '';
    this.topics = [];
    this.contents = [];

    if (this.selectedModuleId) {
      this.loadTopicsByModule();
    }
  }

  loadTopicsByModule() {
    this.adminService.getTopicsByModule(this.selectedModuleId).subscribe({
      next: (data) => (this.topics = data),
      error: (err) => console.error('Load topics error:', err)
    });
  }

  addTopic(title: string, contents: string, type: string, url: string) {
    if (!this.selectedModuleId) {
      Swal.fire({
        icon: 'info',
        title: 'Select Module',
        text: 'Please select a module first before adding a topic.',
        confirmButtonColor: '#4b6cb7'
      });
      return;
    }

    if (!title.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Topic Title Required',
        text: 'Please enter a valid topic title.',
        confirmButtonColor: '#f1c40f'
      });
      return;
    }

    const topicData = { title, contents, type, url };
    console.log('Adding topic:', topicData);

    this.adminService.createTopic(this.selectedModuleId, topicData).subscribe({
      next: () => {
        this.loadTopicsByModule();
        Swal.fire({
          icon: 'success',
          title: 'Topic Added Successfully',
          text: `"${title}" has been added under this module.`,
          confirmButtonColor: '#4b6cb7',
          timer: 2000,
          timerProgressBar: true
        });
      },
      error: (err) => {
        console.error('Add topic error:', err);
        Swal.fire({
          icon: 'error',
          title: 'Failed to Add Topic',
          text: 'Something went wrong while saving the topic. Please try again.',
          confirmButtonColor: '#e74c3c'
        });
      }
    });
  }

  updateTopic(topic: any) {
    Swal.fire({
      title: 'Edit Topic',
      html: `
      <input id="swal-title" class="swal2-input" placeholder="Title" value="${topic.title}">
      <textarea id="swal-contents" class="swal2-textarea" placeholder="Contents">${topic.contents}</textarea>
      <select id="swal-type" class="swal2-select">
        <option value="video" ${topic.type === 'video' ? 'selected' : ''}>Video</option>
        <option value="pdf" ${topic.type === 'pdf' ? 'selected' : ''}>PDF</option>
        <option value="quiz" ${topic.type === 'quiz' ? 'selected' : ''}>Quiz</option>
        <option value="article" ${topic.type === 'article' ? 'selected' : ''}>Article</option>
      </select>
      <input id="swal-url" class="swal2-input" placeholder="URL" value="${topic.url || ''}">
    `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const title = (document.getElementById('swal-title') as HTMLInputElement).value.trim();
        const contents = (document.getElementById('swal-contents') as HTMLTextAreaElement).value.trim();
        const type = (document.getElementById('swal-type') as HTMLSelectElement).value;
        const url = (document.getElementById('swal-url') as HTMLInputElement).value.trim();

        if (!title) {
          Swal.showValidationMessage('Title is required');
          return false;
        }

        return { title, contents, type, url };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.updateTopic(topic._id, result.value).subscribe({
          next: () => {
            this.loadTopicsByModule();
            Swal.fire('✅ Updated!', 'Topic updated successfully!', 'success');
          },
          error: () => Swal.fire('❌ Error', 'Failed to update topic.', 'error')
        });
      }
    });
  }


  deleteTopic(id: string) {
    Swal.fire({
      title: 'Delete this topic?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteTopic(id).subscribe({
          next: () => {
            this.loadTopicsByModule();
            this.contents = [];
            Swal.fire('Deleted!', 'Topic has been deleted.', 'success');
          },
          error: (err) => {
            console.error('Delete topic error:', err);
            Swal.fire('❌ Error', 'Failed to delete topic', 'error');
          }
        });
      }
    });
  }


}