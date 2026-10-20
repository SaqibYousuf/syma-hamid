-- Syma Hamid website — MySQL schema
-- Safe to run multiple times (uses IF NOT EXISTS).
-- Requires MySQL 5.7+ / MariaDB 10.2+ (JSON support).

CREATE TABLE IF NOT EXISTS admins (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  last_login_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_admins_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS assessments (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug VARCHAR(191) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  intro_text TEXT NULL,
  image VARCHAR(500) NULL,
  duration VARCHAR(100) NULL,
  closing_title VARCHAR(255) NULL,
  closing_text TEXT NULL,
  final_reflection TEXT NULL,
  is_published TINYINT(1) NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_assessments_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Result profiles, e.g. "The Overthinker"
CREATE TABLE IF NOT EXISTS assessment_profiles (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  assessment_id INT UNSIGNED NOT NULL,
  title VARCHAR(255) NOT NULL,
  short_description VARCHAR(500) NULL,
  image VARCHAR(500) NULL,
  quote TEXT NULL,
  core_insight TEXT NULL,
  notices JSON NULL,
  pattern_steps JSON NULL,
  reflection TEXT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY idx_profiles_assessment (assessment_id),
  CONSTRAINT fk_profiles_assessment FOREIGN KEY (assessment_id)
    REFERENCES assessments (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- type: 'choice' (scored, multiple choice) or 'text' (free-text reflection)
CREATE TABLE IF NOT EXISTS assessment_questions (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  assessment_id INT UNSIGNED NOT NULL,
  question TEXT NOT NULL,
  type VARCHAR(20) NOT NULL DEFAULT 'choice',
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY idx_questions_assessment (assessment_id),
  CONSTRAINT fk_questions_assessment FOREIGN KEY (assessment_id)
    REFERENCES assessments (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Each option points to the profile it counts towards
CREATE TABLE IF NOT EXISTS assessment_options (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  question_id INT UNSIGNED NOT NULL,
  option_text VARCHAR(500) NOT NULL,
  profile_id INT UNSIGNED NULL,
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY idx_options_question (question_id),
  KEY idx_options_profile (profile_id),
  CONSTRAINT fk_options_question FOREIGN KEY (question_id)
    REFERENCES assessment_questions (id) ON DELETE CASCADE,
  CONSTRAINT fk_options_profile FOREIGN KEY (profile_id)
    REFERENCES assessment_profiles (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- A completed assessment. Titles are copied ("snapshot") so results stay
-- readable even if the assessment is edited or deleted later.
CREATE TABLE IF NOT EXISTS assessment_submissions (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  assessment_id INT UNSIGNED NULL,
  assessment_title VARCHAR(255) NOT NULL,
  name VARCHAR(191) NOT NULL,
  email VARCHAR(191) NOT NULL,
  result_profile_id INT UNSIGNED NULL,
  result_profile_title VARCHAR(255) NULL,
  scores JSON NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_submissions_assessment (assessment_id),
  KEY idx_submissions_created (created_at),
  KEY idx_submissions_email (email),
  CONSTRAINT fk_submissions_assessment FOREIGN KEY (assessment_id)
    REFERENCES assessments (id) ON DELETE SET NULL,
  CONSTRAINT fk_submissions_profile FOREIGN KEY (result_profile_id)
    REFERENCES assessment_profiles (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS assessment_submission_answers (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  submission_id INT UNSIGNED NOT NULL,
  question_id INT UNSIGNED NULL,
  option_id INT UNSIGNED NULL,
  question_text TEXT NOT NULL,
  answer_text TEXT NULL,
  profile_title VARCHAR(255) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY idx_answers_submission (submission_id),
  CONSTRAINT fk_answers_submission FOREIGN KEY (submission_id)
    REFERENCES assessment_submissions (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
