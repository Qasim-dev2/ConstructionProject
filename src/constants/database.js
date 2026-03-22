/**
 * Database table and column constants
 * Centralized constants to prevent typos and improve maintainability
 */

export const DB_TABLES = {
  CONTACTS: 'contacts',
  PROJECTS: 'projects'
}

export const PROJECT_TYPES = {
  FEATURED: 'featured',
  REGULAR: 'regular'
}

export const DB_COLUMNS = {
  CONTACTS: {
    ID: 'id',
    NAME: 'name',
    EMAIL: 'email',
    PHONE: 'phone',
    MESSAGE: 'message',
    READ: 'read',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at'
  },
  PROJECTS: {
    ID: 'id',
    TITLE: 'title',
    DESCRIPTION: 'description',
    LOCATION: 'location',
    PROJECT_TYPE: 'project_type',
    IMAGE_URLS: 'image_urls',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at'
  }
}

/**
 * Admin route constants
 */
export const ADMIN_ROUTES = {
  LOGIN: '/admin/login',
  DASHBOARD: '/admin/dashboard',
  PROJECTS: '/admin/projects',
  QUOTES: '/admin/quotes'
}