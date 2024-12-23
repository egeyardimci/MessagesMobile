export const getRelativeTime = (timestamp: string) => {
  const now = new Date();
  // Subtract 1 minute (60000 milliseconds) from current time
  const adjustedNow = new Date(now.getTime() + 60000);
  const date = new Date(timestamp);
  const diff = adjustedNow.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};