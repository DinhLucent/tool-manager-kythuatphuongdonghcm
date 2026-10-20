# Data Model Specification — HCM Engineering Portal

This document outlines the entity relationships, schemas, and persistence rules for the HCM Engineering Portal.

---

## 1. Entity-Relationship Overview

```
 [auth.users] (Supabase Auth)
      | 1
      |
      | 1
   profiles (id, email, full_name, role, department)
      | 1
      |
      | 0..*
 equipment_bookings (id, equipment_id, user_id, purpose, site_name, status, dates)
      | 0..*
      |
      | 1
   equipment (id, asset_code, name, category, status, serial_number)

----------------------------------------------------------------------------------

 Independent Catalogues:
 - tools (id, name, slug, description, category, version, supported_os, download_url, sha256_checksum)
 - knowledge_documents (id, title, manufacturer, device_model, doc_type, keywords, document_url)
```

---

## 2. Table Definitions

### 2.1. `profiles`
User metadata extending Supabase `auth.users`.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY, REFERENCES auth.users(id) ON DELETE CASCADE | Matches Supabase Auth user ID |
| `email` | TEXT | NOT NULL, UNIQUE | Company email (@phuongdong.com.vn) |
| `full_name` | TEXT | NOT NULL | Technician's full name |
| `role` | TEXT | NOT NULL, CHECK (role IN ('engineer', 'admin')) DEFAULT 'engineer' | Access tier |
| `department` | TEXT | NOT NULL DEFAULT 'HCM Field Engineering' | Department name |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT NOW() | Record creation timestamp |
| `updated_at` | TIMESTAMPTZ | NOT NULL DEFAULT NOW() | Record last update timestamp |

### 2.2. `tools`
Internal engineering software catalogue.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY DEFAULT gen_random_uuid() | Unique identifier |
| `name` | TEXT | NOT NULL | Software name (e.g., "PhuongDong LIS Bridge") |
| `slug` | TEXT | NOT NULL, UNIQUE | URL-friendly identifier |
| `description` | TEXT | NOT NULL | Comprehensive description of functionality |
| `category` | TEXT | NOT NULL, CHECK (category IN ('lis_bridge', 'serial_driver', 'diagnostic', 'utility')) | Functional category |
| `version` | TEXT | NOT NULL | Semantic version string (e.g., "v2.4.1") |
| `supported_os` | TEXT[] | NOT NULL DEFAULT '{}' | List of supported OS (e.g., `{'Windows 10', 'Windows 11'}`) |
| `release_notes` | TEXT | NOT NULL | Changelog and deployment instructions |
| `download_url` | TEXT | NOT NULL | Public CDN / GitHub Release download link |
| `sha256_checksum` | TEXT | NULL | Optional 64-character SHA-256 integrity hash |
| `file_size_bytes` | BIGINT | NULL | Binary size in bytes |
| `is_active` | BOOLEAN | NOT NULL DEFAULT TRUE | Visibility flag |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT NOW() | Creation timestamp |

### 2.3. `knowledge_documents`
Technical service manuals, wiring schematics, and protocol specifications.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY DEFAULT gen_random_uuid() | Unique identifier |
| `title` | TEXT | NOT NULL | Document title |
| `manufacturer` | TEXT | NOT NULL | Equipment manufacturer (e.g., "Roche", "Sysmex", "Mindray") |
| `device_model` | TEXT | NOT NULL | Instrument model (e.g., "Cobas 6000", "XN-550") |
| `doc_type` | TEXT | NOT NULL, CHECK (doc_type IN ('service_manual', 'user_guide', 'interface_spec', 'troubleshooting_guide')) | Classification |
| `keywords` | TEXT[] | NOT NULL DEFAULT '{}' | Search tags & error codes |
| `document_url` | TEXT | NOT NULL | Storage link (Google Drive / CDN / Supabase Storage) |
| `file_size_bytes` | BIGINT | NULL | Document size in bytes |
| `summary` | TEXT | NULL | Abstract or briefing of contents |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT NOW() | Creation timestamp |

### 2.4. `equipment`
Shared hardware tools, measuring instruments, and diagnostic cables.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY DEFAULT gen_random_uuid() | Unique identifier |
| `asset_code` | TEXT | NOT NULL, UNIQUE | Internal asset identifier (e.g., "EQ-HCM-001") |
| `name` | TEXT | NOT NULL | Equipment name (e.g., "Moxa UPort 1150 RS-232/422/485") |
| `category` | TEXT | NOT NULL, CHECK (category IN ('interface_converter', 'calibrator', 'measuring', 'toolkit')) | Equipment type |
| `serial_number` | TEXT | NOT NULL | Factory serial number |
| `status` | TEXT | NOT NULL, CHECK (status IN ('available', 'in_use', 'maintenance')) DEFAULT 'available' | Current physical state |
| `location` | TEXT | NOT NULL DEFAULT 'HCM Office Cabinet A' | Physical storage location |
| `description` | TEXT | NULL | Specifications & accessories included |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT NOW() | Creation timestamp |

### 2.5. `equipment_bookings`
Custody tracking and checkout history for equipment.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PRIMARY KEY DEFAULT gen_random_uuid() | Unique identifier |
| `equipment_id` | UUID | NOT NULL, REFERENCES equipment(id) ON DELETE RESTRICT | Target equipment |
| `user_id` | UUID | NOT NULL, REFERENCES profiles(id) ON DELETE RESTRICT | Responsible engineer |
| `purpose` | TEXT | NOT NULL | Reason for checkout |
| `site_name` | TEXT | NOT NULL | Deployment hospital or laboratory name |
| `checkout_date` | TIMESTAMPTZ | NOT NULL DEFAULT NOW() | Time when checked out |
| `expected_return_date` | TIMESTAMPTZ | NOT NULL | Promised return date |
| `actual_return_date` | TIMESTAMPTZ | NULL | Timestamp of check-in |
| `status` | TEXT | NOT NULL, CHECK (status IN ('active', 'returned', 'cancelled')) DEFAULT 'active' | Booking lifecycle state |
| `notes` | TEXT | NULL | Condition upon return or remarks |
| `created_at` | TIMESTAMPTZ | NOT NULL DEFAULT NOW() | Creation timestamp |

---

## 3. Database Invariants & Double-Booking Prevention

### Critical Constraint: No Concurrent Active Bookings
To guarantee at the database level that no equipment item can have more than one active checkout at any time:

```sql
CREATE UNIQUE INDEX idx_unique_active_booking_per_equipment
ON equipment_bookings (equipment_id)
WHERE status = 'active';
```

If an engineer attempts to check out an item that already has a record with `status = 'active'`, the database will reject the transaction with a unique constraint violation.

---

## 4. Row-Level Security (RLS) Matrix

| Table | Operation | Engineer Policy | Admin Policy |
|---|---|---|---|
| `profiles` | SELECT | Read all profiles (directory lookup) | Read all |
| `profiles` | UPDATE | Can only update own profile (`auth.uid() = id`) | Can update any profile |
| `tools` | SELECT | Can view active tools (`is_active = true`) | Can view all |
| `tools` | INSERT/UPDATE/DELETE | Denied | Allowed |
| `knowledge_documents` | SELECT | Can view all documents | Can view all |
| `knowledge_documents` | INSERT/UPDATE/DELETE | Denied | Allowed |
| `equipment` | SELECT | Can view all equipment | Can view all |
| `equipment` | INSERT/UPDATE/DELETE | Denied | Allowed |
| `equipment_bookings` | SELECT | Can view all bookings | Can view all |
| `equipment_bookings` | INSERT | Can insert booking where `user_id = auth.uid()` and equipment is available | Allowed |
| `equipment_bookings` | UPDATE | Can update own active booking to 'returned' | Can update any booking |
