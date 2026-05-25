const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// ── QUESTIONS ──
const QUESTIONS = [
  {
    q: 'An atom of carbon-12 has 6 protons. How many neutrons does it have?',
    opts: ['2', '4', '6', '12'],
    ans: 2,
    topic: 'Atomic Structure',
    exp: 'Mass number = protons + neutrons. Carbon-12 has mass number 12 and 6 protons. Neutrons = 12 - 6 = 6.'
  },
  {
    q: 'What is the relative atomic mass (Ar) of an element?',
    opts: ['The number of protons in the nucleus', 'The mass of one atom in grams', 'The weighted average mass of all isotopes relative to 1/12 the mass of carbon-12', 'The number of neutrons plus electrons'],
    ans: 2,
    topic: 'Atomic Structure',
    exp: 'Ar is a weighted average accounting for natural abundance of each isotope. For example, chlorine Ar = 35.5 because it is ~75% Cl-35 and ~25% Cl-37.'
  },
  {
    q: 'Isotopes of the same element have the same number of protons but different numbers of...',
    opts: ['Electrons', 'Protons', 'Neutrons', 'Bonds'],
    ans: 2,
    topic: 'Atomic Structure',
    exp: 'Isotopes: same atomic number (same protons = same element) but different mass numbers (different neutrons). E.g. C-12 has 6 neutrons, C-14 has 8 neutrons.'
  },
  {
    q: 'How many particles are in one mole of any substance?',
    opts: ['1.0 x 10^23', '6.02 x 10^23', '3.01 x 10^23', '6.02 x 10^24'],
    ans: 1,
    topic: 'The Mole',
    exp: "Avogadro's number = 6.02 x 10^23 particles per mole. Applies to atoms, molecules, ions - any particle."
  },
  {
    q: 'How many moles are in 44g of CO2? (Ar: C=12, O=16)',
    opts: ['1 mol', '2 mol', '0.5 mol', '4 mol'],
    ans: 0,
    topic: 'The Mole',
    exp: 'Mr of CO2 = 12 + (16x2) = 44 g/mol. Moles = mass / Mr = 44 / 44 = 1 mol.'
  },
  {
    q: 'What is the mass of 0.5 mol of H2O? (Ar: H=1, O=16)',
    opts: ['9g', '18g', '36g', '4g'],
    ans: 0,
    topic: 'The Mole',
    exp: 'Mr of H2O = (1x2) + 16 = 18 g/mol. Mass = moles x Mr = 0.5 x 18 = 9g.'
  },
  {
    q: 'How many moles are in 5.6g of nitrogen gas (N2)? (Ar: N=14)',
    opts: ['0.1 mol', '0.2 mol', '0.4 mol', '2 mol'],
    ans: 1,
    topic: 'The Mole',
    exp: 'Mr of N2 = 14x2 = 28 g/mol. Moles = 5.6 / 28 = 0.2 mol. N2 is diatomic - use Mr = 28.'
  },
  {
    q: 'What is the percentage by mass of oxygen in H2O? (Ar: H=1, O=16)',
    opts: ['11.1%', '50%', '88.9%', '25%'],
    ans: 2,
    topic: '% Composition',
    exp: 'Mr of H2O = 18. Mass of O = 16. % = (16/18) x 100 = 88.9%.'
  },
  {
    q: 'What is the percentage by mass of iron in Fe2O3? (Ar: Fe=56, O=16)',
    opts: ['30%', '70%', '50%', '40%'],
    ans: 1,
    topic: '% Composition',
    exp: 'Mr of Fe2O3 = (56x2) + (16x3) = 112 + 48 = 160. Mass of Fe = 112. % = (112/160) x 100 = 70%.'
  },
  {
    q: 'A compound contains 40% C, 6.7% H, 53.3% O by mass. What is the empirical formula? (Ar: C=12, H=1, O=16)',
    opts: ['CH2O', 'C2H4O2', 'CH4O', 'C3H6O3'],
    ans: 0,
    topic: 'Empirical Formula',
    exp: 'Divide % by Ar: C=3.33, H=6.7, O=3.33. Divide by smallest (3.33): C=1, H=2, O=1. Empirical formula = CH2O.'
  },
  {
    q: 'What is the difference between empirical and molecular formula?',
    opts: ['They are the same thing', 'Empirical shows the simplest whole number ratio; molecular shows the actual number of atoms in one molecule', 'Molecular formula is only for ionic compounds', 'Empirical formula shows the mass of each element'],
    ans: 1,
    topic: 'Empirical Formula',
    exp: 'Empirical: simplest ratio (CH2O for glucose). Molecular: actual number (C6H12O6 for glucose). Molecular = empirical x n.'
  },
  {
    q: 'The empirical formula of a compound is CH2. Its Mr is 56. What is the molecular formula? (Ar: C=12, H=1)',
    opts: ['CH2', 'C2H4', 'C4H8', 'C3H6'],
    ans: 2,
    topic: 'Empirical Formula',
    exp: 'Mr of CH2 = 14. n = 56/14 = 4. Molecular formula = CH2 x 4 = C4H8.'
  },
  {
    q: 'In: 2H2 + O2 -> 2H2O, how many moles of water form from 4 mol of H2?',
    opts: ['2 mol', '4 mol', '8 mol', '1 mol'],
    ans: 1,
    topic: 'Stoichiometry',
    exp: 'Molar ratio H2:H2O = 2:2 = 1:1. So 4 mol H2 produces 4 mol H2O. Always use the ratio from the balanced equation.'
  },
  {
    q: 'What mass of CO2 forms when 24g of carbon burns? C + O2 -> CO2 (Ar: C=12, O=16)',
    opts: ['44g', '22g', '88g', '12g'],
    ans: 2,
    topic: 'Stoichiometry',
    exp: 'Moles of C = 24/12 = 2 mol. Ratio C:CO2 = 1:1, so 2 mol CO2. Mass = 2 x 44 = 88g.'
  },
  {
    q: 'Which reactant is the LIMITING REAGENT?',
    opts: ['The reactant present in the largest amount', 'The reactant in excess after the reaction', 'The reactant completely used up first - it determines max product formed', 'The product with the smallest Mr'],
    ans: 2,
    topic: 'Stoichiometry',
    exp: 'Limiting reagent is used up completely first. Once it runs out the reaction stops. Identify by calculating moles and comparing to stoichiometric ratio.'
  },
  {
    q: 'What is the concentration of a solution made by dissolving 4g of NaOH in 500cm3 of water? (Mr NaOH = 40)',
    opts: ['0.1 mol/dm3', '0.2 mol/dm3', '0.5 mol/dm3', '2 mol/dm3'],
    ans: 1,
    topic: 'Concentration',
    exp: 'Moles of NaOH = 4/40 = 0.1 mol. Volume = 500cm3 = 0.5 dm3. Concentration = 0.1/0.5 = 0.2 mol/dm3. Always convert cm3 to dm3 by dividing by 1000.'
  },
  {
    q: 'How many moles of HCl are in 250cm3 of a 2 mol/dm3 solution?',
    opts: ['0.5 mol', '2 mol', '0.25 mol', '8 mol'],
    ans: 0,
    topic: 'Concentration',
    exp: 'Moles = concentration x volume(dm3). Volume = 250/1000 = 0.25 dm3. Moles = 2 x 0.25 = 0.5 mol.'
  },
  {
    q: 'A reaction theoretically produces 20g of product but only 15g is obtained. What is the percentage yield?',
    opts: ['75%', '80%', '25%', '133%'],
    ans: 0,
    topic: '% Yield',
    exp: '% yield = (actual yield / theoretical yield) x 100 = (15/20) x 100 = 75%.'
  },
  {
    q: 'What does a HIGH atom economy indicate?',
    opts: ['The reaction is slow', 'Most atoms in reactants end up in the desired product - less waste, more sustainable', 'The reaction produces lots of by-products', 'The percentage yield is high'],
    ans: 1,
    topic: 'Atom Economy',
    exp: 'Atom economy = (Mr of desired product / total Mr of all products) x 100. High atom economy = less waste = more sustainable.'
  },
  {
    q: 'Atom economy = ?',
    opts: ['(actual yield / theoretical yield) x 100', '(Mr of desired product / sum of Mr of ALL products) x 100', '(mass of reactants / mass of products) x 100', '(moles of product / moles of reactant) x 100'],
    ans: 1,
    topic: 'Atom Economy',
    exp: 'Atom economy measures how efficiently atoms are converted to useful product. Different from % yield - % yield measures how much of the max you got; atom economy measures how wasteful the pathway is.'
  }
];

// ── ROOM STORE ──
const rooms = {};

function makeCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

io.on('connection', (socket) => {

  // HOST creates a room
  socket.on('host:create', () => {
    const code = makeCode();
    rooms[code] = {
      host: socket.id,
      players: {},
      questions: shuffle(QUESTIONS),
      currentQ: -1,
      state: 'lobby',   // lobby | question | reveal | leaderboard | end
      timer: null,
      answers: {}
    };
    socket.join(code);
    socket.emit('host:created', { code });
    console.log(`Room created: ${code}`);
  });

  // PLAYER joins a room
  socket.on('player:join', ({ code, name }) => {
    const room = rooms[code.toUpperCase()];
    if (!room) { socket.emit('error', 'Room not found'); return; }
    if (room.state !== 'lobby') { socket.emit('error', 'Game already started'); return; }
    if (!name || name.trim().length < 1) { socket.emit('error', 'Enter a name'); return; }

    const cleanName = name.trim().substring(0, 16);
    room.players[socket.id] = { name: cleanName, score: 0, streak: 0 };
    socket.join(code.toUpperCase());
    socket.emit('player:joined', { name: cleanName, code: code.toUpperCase() });

    // Tell host about new player
    io.to(room.host).emit('host:playerJoined', {
      players: Object.values(room.players).map(p => p.name),
      count: Object.keys(room.players).length
    });
    console.log(`${cleanName} joined ${code}`);
  });

  // HOST starts game
  socket.on('host:start', () => {
    const code = getHostRoom(socket.id);
    if (!code) return;
    const room = rooms[code];
    room.state = 'question';
    sendNextQuestion(code);
  });

  // PLAYER answers
  socket.on('player:answer', ({ answerIdx }) => {
    const code = getPlayerRoom(socket.id);
    if (!code) return;
    const room = rooms[code];
    if (room.state !== 'question') return;
    if (room.answers[socket.id] !== undefined) return; // already answered

    const q = room.questions[room.currentQ];
    const correct = answerIdx === q.ans;
    const timeBonus = Math.max(0, room.timeLeft || 0);
    const points = correct ? 1000 + Math.round(timeBonus * 10) : 0;

    if (correct) {
      room.players[socket.id].streak++;
      const streakBonus = Math.min(room.players[socket.id].streak - 1, 5) * 100;
      room.players[socket.id].score += points + streakBonus;
    } else {
      room.players[socket.id].streak = 0;
    }

    room.answers[socket.id] = answerIdx;
    socket.emit('player:answerReceived', { correct, points: room.players[socket.id].score });

    // Update host answer count
    const total = Object.keys(room.players).length;
    const answered = Object.keys(room.answers).length;
    io.to(room.host).emit('host:answerCount', { answered, total });

    // Auto-reveal when everyone answered
    if (answered >= total) {
      clearTimeout(room.timer);
      revealAnswer(code);
    }
  });

  // HOST moves to next question
  socket.on('host:next', () => {
    const code = getHostRoom(socket.id);
    if (!code) return;
    const room = rooms[code];
    if (room.currentQ + 1 >= room.questions.length) {
      endGame(code);
    } else {
      sendNextQuestion(code);
    }
  });

  // HOST ends game early
  socket.on('host:end', () => {
    const code = getHostRoom(socket.id);
    if (!code) return;
    endGame(code);
  });

  // DISCONNECT
  socket.on('disconnect', () => {
    // Clean up player
    for (const code in rooms) {
      const room = rooms[code];
      if (room.players[socket.id]) {
        delete room.players[socket.id];
        io.to(room.host).emit('host:playerJoined', {
          players: Object.values(room.players).map(p => p.name),
          count: Object.keys(room.players).length
        });
      }
      // Clean up host
      if (room.host === socket.id) {
        io.to(code).emit('game:hostLeft');
        clearTimeout(room.timer);
        delete rooms[code];
      }
    }
  });
});

function getHostRoom(socketId) {
  for (const code in rooms) {
    if (rooms[code].host === socketId) return code;
  }
  return null;
}

function getPlayerRoom(socketId) {
  for (const code in rooms) {
    if (rooms[code].players[socketId]) return code;
  }
  return null;
}

function sendNextQuestion(code) {
  const room = rooms[code];
  room.currentQ++;
  room.answers = {};
  room.state = 'question';
  room.timeLeft = 60;

  const q = room.questions[room.currentQ];
  const total = room.questions.length;

  // Send to host (with answer)
  io.to(room.host).emit('host:question', {
    q: q.q,
    opts: q.opts,
    ans: q.ans,
    topic: q.topic,
    num: room.currentQ + 1,
    total,
    timeLeft: 60
  });

  // Send to players (without answer)
  Object.keys(room.players).forEach(pid => {
    io.to(pid).emit('player:question', {
      q: q.q,
      opts: q.opts,
      topic: q.topic,
      num: room.currentQ + 1,
      total,
      timeLeft: 60
    });
  });

  // Countdown
  let t = 60;
  room.timer = setInterval(() => {
    t--;
    room.timeLeft = t;
    io.to(code).emit('game:tick', { timeLeft: t });
    if (t <= 0) {
      clearInterval(room.timer);
      revealAnswer(code);
    }
  }, 1000);
}

function revealAnswer(code) {
  const room = rooms[code];
  if (room.state === 'reveal') return;
  room.state = 'reveal';
  clearInterval(room.timer);

  const q = room.questions[room.currentQ];
  const leaderboard = getLeaderboard(room);

  io.to(code).emit('game:reveal', {
    ans: q.ans,
    exp: q.exp,
    leaderboard,
    hasNext: room.currentQ + 1 < room.questions.length
  });
}

function endGame(code) {
  const room = rooms[code];
  if (!room) return;
  clearInterval(room.timer);
  const leaderboard = getLeaderboard(room);
  io.to(code).emit('game:end', { leaderboard });
  room.state = 'end';
}

function getLeaderboard(room) {
  return Object.values(room.players)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((p, i) => ({ rank: i + 1, name: p.name, score: p.score }));
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
