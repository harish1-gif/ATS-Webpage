# Dynamic News System Setup Guide

## 1. Supabase Database Setup

You need to create a table in Supabase to store news articles. Run this SQL in your Supabase SQL Editor:

```sql
-- Create news table
CREATE TABLE news (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('AI & ML', 'Cloud Ops', 'Security', 'Web Engineering')),
  author TEXT NOT NULL,
  date TEXT NOT NULL,
  readTime TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('manual', 'devto')),
  devtoUrl TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  lastUpdated TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_news_category ON news(category);
CREATE INDEX idx_news_createdAt ON news(createdAt DESC);

-- Enable RLS (optional but recommended)
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public read access"
  ON news
  FOR SELECT
  USING (true);
```

## 2. Environment Variables

Your `.env.local` file has:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ADMIN_PASSWORD`

## 3. Access Admin Panel

1. Go to `/admin`
2. Login with password: `admin123`
3. Navigate to "News Manager" tab

## 4. Features

### Add News Manually
- Fill in title, description, category, and author
- Click "Add News" button
- News appears immediately on `/blog` page
- Each category can have up to 2 news items

### Delete News
- Click trash icon next to any news item
- Confirmation required

## 5. Tips

- Each category shows 2 news items on the blog page
- News are sorted by creation date (newest first)
- Admin panel shows all news
- Search and category filters work on all articles

## 6. Production Deployment

When deploying to production:

1. Update `ADMIN_PASSWORD` to a strong password
2. Ensure Supabase tables are created
3. Test the admin panel and news display

---

Ready to go! Just add news items via the admin panel.

