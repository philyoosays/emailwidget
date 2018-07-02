-- DROP DATABASE emailwidget;
-- CREATE DATABASE emailwidget;

-- \c emailwidget;

-- DROP TABLE IF EXISTS contact;
-- DROP TABLE IF EXISTS block_lexicon;

CREATE TABLE campaign (
  id SERIAL PRIMARY KEY,
  org TEXT,
  name TEXT,
  recipient TEXT,
  subject TEXT,
  emailtext TEXT
);

CREATE TABLE contact (
  id SERIAL PRIMARY KEY,
  prefix TEXT,
  fname TEXT,
  mname TEXT,
  lname TEXT,
  suffix TEXT,
  email TEXT,
  campaignid INTEGER REFERENCES campaign(id),
  subject TEXT,
  emailtext TEXT,
  emailhtml TEXT,
  blocked BOOLEAN DEFAULT false
);

CREATE TABLE block_lexicon (
  word TEXT
);

INSERT INTO campaign
(org, name, recipient, subject, emailtext)
VALUES
('SFLA', 'Mail Congressman', 'philyoo@ymail.com', 'Please do what we want',
'We will bombard you with emails. Ha ha ha. You will bend under our will because we are mighty and you are not.');

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
