/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // যেকোনো ডোমেইন থেকে ছবি লোড করার জন্য
      },
    ],
  },
};

export default nextConfig; // এখানে module.exports এর পরিবর্তে export default ব্যবহার করুন