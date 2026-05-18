export default function Features() {
  return (
    <div className="bg-gray-50">
      {/* Why Choose Us */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Choose Tutors-Finder?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-lg mb-2 text-gray-900">Easy Booking</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Book tutors instantly with a smooth and simple interface.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md border-2 border-teal-500/20 relative">
            <h3 className="font-semibold text-lg mb-2 text-gray-900">Verified Tutors</h3>
            <p className="text-gray-500 text-sm leading-relaxed">All tutors are verified to ensure quality education.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-lg mb-2 text-gray-900">Flexible Scheduling</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Choose time slots that fit your daily routine.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-lg mb-2 text-gray-900">Affordable Pricing</h3>
            <p className="text-gray-500 text-sm leading-relaxed">Find tutors that match your budget easily.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50/50">
              <span className="text-2xl font-bold text-blue-600 block mb-3">01</span>
              <h4 className="font-semibold text-base mb-1 text-gray-900">Search Tutor</h4>
              <p className="text-gray-500 text-xs">Browse tutors by subject and availability.</p>
            </div>
            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50/50">
              <span className="text-2xl font-bold text-blue-600 block mb-3">02</span>
              <h4 className="font-semibold text-base mb-1 text-gray-900">Select Slot</h4>
              <p className="text-gray-500 text-xs">Choose your preferred date and time.</p>
            </div>
            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50/50">
              <span className="text-2xl font-bold text-blue-600 block mb-3">03</span>
              <h4 className="font-semibold text-base mb-1 text-gray-900">Book Session</h4>
              <p className="text-gray-500 text-xs">Confirm booking with one click.</p>
            </div>
            <div className="p-6 border border-gray-100 rounded-xl bg-gray-50/50">
              <span className="text-2xl font-bold text-blue-600 block mb-3">04</span>
              <h4 className="font-semibold text-base mb-1 text-gray-900">Start Learning</h4>
              <p className="text-gray-500 text-xs">Join your session and begin learning.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}