export function formatDateTime(input: string | undefined): { date: string; time: string } {
    if (!input) return { date: "", time: "" }
  
    const parsedDate = new Date(input)
  
    if (isNaN(parsedDate.getTime())) return { date: "", time: "" }
  
    const date = parsedDate.toISOString().split("T")[0]
    const time = parsedDate.toISOString().split("T")[1].slice(0, 5)
  
    return { date, time }
  }
  

  export function formatTime(time: string | undefined) {
    if (!time) return null;
  
    const parsedDate = new Date(time);
  
    if (isNaN(parsedDate.getTime())) return null;
  
    return parsedDate.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
  