import React from "react";
import PythonIcon from '../../assets/images/python.svg';
import JavaIcon from '../../assets/images/java.svg';
import JavaScriptIcon from '../../assets/images/JavaScript.svg';
import SwiftIcon from '../../assets/images/swift.svg';
import CSharpIcon from '../../assets/images/csharp.svg';
import CIcon from '../../assets/images/c.svg';
import KotlinIcon from '../../assets/images/kotlin.svg';
import CPlusIcon from '../../assets/images/CPlus.svg';


const languageIcons = {
  Python: PythonIcon,
  Java: JavaIcon,
  JavaScript: JavaScriptIcon,
  Swift: SwiftIcon,
  "C#": CSharpIcon,
  C: CIcon,
  Kotlin: KotlinIcon,
  "C++": CPlusIcon,
};

const LanguageTag = ({ language }) => {
  const languageColor = () => {
    switch(language) {
      case 'Python':
        return 'bg-color-blue-pt text-gray-50';
      case 'Java':
        return 'bg-color-red-java text-gray-50';
      case 'JavaScript':
        return 'bg-color-yellow-default text-gray-50';
      case 'Swift':
        return 'bg-[#F05138] text-gray-50';
      case 'C#':
        return 'bg-[#512BD4] text-gray-50';
      case 'C':
        return 'bg-color-gray-c text-gray-50';
      case 'Kotlin':
        return 'bg-[#7F52FF] text-gray-50';
      case 'C++':
        return 'bg-color-blue-cpp text-gray-50';
      default:
        return 'bg-gray-500 text-gray-50';
    }
  };

  return (
    <div 
      className={`tag ${languageColor()}`}
    >
      {languageIcons[language] && (
        <img 
          src={languageIcons[language]} 
          alt={`${language} icon`} 
          className="mr-2" 
          style={{width: '16px', height: '16px'}} 
        />
      )}
      {language}
    </div>
  );
};

export default LanguageTag;