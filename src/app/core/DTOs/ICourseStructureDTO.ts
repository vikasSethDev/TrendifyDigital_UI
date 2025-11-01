// ====================
// MODULE INTERFACE
// ====================
export interface ModuleDTO {
    _id?: string;
    moduleId?: number;                // unique ID for module
    sectionId?: number | string;     // reference to section
    title?: string;
    docsCount?: number;
    videosCount?: number;
    status?: 'watch' | 'resume' | 'locked';
    topics?: TopicDTO[];             // list of topics in the module
}

// ====================
// SECTION INTERFACE
// ====================
export interface CourseSectionDTO {
    _id?: string;
    sectionId?: number;
    title?: string;
    modulesCount?: number;
    modules?: ModuleDTO[];
    levelComplete?: boolean;
}

// ====================
// TOPIC INTERFACE
// ====================
export interface TopicDTO {
    _id?: string;
    topicId?: number;                // made optional for auto-generation
    moduleId?: number | string;       // reference to parent module
    sectionId?: number | string;     // optional parent section reference
    title?: string;
    description?: string;
    contentsCount?: number;          // optional count of contents
    contents?: ContentDTO[];         // contents under this topic
}

// ====================
// CONTENT INTERFACE
// ====================
export interface ContentDTO {
    _id?: string;
    contentId?: number;              // optional if auto-generated
    topicId?: number | string;        // reference to parent topic
    moduleId?: number | string;      // optional for hierarchy trace
    sectionId?: number | string;     // optional for hierarchy trace
    title?: string;
    type?: any;
    url?: string;
    duration?: string;               // for videos
    description?: string;
}
