import { useState } from "react"
import { useUser } from "../../context/UserContext"

const LoginModal = ({ onClose }) => {
  const [name, setName] = useState("")
  const { login } = useUser()

  const handleSubmit = (e) => {
    // form ka default behaviour page reload hai — usse rokte hain taaki React control mein rahe
    e.preventDefault()
    if (!name.trim()) return
    login(name.trim())
    onClose()
  }

  return (
    // fixed inset-0 = poori screen dhaak lo, uske upar center mein chhota form
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-80 max-w-full rounded-2xl bg-surface p-6 shadow-card"
      >
        <h2 className="mb-4 text-lg font-bold">What's your name?</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          autoFocus
          className="mb-4 w-full rounded-lg border border-line bg-surface-2 px-3 py-2 text-fg outline-none placeholder:text-muted focus:border-accent"
        />

        <div className="flex gap-2">
          {/* type="button" zaroori hai — warna ye bhi form submit kar dega */}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-lg border border-line py-2 text-sm font-medium text-muted transition-colors hover:text-fg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 cursor-pointer rounded-lg bg-accent py-2 text-sm font-semibold text-white transition-opacity hover:opacity-85"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginModal
