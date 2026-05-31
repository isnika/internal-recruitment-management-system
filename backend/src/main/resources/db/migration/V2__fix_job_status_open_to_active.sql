-- Fix: Rename deprecated job status 'OPEN' to 'ACTIVE'
-- JobStatus enum chỉ có: DRAFT, ACTIVE, PAUSED, CLOSED (không có OPEN)
UPDATE jobs SET status = 'ACTIVE' WHERE status = 'OPEN';