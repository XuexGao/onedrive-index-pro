export function PreviewContainer({ children }): JSX.Element {
  return (
    <div className="rounded-2xl p-3 shadow-sm"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.45)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      {children}
    </div>
  )
}

export function DownloadBtnContainer({ children }): JSX.Element {
  return (
    <div
      className="sticky bottom-0 left-0 right-0 z-10 rounded border-t border-gray-900/10 p-2 shadow-sm backdrop-blur-md dark:border-gray-500/30"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.55)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      {children}
    </div>
  )
}
