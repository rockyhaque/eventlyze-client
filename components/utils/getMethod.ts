const getMethod = async <T>(url: string): Promise<T | null> => {
    try {
      const res = await fetch(url, {
        method: "GET",
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText}`);
      }
  
      return res.json();
    } catch (error) {
      console.error("Error in getMethod:", error);
      return null;
    }
  };
  
  export default getMethod;
  