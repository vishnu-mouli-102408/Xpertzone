export const formatTimeRemaining = (timeRemaining: number) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const getTimeDiff = (startedAt: Date) => {
  const now = new Date();
  const timeDiff = Math.max(
    0,
    Math.floor((startedAt.getTime() - now.getTime()) / 1000)
  );
  return timeDiff;
};
