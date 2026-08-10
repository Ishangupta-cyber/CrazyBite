import { AlertTriangle } from "lucide-react"


const ErrorMessage = ({
  message = "Something went wrong... Try again later!",
}) => (
  <div className="flex items-start gap-3 rounded-2xl border border-nonveg/25 bg-nonveg/5 p-4">
    <AlertTriangle size={18} className="mt-0.5 shrink-0 text-nonveg" />

    <div>
      <p className="font-semibold text-fg">Kuch gadbad ho gayi</p>
      <p className="mt-0.5 text-sm text-muted">{message}</p>
    </div>
  </div>
)

export default ErrorMessage
