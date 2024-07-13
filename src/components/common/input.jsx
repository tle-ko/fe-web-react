export default function Input({ title, placeholder, width, height, error, accuracy }) {
  const inputClassName = `px-5 py-3 bg-white rounded border border-gray-200 text-gray-800 text-base font-medium outline-none ${width ? `w-${width}` : ''} ${height ? `h-${height}` : ''}`

  return (
    <div className="w-full flex flex-col justify-start items-start gap-2">
      {title && <div className="containerTitle">{title}</div>}
      <textarea
        className={`${inputClassName} resize-none`}
        placeholder={placeholder}
        rows="1"
        style={{ overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}
      />
      {error && <div className="text-rose-500 text-sm font-semibold">{error}</div>}
      {accuracy && <div className="text-teal-500 text-sm font-semibold">{accuracy}</div>}
    </div>
  )
}

/*
usage
  <Input 
    placeholder="크루 선장에게 보낼 메시지를 입력하세요."
    width="full"
    height="28"
  />
 */
