// export const fetchCourses = async (searchTerm = '') => {
//   console.log();

//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses?search=${searchTerm}`);
//   const data = await res.json();
//   return data || [];
// };

// export const fetchFeaturedCourses = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured`);
//   const data = await res.json();
//   return data || [];
// };

// ১. সব টিউটর এবং সার্চ ফিল্টারিংয়ের জন্য ফাংশন
export const fetchTutors = async (searchTerm = '') => {
  try {
    // এপিআই এন্ডপয়েন্ট আপডেট করে /tutors করা হলো
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors?search=${searchTerm}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching tutors:", error);
    return [];
  }
};

// ২. হোম পেজের জন্য ফিচার্ড বা অ্যাভেইলেবল টিউটর নিয়ে আসার ফাংশন
export const fetchFeaturedTutors = async () => {
  try {
    // এপিআই এন্ডপয়েন্ট আপডেট করে /featured-tutors করা হলো
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-tutors`, {
      cache: 'no-store'
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching featured tutors:", error);
    return [];
  }
};