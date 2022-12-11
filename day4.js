const { getExercise } = require("./get-exercise");

const countOverlaps = (lines, count, overlapStrategy) => {
  if (lines.length === 0 || (lines.length === 1 && lines[0] === '')) {
    return count;
  } else {
    const [sections1, sections2] = lines[0].split(',');
    const totalOverlap = overlapStrategy(sections1, sections2);

    return countOverlaps(lines.slice(1), count + (totalOverlap ? 1 : 0), overlapStrategy);
  }
};

const hasTotalOverlap = (sections1, sections2) => {
  const [start1, end1] = sections1.split('-');
  const [start2, end2] = sections2.split('-');

  if (Number(start1) >= Number(start2) && Number(end1) <= Number(end2)) return true;

  return Number(start2) >= Number(start1) && Number(end2) <= Number(end1);
};

const hasPartialOverlap = (sections1, sections2) => {
  const [start1, end1] = sections1.split('-');
  const [start2, end2] = sections2.split('-');

  if (Number(start1) >= Number(start2) && Number(start1) <= Number(end2)) return true;

  return (Number(start2) >= Number(start1) && Number(start2) <= Number(end1));
};

getExercise(4, false).then(input => {
  // console.log(countOverlaps(input.split('\n'), 0, hasTotalOverlap));
  console.log(countOverlaps(input.split('\n'), 0, hasPartialOverlap));
});
