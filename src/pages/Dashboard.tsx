import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import styled from 'styled-components';
import { TrainerContainer, TrainerIcon, TrainerMent } from '../styles/Trainer';
import { Button } from 'antd';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ExerciseCategory {
  id: string;
  name: string;
}

interface ExerciseData {
  id: string;
  date: string;
  count: number;
  weight: number;
  createdAt: string;
  exerciseCategoryId: string;
}

interface DataByCategory {
  [categoryId: string]: ExerciseData[];
}

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
`

const ChartContainer = styled.div`
  margin-top: 15%;
`

const ChartLabel = styled.div`
  color: white;
  text-align: center;
  font-weight: bold;
  margin-bottom: 5%;
`

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ExerciseCategory[]>([]);
  const [exerciseData, setExerciseData] = useState<DataByCategory>({});

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await axios.get<ExerciseCategory[]>(`${process.env.REACT_APP_LOG_SERVER_URL}/exercise/category`);
      setCategories(fetchedCategories.data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const dataByCategory: DataByCategory = {};
  
      await Promise.all(
        categories.map(async (category) => {
          const fetchedData = await axios.get<ExerciseData[]>(`${process.env.REACT_APP_DASHBOARD_SERVER_URL}/dashboard?filterExerciseCategoryId=${category.id}`);
          dataByCategory[category.id] = fetchedData.data;
        })
      );
  
      setExerciseData(dataByCategory);
    };
  
    if (categories.length > 0) {
      fetchData();
    }
  }, [categories]);

  const handler = () => {
    navigate('/exercise/');
  };

  const generateChartData = (categoryId: string): any => {
    const labels = exerciseData[categoryId]?.map((data) => data.date) || [];
  
    const weightDatas = exerciseData[categoryId]?.map((data) => data.weight) || [];
    const countDatas = exerciseData[categoryId]?.map((data) => data.count) || [];
  
    const datasets = [
      {
        label: 'count',
        data: countDatas,
        backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`,
      },
      {
        label: 'weight',
        data: weightDatas,
        backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`,
      },
    ]
  
    return {
      labels: labels,
      datasets: datasets
    }
  };
  


  return (
    <DashboardContainer>
      <TrainerContainer>
        <TrainerIcon>😺</TrainerIcon>
        <TrainerMent>회원님! 지금까지 운동기록을 보여드릴게요</TrainerMent>
      </TrainerContainer>
      {categories.map((category, index) => (
        <ChartContainer key={index}>
          <ChartLabel>{`${category.name}`}</ChartLabel>
          <Bar key={category.id} options={{ responsive: true }} data={generateChartData(category.id)} />
        </ChartContainer>
      ))}
      <Button
        onClick={handler}
        style={{ marginTop: "10%" }}
      >
        오늘 운동 더하기
      </Button>
    </DashboardContainer>
  );
};

export default Dashboard;
