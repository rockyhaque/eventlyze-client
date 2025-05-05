export function convertToISO(customDateTime: string): string | null {
    // Match custom formats like 'YYYY-MM-DD:HH:mm' or 'YYYY-MM-DD/HH:mm'
    const match = customDateTime.match(/^(\d{4}-\d{2}-\d{2})[:/](\d{2}):(\d{2})$/);
  
    if (!match) return null; // invalid format
  
    const [_, date, hour, minute] = match;
    const fullDate = `${date}T${hour}:${minute}:00Z`;
  
    const iso = new Date(fullDate).toISOString();
    return iso;
  }