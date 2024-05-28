import React from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/common/footer';
import CrewNav from '../../components/crewNav/crewAdmin';
import SubHeader from "../../components/Header/subHeader";

export default function CrewDashAdmin() {
  
  let { id } = useParams();

  return (
    <div>
      <SubHeader crewId={ id } />
      <div className="relative mt-32">
        <CrewNav />
      </div>
      <Footer />
    </div>
  );
}