import React from "react";
import PropTypes from 'prop-types';
import PythonIcon from '../../assets/images/python.svg';
import JavaIcon from '../../assets/images/java.svg';
import JavaScriptIcon from '../../assets/images/JavaScript.svg'; 
import SwiftIcon from '../../assets/images/swift.svg';
import CSharpIcon from '../../assets/images/csharp.svg';
import CIcon from '../../assets/images/c.svg';
import KotlinIcon from '../../assets/images/kotlin.svg';
import CPlusIcon from '../../assets/images/CPlus.svg'; 
import PythonGreyIcon from '../../assets/images/PythonGrey.svg';
import JavaGreyIcon from '../../assets/images/JavaGrey.svg';
import JavaScriptGreyIcon from '../../assets/images/JavaScriptGrey.svg'; 
import SwiftGreyIcon from '../../assets/images/SwiftGrey.svg';
import CSharpGreyIcon from '../../assets/images/CSharpGrey.svg';
import CGreyIcon from '../../assets/images/CGrey.svg';
import KotlinGreyIcon from '../../assets/images/KotlinGrey.svg';
import CPlusGreyIcon from '../../assets/images/CPlusGrey.svg'; 

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

const languageGreyIcons = {
  Python: PythonGreyIcon,
  Java: JavaGreyIcon,
  JavaScript: JavaScriptGreyIcon,
  Swift: SwiftGreyIcon,
  "C#": CSharpGreyIcon,
  C: CGreyIcon,
  Kotlin: KotlinGreyIcon,
  "C++": CPlusGreyIcon,
};

const SelectLanguageTag = ({ language, onClick, selected }) => {
  const languageColor = () => {
    if (!selected) {
      return 'border border-gray-500 text-gray-600 bg-white'; 
    } else {
      switch(language) {
        case 'Python':
          return 'bg-color-blue-pt border border-color-blue-pt text-gray-50';
        case 'Java':
          return 'bg-color-red-java border border-color-red-java text-gray-50';
        case 'JavaScript':
          return 'bg-color-yellow-default border border-color-yellow-default text-gray-50';
        case 'Swift':
          return 'bg-[#F05138] border border-[#F05138] text-gray-50'; 
        case 'C#':
          return 'bg-[#512BD4] border border-[#512BD4] text-gray-50'; 
        case 'C':
          return 'bg-color-gray-c border border-color-gray-c text-gray-50';
        case 'Kotlin':
          return 'bg-[#7F52FF] border border-[#7F52FF] text-gray-50'; 
        case 'C++':
          return 'bg-color-blue-cpp border border-color-blue-cpp text-gray-50';
        default:
          return 'bg-gray-600 border border-gray-600 text-gray-50';
      }
    }
  };
  
  return (
    <div 
      className={`font-pretendard font-semibold inline-flex items-center py-2 px-3 rounded-full text-sm ${languageColor()} cursor-pointer hidden-scrollbar overflow-x-auto`}
      onClick={onClick}
    >
      {(selected ? languageIcons : languageGreyIcons)[language] && (
        <img 
          src={(selected ? languageIcons : languageGreyIcons)[language]} 
          alt={`${language} icon`} 
          className="mr-2" 
          style={{width: '16px', height: '16px'}} 
        />
      )}
      <p className="whitespace-nowrap">{language}</p>
    </div>
  );
};

SelectLanguageTag.propTypes = {
  language: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SelectLanguageTag;
