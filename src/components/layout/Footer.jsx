import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"


const COLUMNS = [
  { title: "Company", links: ["About us", "Careers", "Team"] },
  { title: "Contact", links: ["Help and support", "Partner with us", "Ride with us"] },
  { title: "Legal", links: ["Terms and conditions", "Privacy policy", "Cookie policy"] },
]

const SOCIALS = [
  { Icon: FaInstagram, label: "Instagram" },
  { Icon: FaFacebook, label: "Facebook" },
  { Icon: FaTwitter, label: "Twitter" },
  { Icon: FaLinkedin, label: "LinkedIn" },
]


export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-lg font-black text-white">
                Q
              </span>
              <span className="text-xl font-extrabold tracking-tight">
                Quickbite
              </span>
            </div>

            <p className="mt-3 max-w-xs text-sm text-muted">
              Food delivery made fast and simple. Swiggy ke public API pe bana
              ek React learning project.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h2 className="mb-3 text-xs font-bold tracking-wider text-fg uppercase">
                {column.title}
              </h2>

              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-xs text-muted">
            © 2026 Quickbite. Made for learning purposes.
          </p>

          <div className="flex gap-1">
            {SOCIALS.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-accent"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
