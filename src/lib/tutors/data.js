export const fetchFeaturedTutors = async () => {
  try {
    const res = await fetch("http://localhost:8080/featured-tutors", { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};