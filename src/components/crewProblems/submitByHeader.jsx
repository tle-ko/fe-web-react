import React, { useState, useEffect } from 'react';

const SubmitByHeader = ({ id }) => {
  const [submitter, setSubmitter] = useState('Loading...');

  useEffect(() => {
    const fetchSubmitterData = async () => {
      try {
        const response = await fetch('http://localhost:3000/data/userData.json');
        const data = await response.json();
        console.log('Fetched data:', data); 


        const user = data.find(user => user.id === id);

        if (user) {
          setSubmitter(user.username);
        } else {
          setSubmitter('Unknown User');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setSubmitter('Error loading user');
      }
    };

    fetchSubmitterData();
  }, [id]);

  return (
    <div className="w-screen h-16 bg-white top-32 left-0 fixed px-28 py-4 flex flex-row gap-2 items-center border border-gray-200">
      <div className="flex justify-center items-center">
        <div className="submitByheader text-lg flex justify-center items-center mr-5">
          {submitter}
        </div>
      </div>
    </div>
  );
};

export default SubmitByHeader;



