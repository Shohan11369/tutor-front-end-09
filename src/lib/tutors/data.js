// export const fetchFeaturedTutors = async () => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-tutors`, { cache: 'no-store' });
//     if (!res.ok) return [];
//     const data = await res.json();
//     return data || [];
//   } catch (error) {
//     console.error("Error:", error);
//     return [];
//   }
// };

export const fetchFeaturedTutors = async () => {
  console.log("Current API URL:", process.env.NEXT_PUBLIC_API_URL);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/featured-tutors`,
      {
        next: { revalidate: 60 }, // প্রতি ৬০ সেকেন্ডে একবার ডাটা রিফ্রেশ হবে
      },
    );
    // ... বাকি কোড
    if (!res.ok) return [];
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
