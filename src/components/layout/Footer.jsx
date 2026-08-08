import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"

// Purely static footer — koi state ya data nahi, sirf markup
export default function Footer() {
  return (
    <div className="bg-gray-900 text-gray-300 px-16 pt-10 pb-6">

      <div className="grid grid-cols-5 gap-6 mb-8">
        <div>
          <h2 className="font-bold text-xl text-white mb-2">Quickbite</h2>
          <p className="text-sm text-gray-400">Food delivery made fast and simple.</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-white mb-1">Company</h2>
          <p className="text-sm hover:text-white cursor-pointer">About us</p>
          <p className="text-sm hover:text-white cursor-pointer">Careers</p>
          <p className="text-sm hover:text-white cursor-pointer">Team</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-white mb-1">Contact</h2>
          <p className="text-sm hover:text-white cursor-pointer">Help and support</p>
          <p className="text-sm hover:text-white cursor-pointer">Partner with us</p>
          <p className="text-sm hover:text-white cursor-pointer">Ride with us</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-white mb-1">Legal</h2>
          <p className="text-sm hover:text-white cursor-pointer">Terms and conditions</p>
          <p className="text-sm hover:text-white cursor-pointer">Privacy policy</p>
          <p className="text-sm hover:text-white cursor-pointer">Cookie policy</p>
        </div>

        <div>
          <h2 className="font-bold text-white mb-2">Follow us</h2>
          <div className="flex gap-3">
            <FaInstagram size={18} className="cursor-pointer hover:text-white" />
            <FaFacebook size={18} className="cursor-pointer hover:text-white" />
            <FaTwitter size={18} className="cursor-pointer hover:text-white" />
            <FaLinkedin size={18} className="cursor-pointer hover:text-white" />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-4 flex justify-between text-xs text-gray-500">
        <p>© 2026 Quickbite. All rights reserved.</p>
        <p>Made for learning purposes</p>
      </div>

    </div>
  )
}