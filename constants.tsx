
import React from 'react';
import { Candidate, User } from './types';

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'c1',
    name: 'Sarah Johnson',
    party: 'Progressive Alliance',
    description: 'Focused on sustainable urban development and education reform.',
    imageUrl: 'https://picsum.photos/seed/sarah/400/300',
    voteCount: 0
  },
  {
    id: 'c2',
    name: 'Robert Chen',
    party: 'Liberty Conservative',
    description: 'Advocating for economic growth and digital infrastructure.',
    imageUrl: 'https://picsum.photos/seed/robert/400/300',
    voteCount: 0
  },
  {
    id: 'c3',
    name: 'Elena Rodriguez',
    party: 'Green Future',
    description: 'Committed to environmental justice and renewable energy initiatives.',
    imageUrl: 'https://picsum.photos/seed/elena/400/300',
    voteCount: 0
  }
];

export const INITIAL_VOTERS: User[] = [
  {
    id: 'v1',
    name: 'Voter One',
    email: 'voter1@test.com',
    voterId: 'VT-001',
    hasVoted: false,
    role: 'VOTER',
    password: 'password123'
  },
  {
    id: 'admin',
    name: 'Admin User',
    email: 'admin@securevote.com',
    hasVoted: false,
    role: 'ADMIN',
    password: 'admin'
  }
];

export const SQL_SCHEMA = `
-- Database: online_voting_db

CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE voters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    voter_id VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    has_voted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE candidates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    party VARCHAR(100) NOT NULL,
    description TEXT,
    image_path VARCHAR(255),
    vote_count INT DEFAULT 0
);

CREATE TABLE votes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    voter_id INT NOT NULL,
    candidate_id INT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (voter_id) REFERENCES voters(id),
    FOREIGN KEY (candidate_id) REFERENCES candidates(id),
    CONSTRAINT unique_voter UNIQUE (voter_id)
);

-- Sample Data
INSERT INTO admin (name, email, password) VALUES ('Administrator', 'admin@example.com', '$2y$10$8v5x...'); 
`;
