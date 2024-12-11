export const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };
  
  // Usage:
  const time = getRelativeTime("2024-03-11T15:30:00");