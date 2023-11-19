import React, { useState, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { TrainerContainer, TrainerIcon, TrainerMent } from '../styles/Trainer'
import { Form, Input, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'

interface ExerciseProps {
  exercise: {
    id: string
    name: string
  }
  setSelectedExercise: Dispatch<SetStateAction<null>>
}

const ExerciseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 30px;
  width : 100vw;
  height: 100vh;
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30%;
`

const NextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30%;
`

const Exercise: React.FC<ExerciseProps> = ({
  exercise,
  setSelectedExercise,
}) => {
  const todayLogId = useSelector((state: any) => state.todayLogId)
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [logged, setLogged] = useState(false)
  const [sets, setSets] = useState(1)

  const handleContinueClick = () => {
    setSets(sets + 1)
    setLogged(false)
  }

  const handleChangeClick = () => {
    setSelectedExercise(null)
  }

  const handleFinishClick = () => {
    navigate('/dashboard/')
  }

  const handleFormFinish = async (values: { reps: number; weight: number }) => {
    try {
      await axios.post(`${process.env.REACT_APP_LOG_SERVER_URL}/performance/log`, {
        count: values.reps,
        weight: values.weight,
        exercise_category_id: exercise.id,
        daily_log_id: todayLogId,
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setLogged(true)
  }

  return (
    <ExerciseContainer>
      <TrainerContainer>
        <TrainerIcon>🏋️‍♂️</TrainerIcon>
        <TrainerMent>
          {exercise.name} {sets}세트 !
        </TrainerMent>
      </TrainerContainer>
      {logged ? (
        <NextContainer>
          <Button type="primary" onClick={handleContinueClick} style={{ marginBottom: '20px' }}>
            한 세트 더하기
          </Button>
          <Button type="primary" onClick={handleChangeClick} style={{ marginBottom: '20px' }}>
            다른 운동할 시간
          </Button>
          <Button type="primary" onClick={handleFinishClick} style={{ marginBottom: '20px' }}>
            운동 끝
          </Button>
        </NextContainer>
      ) : (
        <FormContainer>
          <Form form={form} onFinish={handleFormFinish}>
            <Form.Item
              label="중량 (kg)"
              name="weight"
              rules={[{ required: true, message: '중량을 입력하세요.' }]}
            >
              <Input type="number" placeholder="중량을 입력하세요" />
            </Form.Item>
            <Form.Item
              label="횟수"
              name="reps"
              rules={[{ required: true, message: '횟수를 입력하세요.' }]}
            >
              <Input type="number" placeholder="횟수를 입력하세요" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: '30px' }}
              >
                기록 완료
              </Button>
            </Form.Item>
          </Form>
        </FormContainer>
      )}
    </ExerciseContainer>
  )
}

export default Exercise
