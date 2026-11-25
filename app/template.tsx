/**
 * Every page arrives the same way: a pale panel carrying the logo and an amber one lift off the screen like
 * curtains, and the page rises in behind them. A template remounts on each navigation, so this
 * plays on every page change. With reduced motion the curtains never show.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="curtain" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/logo-trim.png" alt="" width={420} height={154} />
      </div>
      <div className="curtain curtain-b" aria-hidden="true" />
      <div className="page-in">{children}</div>
    </>
  )
}
