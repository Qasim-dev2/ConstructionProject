# RECON Construction Website - Database Setup Guide

This document explains how to set up the Supabase database for the RECON Construction website.

## Database Tables

The application uses two main tables:

### 1. **contacts** (Quote Requests)
Stores all quote requests submitted through the contact form on the website.

**Columns:**
- `id` (UUID): Primary key
- `name` (VARCHAR): Customer's name
- `email` (VARCHAR): Customer's email address
- `phone` (VARCHAR): Customer's phone number (optional)
- `message` (TEXT): Customer's message/quote request
- `read` (BOOLEAN): Whether the admin has read this request (default: false)
- `created_at` (TIMESTAMP): When the request was submitted
- `updated_at` (TIMESTAMP): Last update time

### 2. **projects** (Portfolio Projects)
Stores all construction projects displayed in the portfolio section.

**Columns:**
- `id` (UUID): Primary key
- `title` (VARCHAR): Project title
- `description` (TEXT): Project description
- `location` (VARCHAR): Project location
- `project_type` (VARCHAR): Either 'featured' or 'regular'
- `image_urls` (TEXT[]): Array of image URLs for the project
- `created_at` (TIMESTAMP): When the project was added
- `updated_at` (TIMESTAMP): Last update time

## Setup Instructions

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Create a new project
3. Wait for the project to finish setting up

### Step 2: Run the SQL Schema

1. In your Supabase dashboard, go to the **SQL Editor**
2. Open the `schema.sql` file from this project
3. Copy and paste the entire SQL script into the SQL Editor
4. Click **Run** to execute the script

This will create:
- Both tables with all necessary columns
- Indexes for better query performance
- Row Level Security (RLS) policies
- Automatic timestamp update triggers

### Step 3: Configure Environment Variables

Create a `.env` file in the project root with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings:
- Go to **Settings** → **API**
- Copy the **Project URL** and **anon public** key

### Step 4: Set Up Authentication (for Admin Panel)

1. In Supabase dashboard, go to **Authentication** → **Users**
2. Click **Add User** to create an admin user
3. Enter email and password for the admin account
4. This account will be used to log into the admin panel at `/admin/login`

## Security Configuration

The database uses Row Level Security (RLS) to protect data:

### Contacts Table:
- ✅ **Public**: Can insert (submit quote requests)
- 🔒 **Admin Only**: Can view, update, and delete

### Projects Table:
- ✅ **Public**: Can view (for website visitors)
- 🔒 **Admin Only**: Can create, update, and delete

## Features

### Quote Request System
- Users fill out the contact form on the website
- Submissions are automatically saved to the `contacts` table
- Admin can view all requests at `/admin/quotes`
- Admin can mark requests as read/unread
- Admin can delete requests

### Project Management
- Admin can add/edit/delete projects at `/admin/projects`
- Projects are displayed on the public website
- Featured projects are highlighted
- Supports multiple images per project

## Testing the Setup

After completing the setup:

1. **Test Quote Submission:**
   - Visit the contact page on your website
   - Fill out and submit the form
   - Check the admin panel at `/admin/quotes` to see the submission

2. **Test Project Management:**
   - Log into the admin panel
   - Add a new project at `/admin/projects`
   - Verify it appears on the public projects page

## Troubleshooting

### "No rows returned" or permission errors:
- Verify RLS policies are enabled
- Check that your admin user is authenticated
- Ensure environment variables are set correctly

### Form submission fails:
- Check browser console for errors
- Verify Supabase URL and anon key in `.env`
- Ensure the `contacts` table exists in your database

### Can't see projects on website:
- Verify the `projects` table exists
- Check that projects have been added in the admin panel
- Ensure RLS policy allows public SELECT on projects

## Support

For issues or questions:
- Check the [Supabase Documentation](https://supabase.com/docs)
- Review the SQL schema in `schema.sql`
- Check the React components in `/src/components` and `/src/pages`
