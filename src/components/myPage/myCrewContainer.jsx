import Button from '../common/button';

export default function MyCrewContainer() {
  const approveMessage = () => {
    return alert('선장님의 승인/거절 여부에 따라 이메일로 결과가 전송돼요!');
  }

    return (
      <div className='col-span-3 box min-w-fit'>
      <div className='w-full flex flex-col gap-6'>
        <p className='boxTitle w-fit'>크루 가입 신청 현황</p>
        
        <div className='box'>
        <div className='flex-col justify-end items-end gap-6 inline-flex'>
        <div className='flex-col justify-start items-start gap-6 inline-flex'>
        <div className='inline-flex gap-6 justify-start items-start'>
        <p className='text-5xl font-bold'>🤮</p>
          
        <div className='flex-col justify-start items-start gap-4 flex'>
          <p className='text-gray-900 font-bold'>코딩메리호</p>
          <div className='justify-between items-center inline-flex gap-6'>
            <p className='font-medium text-base-15'>신청 시각</p>
            <p className='font-normal text-base-15'>24년 08월 16일 12:34</p>
          </div>
          <div className='justify-between items-center inline-flex gap-6'>
            <p className='font-medium'>크루 태그</p>
            <div className='justify-start items-center gap-3 inline-flex'></div>
          </div>
        </div>
        </div>

        <div className='flex flex-col gap-2'>
          <p className='text-gray-900 text-base-14 font-medium'>신청 메시지</p>
          <div className='p-5 bg-gray-50 justify-start items-start h-fit'>
            <p className='text-gray-900 whitespace-normal'>저 진짜 열심히 할 자신있습니다. 받아주세요 저 진짜 열심히 할 자신있습니다. 받아주세요 저 진짜 열심히 할 자신있습니다. 받아주세요 저 진짜 열심히 할 자신있습니다. 받아주세요저 진짜 열심히 할 자신있습니다. 받아주세요 저 진짜 열심히 할 자신있습니다. 받아주세요 저 진짜 열심히 할 자신있습니다. 받아주세요 저 진짜 열심히 할 자신있습니다. 받아주세요</p>
          </div>
        </div>
        </div>
        
        <Button
          buttonSize={'detailBtn'}
          colorStyle={'whiteBlack'}
          content={'수락 대기중'}
          onClick={approveMessage}
        />
        </div>  
        </div> 
      </div>
      </div>
    );
  }