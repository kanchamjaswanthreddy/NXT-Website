'use client'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
export default function FormSuccess({ title, body }: { title: string; body: string }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} role="status" className="card border-success p-10 text-center">
      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }} className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-success text-white"><Check size={26} strokeWidth={3} /></motion.span>
      <h2 className="display-sm mb-2">{title}</h2><p className="text-ink-soft">{body}</p>
    </motion.div>
  )
}
