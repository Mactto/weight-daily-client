import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { TrainerContainer, TrainerIcon, TrainerMent } from '../styles/Trainer'
import Exercise from './Exercise'

const SelectExerciseContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch; /* 터치 스크롤 활성화 */
`

const Exercises = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ExerciseItem = styled.div`
  display: inline-block;
  padding: 10px;
  width: 80vw;
  margin-top: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
`

const SelectExercise = () => {
  const [exerciseTypes, setExerciseTypes] = useState<
    Array<{ name: string; id: string }>
  >([])
  const [selectedExercise, setSelectedExercise] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_LOG_SERVER_URL}/exercise/category`,
        )
        setExerciseTypes(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleExerciseClick = (exercise: any) => {
    setSelectedExercise(exercise)
  }

  return (
    <SelectExerciseContainer>
      {selectedExercise ? (
        <Exercise
          exercise={selectedExercise}
          setSelectedExercise={setSelectedExercise}
        />
      ) : (
        <Exercises>
          <TrainerContainer>
            <TrainerIcon>😼</TrainerIcon>
            <TrainerMent>{'지금부터 하실 운동은!'}</TrainerMent>
          </TrainerContainer>
          {exerciseTypes.length > 0 &&
            exerciseTypes.map((exercise, index) => (
              <ExerciseItem
                key={index}
                onClick={() => {
                  handleExerciseClick(exercise)
                }}
              >
                {exercise.name}
              </ExerciseItem>
            ))}
        </Exercises>
      )}
    </SelectExerciseContainer>
  )
}

export default SelectExercise
