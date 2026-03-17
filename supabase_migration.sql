-- ====================================================================================
-- SQL MIGRATION: Leads -> Follow Up -> Proposals -> Clients
-- Run this in your Supabase SQL Editor to create the necessary tables and storage bucket.
-- ====================================================================================

-- 1. Create 'follow_ups' table (identical to leads but for the follow up stage)
CREATE TABLE IF NOT EXISTS public.follow_ups (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text,
    phone text,
    source text,
    priority text,
    project text,
    notes text,
    last_contacted timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    created_by uuid,
    created_by_name text,
    updated_by uuid,
    updated_by_name text,
    CONSTRAINT follow_ups_pkey PRIMARY KEY (id)
);

-- Note: Depending on your RLS policies for `leads`, you may want to apply similar policies to `follow_ups`
-- ALTER TABLE public.follow_ups ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Enable read access for all users" ON public.follow_ups AS PERMISSIVE FOR SELECT TO public USING (true);
-- CREATE POLICY "Enable insert for authenticated users only" ON public.follow_ups FOR INSERT TO authenticated WITH CHECK (true);
-- CREATE POLICY "Enable update for authenticated users only" ON public.follow_ups FOR UPDATE TO authenticated USING (true);
-- CREATE POLICY "Enable delete for authenticated users only" ON public.follow_ups FOR DELETE TO authenticated USING (true);


-- 2. Create 'needs' table (linked to follow_ups)
CREATE TABLE IF NOT EXISTS public.needs (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    follow_up_id uuid NOT NULL REFERENCES public.follow_ups(id) ON DELETE CASCADE,
    description text NOT NULL,
    status text DEFAULT 'pending',
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT needs_pkey PRIMARY KEY (id)
);

-- 3. Create 'proposals' table
CREATE TABLE IF NOT EXISTS public.proposals (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text,
    phone text,
    service text,
    status text DEFAULT 'pending',
    source text,
    project text,
    notes text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone,
    deleted_at timestamp with time zone,
    CONSTRAINT proposals_pkey PRIMARY KEY (id)
);

-- 4. Create 'proposal_pdfs' table (linked to proposals)
CREATE TABLE IF NOT EXISTS public.proposal_pdfs (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    proposal_id uuid NOT NULL REFERENCES public.proposals(id) ON DELETE CASCADE,
    file_name text NOT NULL,
    file_url text NOT NULL,
    uploaded_at timestamp with time zone DEFAULT now(),
    CONSTRAINT proposal_pdfs_pkey PRIMARY KEY (id)
);

-- 5. Create Storage Bucket for Proposal PDFs
-- Ensure storage extensions and schema are available (which Supabase has by default)
INSERT INTO storage.buckets (id, name, public)
VALUES ('proposals_pdfs', 'proposals_pdfs', true)
ON CONFLICT (id) DO NOTHING;

-- Optionally, define security policies for the bucket (public read, auth insert)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'proposals_pdfs');

CREATE POLICY "Auth Insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'proposals_pdfs');

CREATE POLICY "Auth Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'proposals_pdfs');

CREATE POLICY "Auth Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'proposals_pdfs');
