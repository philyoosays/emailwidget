DROP DATABASE emailwidget;
CREATE DATABASE emailwidget;

\c emailwidget;

DROP TABLE IF EXISTS contact;
DROP TABLE IF EXISTS block_lexicon;
DROP TABLE IF EXISTS authorized;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS campaign;

CREATE TABLE campaign (
  id SERIAL PRIMARY KEY,
  org TEXT,
  name TEXT,
  recipient TEXT,
  recipientemail TEXT,
  subject TEXT,
  emailtext TEXT,
  created TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  fname TEXT,
  lname TEXT,
  email TEXT,
  pass_digest TEXT,
  org TEXT,
  active BOOLEAN DEFAULT TRUE,
  created TIMESTAMP DEFAULT NOW()
);

CREATE TABLE authorized (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE,
  org TEXT,
  taken BOOLEAN DEFAULT FALSE,
  created TIMESTAMP DEFAULT NOW()
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
  org TEXT,
  blocked BOOLEAN DEFAULT false,
  created TIMESTAMP DEFAULT NOW(),
  exported BOOLEAN DEFAULT false
);

CREATE TABLE block_lexicon (
  word TEXT
);

INSERT INTO authorized
(email, org)
VALUES
('philyoomail@gmail.com', 'admin'),
('philyoo@ymail.com', 'otherorg');

INSERT INTO campaign
(org, name, recipient, recipientemail, subject, emailtext)
VALUES
('admin', 'Mail Congressman', 'Mr. Yoo', 'philyoo@ymail.com', 'Please do what we want',
'We will bombard you with emails. I am #FIRST_NAME#.%0A%0DHa ha ha.%0A%0DYou will bend under our will because we are mighty and you are not.%0A%0DWith Love, %0A%0D#FIRST_NAME# #LAST_NAME#'),
('admin', 'Email Hospital Director', 'Your Mom', 'philyoomail@gmail.com', 'Do the thing or else',
'Dear Hospital Director,%0A%0DYou suck and I, #FIRST_NAME# #LAST_NAME#, hope you never see the color green ever again and perpetually lose your left shoe.%0A%0DWith love,%0A%0D#FIRST_NAME# #LAST_NAME#'),
('otherorg', 'Hit up Fake Dude', 'Philosophicles', 'philyoo@ymail.com', 'Test subject',
'Yo.%0A%0DWhy you so awesome?%0A%0DShare some of that awesome with us.%0A%0DRespectfully,%0A%0D#FIRST_NAME# #LAST_NAME#');

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
