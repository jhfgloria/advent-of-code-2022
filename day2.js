const { getExercise } = require('./get-exercise');

const scoreboard = (input, count, myHandStrategy) => {
  if (input.length === 0 || (input.length === 1 && input[0] === '')) {
    console.log(count);
  } else {
    const [p1, p2] = input[0].split(' ');
    const tp1 = translateHand(p1);
    const tp2 = myHandStrategy(p2, p1);
    return scoreboard(input.slice(1), count + matchScore(tp1, tp2), myHandStrategy);
  }
};

const matchScore = (p1, p2) => {
  if (p1 === p2) {
    return 3 + handScore(p2);
  } else if (
    p1 === 'Rock' && p2 === 'Scissor' ||
    p1 === 'Scissor' && p2 === 'Paper' ||
    p1 === 'Paper' && p2 === 'Rock'
  ) {
    return handScore(p2);
  } else {
    return 6 + handScore(p2);
  }
};

const handScore = hand => {
  switch (hand) {
    case 'Rock': return 1;
    case 'Paper': return 2;
    case 'Scissor': return 3;
  }
};

const translateHand = hand => {
  switch (hand) {
    case 'A':
    case 'X': return 'Rock';
    case 'B':
    case 'Y': return 'Paper';
    case 'C':
    case 'Z': return 'Scissor';
  }
}

const pretendedHand = (outcome, foesHand) => {
  if (
    (foesHand === 'A' && outcome === 'X') ||
    (foesHand === 'B' && outcome === 'Z') ||
    (foesHand === 'C' && outcome === 'Y')
  ) return 'Scissor';
  if (
    (foesHand === 'A' && outcome === 'Y') ||
    (foesHand === 'B' && outcome === 'X') ||
    (foesHand === 'C' && outcome === 'Z')
  ) return 'Rock';
  if (
    (foesHand === 'A' && outcome === 'Z') ||
    (foesHand === 'B' && outcome === 'Y') ||
    (foesHand === 'C' && outcome === 'X')
  ) return 'Paper';
}

getExercise(2, false).then(input => {
  // scoreboard(input.split('\n'), 0, translateHand);
  scoreboard(input.split('\n'), 0, pretendedHand);
});
