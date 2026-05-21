export const fetchFeaturedTutors = async () => {
  try {
    const res = await fetch("https://tutor-server-09.vercel.app/featured-tutors", { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};