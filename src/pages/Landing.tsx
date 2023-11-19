import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { TrainerContainer, TrainerIcon, TrainerMent } from '../styles/Trainer'
import Dashboard from './Dashboard'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setTodayLogId } from '../redux/action'

const LandingContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StartButton = styled.button`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(135deg, #fe8293, #9f6);
  color: black;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Landing = () => {
  const todayLogId = useSelector((state: any) => state.todayLogId)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_LOG_SERVER_URL}/daily/log/today`,
        )

        if (response.data.id !== null) {
          dispatch(setTodayLogId(response.data.id))
          setTodayLogId(response.data.id)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [dispatch])

  const StartTodayExercise = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_LOG_SERVER_URL}/daily/log`)
      dispatch(setTodayLogId(response.data.id))
      navigate('/exercise/')
    } catch (error) {
      console.error('Error logging today exercise log:', error)
    }
  }

  return (
    <LandingContainer>
      {todayLogId ? (
        <Dashboard />
      ) : (
        <TrainerContainer>
          <TrainerIcon>💪</TrainerIcon>
          <TrainerMent>회원님 운동하실 시간입니다 !</TrainerMent>
          <StartButton onClick={StartTodayExercise}>운동 시작</StartButton>
        </TrainerContainer>
      )}
    </LandingContainer>
  )
}

export default Landing
