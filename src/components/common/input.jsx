export default function Input({ title, placeholder, error }) {
  return (
    <div className="w-80 pt-6 flex-col justify-start items-start gap-3 inline-flex">
      <div className="text-gray-900 text-base font-semibold">{title}</div>
      <input 
        type="text" 
        className="px-5 py-3 bg-white rounded border border-gray-300 text-gray-900 font-medium w-full outline-none"
        placeholder={placeholder}
      />
      <div class="text-rose-500 text-sm font-semibold">{error}</div>
    </div>
  )
}

/*
usage
<Input title="아이디" placeholder="이메일 입력" error="아이디 정보가 틀렸습니다." />
 */