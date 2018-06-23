DROP DATABASE emailwidget;
CREATE DATABASE emailwidget;

\c emailwidget;

DROP TABLE IF EXISTS contact;
DROP TABLE IF EXISTS block_lexicon;

CREATE TABLE contact (
  id SERIAL PRIMARY KEY,
  prefix TEXT,
  fname TEXT,
  mname TEXT,
  lname TEXT,
  suffix TEXT,
  email TEXT,
  campaign TEXT,
  subject TEXT,
  emailtext TEXT,
  emailhtml TEXT
);

CREATE TABLE block_lexicon (
  word TEXT
);

INSERT INTO block_lexicon (word)
VALUES
  ('cunt'),
  ('pussy'),
  ('faggot'),
  ('fuck'),
  ('asshole'),
  ('fucker'),
  ('dick'),
  ('ass');
