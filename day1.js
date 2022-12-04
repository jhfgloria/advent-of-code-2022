const { getExercise } = require('./get-exercise');

const nthMostCalories = (input, currentCount, nthCount) => {
  if (input.length === 0) {
    console.log(Math.max(currentCount, nthCount));
  }
  else if (input[0] !== '') {
    return nthMostCalories(input.slice(1), currentCount + Number(input[0]), nthCount);
  }
  else {
    return nthMostCalories(input.slice(1), 0, Math.max(currentCount + Number(input[0]), nthCount));
  }
};

const topThreeMostCalories = (input, currentCount, topCount) => {
  if (input.length === 0) {
    console.log(takeTopThree([...topCount, currentCount]).reduce((acc, next) => acc + next, 0));
  }
  else if (input[0] !== '') {
    return topThreeMostCalories(input.slice(1), currentCount + Number(input[0]), topCount);
  }
  else {
    return topThreeMostCalories(input.slice(1), 0, takeTopThree([...topCount, currentCount]));
  }
};

const takeTopThree = top => top.sort((a, b) => b - a).slice(0, 3);

getExercise(1, false).then(input => {
  // nthMostCalories(input.split('\n'), 0, 0);
  topThreeMostCalories(input.split('\n'), 0, []);
});
