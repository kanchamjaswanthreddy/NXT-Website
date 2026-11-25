'use client'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

/** Routes that bring their own header and footer (the earlier design preview). */
const OWN_FRAME = ['/preview']

/**
 * The frame, header, main area, closing tile and footer around a page. Pages under OWN_FRAME are
 * handed back bare so they can lay out the whole screen themselves.
 */
export default function SiteFrame({ frame, nav, closing, footer, children }: { frame: ReactNode; nav: ReactNode; closing: ReactNode; footer: ReactNode; children: ReactNode }) {
  const path = usePathname() ?? ''
  if (OWN_FRAME.some((p) => path === p || path.startsWith(p + '/'))) return <>{children}</>
  return (
    <>
      {frame}
      {nav}
      <main id="main" className="flex-1">{children}</main>
      {closing}
      {footer}
    </>
  )
}
