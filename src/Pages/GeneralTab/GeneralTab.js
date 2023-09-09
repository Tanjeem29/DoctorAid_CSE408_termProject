import React, { useEffect, useState } from 'react';
import PatientInfoCard from './Components/Cards/PatientInfoCard';
import HealthStatsCard from './Components/Cards/HealthStatsCard';
import MajorSurgeriesCard from './Components/Cards/MajorSurgeriesCard';
import MajorDiseasesCard from './Components/Cards/MajorDiseasesCard';
import HeartRateChart from './Components/Charts/HeartRateChart';
import BloodPressureChart from './Components/Charts/BloodPressureChart';
import { Card } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { useContext } from 'react';
import { PatientContext } from '../../PatientContext'

const GeneralTab = () => {
  const { patientID } = useContext(PatientContext);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/v0/patients/get_general_tab_info/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: parseInt(patientID, 10) }),
        });

        const result = await response.json();
        console.log("result", result);
        setData(result.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    
  }, [patientID]);

  // Dummy data for surgeries and diseases
  const surgeries = ['Appendectomy', 'Cholecystectomy'];
  const diseases = ['Hypertension', 'Diabetes'];

  return (

    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {isLoading ? (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          <CircularProgress />
        </div>
      ) : (
        <>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flex: '1', padding: '20px' }}>
                <PatientInfoCard patient={data} />
                <HealthStatsCard stats={data} />
                <MajorSurgeriesCard surgeries={surgeries} />
                <MajorDiseasesCard diseases={diseases} />
              </div>
              <div style={{ flex: '1', padding: '20px' }}>
                <Card style={{ marginBottom: '20px',background:'azure', borderBlockColor:'red' }}>
                  <HeartRateChart heartRates={data.heart_rate_data} />
                </Card>
                <Card style={{ marginBottom: '20px' ,background:'azure'}}>
                  <BloodPressureChart bloodPressure={data.blood_pressure_data} />
                </Card>
                {/* Add other charts here */}
              </div>
            </div>
        </>
      )}
    </div>
  );
};

export default GeneralTab;