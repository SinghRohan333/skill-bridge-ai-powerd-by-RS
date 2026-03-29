const Footer = () => {
  return (
    <div className="border-t border-white/5 py-5 px-4 mt-8">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs text-white/20">
          © {new Date().getFullYear()} Skill Bridge AI. Designed & Developed by{" "}
          <span className="text-violet-400 font-medium">Rohan Singh</span>. All
          rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
