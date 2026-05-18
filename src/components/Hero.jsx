export default function Hero() {
  return (
    <header className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white py-24 px-4 overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,#0d9488_0%,transparent_50%)]"></div>
      
      <div className="relative max-w-4xl mx-auto text-center z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight uppercase opacity-15 text-slate-400 select-none mb-2">
          E-LEARNING
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold tracking-wide mb-4">
          Efficient Scheduling for Better Learning
        </h2>
        <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          Manage appointments, track availability, and ensure smooth communication between students and tutors with Tutors-Finder.
        </p>
        <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-md font-medium text-sm transition shadow-lg">
          Explore Features
        </button>
      </div>
    </header>
  );
}