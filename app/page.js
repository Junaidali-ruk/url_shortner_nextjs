import Image from "next/image";
import localFont from "next/font/local";
import Link from "next/link";

const poppins = localFont({
  src: "./fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppins",
  weight: "100 900",
});

export default function Home() {
  return (
    <main className="bg-gradient-to-r from-purple-300 to-purple-100 min-h-screen flex items-center justify-center p-6">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl">
        
        <div className="p-8 flex flex-col justify-center items-center text-center">
          <p className={`text-4xl font-bold text-purple-800 ${poppins.className}`}>
            WORLD'S BEST URL SHORTENER
          </p>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed max-w-md">
            A URL shortener is a simple and effective tool to convert long, complex URLs into short, easy-to-remember links. It turns lengthy web addresses into concise links that are much easier to share and manage, perfect for social media, emails, or websites.
          </p>
          <div className="flex gap-4 mt-8">
            <Link href="/shorten">
              <button className="bg-purple-600 hover:bg-purple-700 transition-colors rounded-full shadow-md px-6 py-2 font-semibold text-white">
                Try Now
              </button>
            </Link>
            <Link target="_blank" href="https://github.com/Junaidali-ruk">
              <button className="bg-gray-300 hover:bg-gray-400 transition-colors rounded-full shadow-md px-6 py-2 font-semibold text-gray-700">
                GitHub
              </button>
            </Link>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <Image
            alt="Vector illustration"
            src="/vector.jpg"
            layout="fill"
            objectFit="cover"
            className="opacity-90 mix-blend-multiply"
          />
        </div>
      </section>
    </main>
  );
}
