import styled from 'styled-components'
import Logo from '../loading.png'

const LodingContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

const LoadingImage = styled.img`
  width: 150px;
  height: 150px;
`

const Loading = () => {
  return (
    <LodingContainer>
      <LoadingImage src={Logo} alt="logo" />
    </LodingContainer>
  )
}

export default Loading
