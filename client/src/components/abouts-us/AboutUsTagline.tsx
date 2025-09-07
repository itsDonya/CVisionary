const AboutUsTagline = ({ text }: { text: string }) => {
  return (
    <div className="w-max mx-auto bg-gradient-to-r from-pink-500/20 to-violet-500/20 border border-pink-500/30 rounded-full px-4 py-2 backdrop-blur-sm">
      <p className="text-pink-400 text-sm font-medium flex items-center">
        <span className="mr-2">⚡</span>
        {text}
      </p>
    </div>
  );
};

export default AboutUsTagline;
