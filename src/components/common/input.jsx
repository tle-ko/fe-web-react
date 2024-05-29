export default function Input({ title, placeholder, error, accuracy }) {
  return (
    <div className="w-80 pt-6 flex flex-col justify-start items-start gap-2">
      <div className="text-gray-900 text-base font-semibold">{title}</div>
      <input 
        type="text" 
        className="px-5 py-3 bg-white rounded border border-gray-200 text-gray-800 font-medium w-full outline-none"
        placeholder={placeholder}
      />
      <div className="text-rose-500 text-sm font-semibold">{error}</div>
      <div className="text-teal-500 text-sm font-semibold">{accuracy}</div>
    </div>
  )
}

/*
usage
<Input title="아이디" placeholder="이메일 입력" error="아이디 정보가 틀렸습니다." />
<Input title="로그인" placeholder="아이디를 입력해주세요" accuracy="사용 가능한 아이디입니다." />
 */