# QuizChem — Kahoot-Style Multiplayer Quiz
## Matter & Quantitative Chemistry | IGCSE Grade 9

---

## HOW TO DEPLOY (GitHub + Render) — Step by Step

### STEP 1 — Upload to GitHub
1. Go to github.com and sign in (or create a free account)
2. Click the green **"New"** button to create a new repository
3. Name it: `quizchem` (or anything you want)
4. Make it **Public**
5. Click **"Create repository"**
6. Click **"uploading an existing file"**
7. Drag and drop ALL these files into the box:
   - `server.js`
   - `package.json`
   - `public/index.html`
8. Click **"Commit changes"**

### STEP 2 — Deploy on Render
1. Go to **render.com** and sign in with your GitHub account
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect"** next to your `quizchem` repository
4. Fill in these settings:
   - **Name**: quizchem (or anything)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click **"Create Web Service"**
6. Wait 2-3 minutes for it to deploy
7. You'll get a URL like: `https://quizchem-xxxx.onrender.com`

**That URL is your shareable link. Send it to everyone.**

---

## HOW TO PLAY

### As HOST:
1. Open the link
2. Click **"Host"**
3. A 6-letter room code appears on screen
4. Share that code with your friends
5. When everyone has joined, click **"Start Game"**
6. After each question, click **"Next Question"**
7. See the final podium at the end

### As PLAYER:
1. Open the same link on your phone/laptop
2. Click **"Join"**
3. Enter the room code + your name
4. Wait for the host to start
5. Tap your answer before the 60 second timer runs out
6. See your rank on the leaderboard after each question

---

## SCORING
- Correct answer: 1000 points base
- Time bonus: up to 600 extra points for answering quickly
- Streak bonus: +100 per consecutive correct answer (up to +500)

---

## TOPICS COVERED (20 questions)
- Atomic Structure (protons, neutrons, isotopes, Ar)
- The Mole & Avogadro's Number
- Molar Mass calculations
- Percentage Composition
- Empirical & Molecular Formula
- Stoichiometry & Limiting Reagent
- Concentration (mol/dm3)
- Percentage Yield
- Atom Economy

---

## TECHNICAL NOTE
Render's free tier spins down after 15 minutes of inactivity.
The first person to open the link after inactivity may wait ~30 seconds for it to wake up.
This is normal — just refresh if it seems slow.
