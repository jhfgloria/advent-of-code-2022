const { getExercise } = require("./get-exercise");

const topOfStacks = (stacks) => {
  return Object.values(stacks).map(stack => stack.pop()).join('');
};

const moveStacks9000 = (stacks, instructions) => {
  if (instructions.length === 0 || (instructions.length === 1 && instructions[0] === '')) {
    return stacks;
  }
  const [, size, from, to] = instructions[0].match(/move (\d+) from (\d+) to (\d+)/);

  for (let i = 0; i < size; i++) {
    stacks[to].push(stacks[from].pop());
  }

  return moveStacks9000(stacks, instructions.slice(1));
};

const moveStacks9001 = (stacks, instructions) => {
  if (instructions.length === 0 || (instructions.length === 1 && instructions[0] === '')) {
    return stacks;
  }
  const [, size, from, to] = instructions[0].match(/move (\d+) from (\d+) to (\d+)/);

  stacks[to].push(...stacks[from].splice(stacks[from].length - size));

  return moveStacks9001(stacks, instructions.slice(1));
};

const removeStacks = (map, stacks = []) => {
  if (Number(map[0][1]) > 0) return [stacks.reverse().reduce((acc, crates) => {
    for (const [stack, crate] of Object.entries(crates)) {
      acc[stack] = Array.isArray(acc[stack]) ? [...acc[stack], crate] : [crate];
    }
    return acc;
  }, {}), map.slice(2)];
  stacks.push(getStackInLine(map[0]));

  return removeStacks(map.slice(1), stacks);
};

const getStackInLine = (line, stacks = {}, stackNumber = 1) => {
  if (line[0] === ' ') return getStackInLine(line.slice(4), stacks, stackNumber + 1);

  const [crate, rest] = [line.slice(0, 3), line.slice(4)];
  stacks[stackNumber] = crate[1];

  if (rest.length > 0) return getStackInLine(rest, stacks, stackNumber + 1);
  return stacks;
};

getExercise(5, false).then(input => {
  const [stacks, instructions] = removeStacks(input.split('\n'));

  // console.log(topOfStacks(moveStacks9000(stacks, instructions)));
  console.log(topOfStacks(moveStacks9001(stacks, instructions)));
});
