/**
 * Chhota reusable error banner — jab fetch fail ho jaye.
 * Ek hi jagah rakha hai taaki har page pe error ek jaisa dikhe.
 */
const ErrorMessage = ({ message = "Kuch gadbad ho gayi. Thodi der baad try karo." }) => (
  <p className="text-red-500 py-6">{message}</p>
)

export default ErrorMessage
