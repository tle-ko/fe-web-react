import React, { useState, useEffect } from 'react';

const SubmitByHeader = ({ id }) => {
  const [submitter, setSubmitter] = useState();

  useEffect(() => {
    const fetchSubmitterData = async () => {
      try {
        const response = await fetch('http://localhost:3000/data/userData.json');
        const data = await response.json();
        console.log('Fetched data:', data);

        const user = data.find((user) => user.id === id);

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
    <div className="fixed left-0 top-32 z-10 flex h-16 w-screen flex-row items-center gap-2 border border-gray-200 bg-white px-28 py-4">
      <div className="flex items-center justify-center">
        <div className="submitByheader mr-5 flex items-center justify-center text-lg">
          {submitter}
        </div>
      </div>
    </div>
  );
};

export default SubmitByHeader;
