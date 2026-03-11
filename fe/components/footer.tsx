import Link from "next/link";
import {
  FacebookFilled,
  InstagramOutlined,
  TwitterOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

export default function Footer() {
  return (
    <footer className="bg-[#f4efe9] mt-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-x-8 gap-y-12">
        
        {/* Logo + Description + Social */}
        <div className="flex flex-col">
          <Link href="/" className="flex items-center gap-1 mb-4">
            <span className="text-[27px] font-bold tracking-[-1.5px] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
              Outfits
            </span>
            <span className="text-3xl font-bold text-rose-400 tracking-tighter">Lab</span>
          </Link>

          <p className="text-gray-600 text-[15px] leading-relaxed max-w-xs">
            Your personal 3D fashion studio.<br />
            Create, customize, and shop unique outfits.
          </p>

          {/* Social Icons - Hiện đại với hover scale + màu brand */}
          <div className="flex gap-4 mt-8">
            <a
              href="#"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-2xl bg-[#1877F2] text-white hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-md"
            >
              <FacebookFilled className="text-xl" />
            </a>
            <a
              href="#"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#F56040] via-[#C13584] to-[#833AB4] text-white hover:scale-110 hover:-rotate-6 transition-all duration-300 shadow-md"
            >
              <InstagramOutlined className="text-xl" />
            </a>
            <a
              href="#"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-2xl bg-black text-white hover:scale-110 hover:rotate-6 transition-all duration-300 shadow-md"
            >
              <TwitterOutlined className="text-xl" />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="font-semibold text-lg mb-5 text-gray-800">Shop</h3>
          <ul className="space-y-3 text-[15px]">
            {[
              { text: "Browse Outfits", href: "#" },
              { text: "Design Your Own", href: "#" },
              { text: "Featured Sellers", href: "#" },
              { text: "New Collections", href: "#" },
            ].map((item) => (
              <li key={item.text}>
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-rose-500 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* For Sellers */}
        <div>
          <h3 className="font-semibold text-lg mb-5 text-gray-800">For Sellers</h3>
          <ul className="space-y-3 text-[15px]">
            {[
              { text: "Become a Seller", href: "#" },
              { text: "Seller Dashboard", href: "#" },
              { text: "Seller Resources", href: "#" },
              { text: "Success Stories", href: "#" },
            ].map((item) => (
              <li key={item.text}>
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-rose-500 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Stay Updated */}
        <div>
          <h3 className="font-semibold text-lg mb-5 text-gray-800">Get in touch</h3>
          
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-rose-100 text-rose-500">
                <MailOutlined className="text-lg" />
              </div>
              <a href="mailto:hello@outfitslab.com" className="hover:text-rose-500 transition-colors">
                hello@outfitslab.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-rose-100 text-rose-500">
                <PhoneOutlined className="text-lg" />
              </div>
              <a href="tel:+1234567890" className="hover:text-rose-500 transition-colors">
                +1 (234) 567-890
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-xl bg-rose-100 text-rose-500">
                <EnvironmentOutlined className="text-lg" />
              </div>
              <span>San Francisco, CA, USA</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-[#f0e9df]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 OutfitsLab. All rights reserved.</p>
          
          <div className="flex gap-6">
            <Link href="#" className="hover:text-gray-700 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-700 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-gray-700 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}