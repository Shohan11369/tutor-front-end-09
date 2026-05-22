export const fetchFeaturedTutors = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-tutors`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};