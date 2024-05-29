import Footer from '../../components/common/footer';
import React, { useState } from 'react';
import Modal from '../../components/common/modal'; 
import LanguageTag from '../../components/common/languageTag'; 



const languages = [
  'python', 'Java', 'JavaScript', 'Swift', 'C#', 'C', 'Kotlin', 'C++'
];

export default function Main() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>언어 보기</button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="크루 태그"
        buttonText="닫기"
        onButtonClick={() => setModalOpen(false)}
      >
        <div className="space-y-2">
          {languages.map((language) => (
            <LanguageTag key={language} language={language} />
          ))}
        </div>
      </Modal>
      <Footer />
    </div>
  );
}
