const { getExercise } = require("./get-exercise");

const badgePriorityCount = (sacks, count, ungroupedSacks) => {
  if (sacks.length === ungroupedSacks) return count;

  const [sack1, sack2, sack3] = sacks.slice(0, 3);

  const badgePriority =
    priority(findRepeatedItem(findRepeatedItems(sack1, sack2), findRepeatedItems(sack2, sack3)));

  return badgePriorityCount(sacks.slice(3), count + badgePriority, ungroupedSacks);
};

const priorityCount = (sacks, count) => {
  if ((sacks.length === 1 && sacks[0] === '\n') || sacks.length === 0) return count;

  const sack = sacks[0];
  const [sack1, sack2] = [sack.slice(0, sack.length/2), sack.slice(sack.length/2)];

  return priorityCount(sacks.slice(1), count + priority(findRepeatedItem(sack1, sack2)))
}

const findRepeatedItems = (sack1, sack2) => {
  return sack1.split('').reduce((repeated, nextItem) => {
    if (sack2.indexOf(nextItem) > -1) {
      return [...repeated, nextItem]
    }
    return repeated;
  }, [])
};

const findRepeatedItem = (sack1, sack2) => {
  for (let nextItem of sack1) {
    if (sack2.indexOf(nextItem) > -1) {
      return nextItem;
    }
  }
  return '';
};

const priority = item => {
  if (item === '') return 0;
  if (item.match(/[a-z]/)) return item.charCodeAt(0) - 96;
  if (item.match(/[A-Z]/)) return item.charCodeAt(0) - 65 + 27;
}

getExercise(3, false).then(input => {
  // console.log(priorityCount(input.split('\n'), 0));
  console.log(badgePriorityCount(input.split('\n'), 0, input.split('\n').length % 3));
});
