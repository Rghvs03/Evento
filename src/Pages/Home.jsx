import { BoxesIcon } from "lucide-react";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[91vh] overflow-hidden flex flex-col items-center justify-center px-6 sm:px-12 py-12 bg-gradient-to-br from-white via-[#f02e65]/10 to-[#a2d9ff]/20">
      <div className="max-w-lg flex flex-col gap-5 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold font-serif text-[#f02e65] mb-2 drop-shadow-md">
          Welcome to EventO{" "}
        </h1>
        <p className="text-lg sm:text-xl text-gray-800 mb-4 leading-relaxed">
          Your college’s ultimate hub for every fest, event, and celebration —
          all in one place,
          <br className="hidden sm:block" />
          <span className="text-gray-600">
            because managing events should be as fun as attending them 🎉
          </span>
        </p>

        <button
          className="inline-block px-8 py-3 rounded-full bg-[#f02e65] text-white font-semibold text-lg shadow-md hover:bg-pink-700 transition"
          onClick={() => navigate("/Auth")}
        >
          Get Started
        </button>
      </div>
      {/* Optional: Add your hero vector image or SVG here */}
      {/* <img src="/src/assets/hero-image.svg" alt="Event Management" className="w-60 mt-10" /> */}

      <BoxesIcon className="mt-10 text-[#f02e65] animate-bounce" size={50} />
    </section>
  );
};

export default Home;
