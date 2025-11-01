export interface ContentDTO {
  contentId: number;
  title: string;
  type: 'PDF' | 'Video' | 'Quiz' | 'Exercise';
  link: string;
}

export interface TopicDTO {
  topicId: number;
  title: string;
  contents: ContentDTO[];
}

export interface ModuleDTO {
  moduleId: number;         
  title: string;             
  docsCount: number;         
  videosCount: number;       
  status: 'watch' | 'resume' | 'locked'; 
  topics?: TopicDTO[];        // ✅ Added nested topics
}

export interface CourseSectionDTO {
  _id?: string;            
  sectionId: number;         
  title: string;           
  modulesCount: number;    
  modules: ModuleDTO[];     
  levelComplete: boolean;   
  isAccessible?: boolean;   // ✅ For access control per student
}
