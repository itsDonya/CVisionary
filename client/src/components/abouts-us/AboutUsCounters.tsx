const AboutUsCounters = () => {
  return (
    <div className="text-center mb-20">
      <h2 className="text-4xl font-bold mb-16 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
        Trusted by Professionals Worldwide
      </h2>
      <div className="grid md:grid-cols-4 gap-8">
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="text-4xl font-bold text-pink-400 mb-2">500K+</div>
          <div className="text-gray-300">Resumes Created</div>
        </div>
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="text-4xl font-bold text-purple-400 mb-2">150K+</div>
          <div className="text-gray-300">Active Users</div>
        </div>
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="text-4xl font-bold text-blue-400 mb-2">97%</div>
          <div className="text-gray-300">Success Rate</div>
        </div>
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="text-4xl font-bold text-indigo-400 mb-2">24/7</div>
          <div className="text-gray-300">AI Support</div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsCounters;
