import { CheckCircle } from 'lucide-react'

export default function SuccessCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="card rounded-[24px] p-7 text-center md:p-10">
      <CheckCircle size={48} className="mx-auto mb-4 text-green-600" />
      <h2 className="display-sm mb-2">{title}</h2>
      <p className="text-ink-soft">{body}</p>
    </div>
  )
}
