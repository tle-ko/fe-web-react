import close from '../../assets/images/close.svg'

const AlertContainer = ({ isOpen, onClose, title, alertImg, content, }) => {
    // 모달이 열려 있지 않다면 아무것도 표시하지 않음
    if (!isOpen) return null;

    return (
    <div className="fixed inset-0 bg-[rgba(33,37,41,0.5)] z-50 flex justify-center items-center">
    <div className="bg-white p-5 rounded-lg shadow-lg relative w-4/5 mx-auto" style={{ width: '80%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
      <div className="mx-auto" style={{ width: '85%' }}> 
        <div className="flex justify-between items-center mt-10">
          <h2 className="text-lg font-bold font-cafe24" style={{ textAlign: 'left', fontSize: '20px' }}>{title}</h2>
          <button onClick={onClose} className="ml-4">
            <img src={close} alt="close" className="w-4 h-4" />
          </button>
        </div>
        <div className="w-full my-10 flex-col justify-start items-center gap-6 inline-flex">
            <img className="w-12" src={alertImg} alt='' />
            <p className="text-gray-600 text-xl font-medium">{content}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AlertContainer;