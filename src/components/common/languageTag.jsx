import React, { useState } from "react";

import PythonIcon from '../../assets/images/Python.svg';
import JavaIcon from '../../assets/images/Java.svg';
import JavaScriptIcon from '../../assets/images/JavaScript.svg'; 
import SwiftIcon from '../../assets/images/Swift.svg';
import CSharpIcon from '../../assets/images/CSharp.svg';
import CIcon from '../../assets/images/C.svg';
import KotlinIcon from '../../assets/images/Kotlin.svg';
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

const LanguageTag = ({ language }) => {
  const [clicked, setClicked] = useState(false);

  const languageColor = () => {
    if (!clicked) {
      return 'border border-gray-500 text-gray-600 bg-white'; 
    } else {
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
    }
  };
  
  return (
    <div 
      className={`font-pretendard font-semibold inline-flex items-center py-1 px-3 rounded-full text-sm font-medium ${languageColor()} cursor-pointer`}
      onClick={() => setClicked(!clicked)}
    >
      {(clicked ? languageIcons : languageGreyIcons)[language] && (
        <img 
          src={(clicked ? languageIcons : languageGreyIcons)[language]} 
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



