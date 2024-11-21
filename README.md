# Linktree Clone - Kroxly

<div align="center">
  <img src="https://kroxly.com/upload/kroxly-linktree.png" style="width: 80%;">
</div>

---

## Tech Stack

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

---

## Project Setup

To get started with the project, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/kroxlycode/kroxly-linktree.git
```

### 2. Navigate to the project directory

```bash
cd kroxly-linktree
```

### 3. Install dependencies

```bash
npm install
```

## Configuration

### 1. Update GitHub Username

In the file ``src/Projects.js``, replace the GitHub username on line 75 with your own GitHub username to display your projects.

```bash
const username = 'kroxlycode';
````

### 2. Set Up Spotify API

In ``src/Spotify.js``, fill in your Spotify API credentials on lines 14, 15, and 16 with your personal ``refreshToken``, ``clientId``, and ``clientSecret`` for Spotify integration.

```bash
const refreshToken = 'your_refresh_token';
const clientId = 'your_client_id';
const clientSecret = 'your_client_secret';
````

## Start the Project

To run the project locally:

```bash
npm start
```

## Deployment

Deploy on platforms like [Vercel](https://vercel.com) or your preferred hosting provider.


