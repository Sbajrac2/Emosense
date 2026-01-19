export const getRandomFeedback = (type) => {
  const positive = ['Well done!', 'That\'s right!', 'Nice work!', 'Correct!', 'Great!'];
  const tryAgain = ['Try again', 'Give it another try', 'Not quite right', 'Try once more'];
  const encourage = ['Nice try', 'Keep trying', 'Almost there', 'Good effort'];
  
  if (type === 'positive') return positive[Math.floor(Math.random() * positive.length)];
  if (type === 'tryAgain') return tryAgain[Math.floor(Math.random() * tryAgain.length)];
  return encourage[Math.floor(Math.random() * encourage.length)];
};