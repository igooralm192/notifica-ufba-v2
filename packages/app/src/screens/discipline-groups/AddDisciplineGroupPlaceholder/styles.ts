import styled from 'styled-components/native'
import AddDataSVG from '@/assets/add-data.svg'
import { Button } from '@/components/Button'

export const Container = styled.View`
  flex: 1;
  padding: 64px 48px 40px;
  align-items: center;
`
export const PlaceholderText = styled.Text`
  margin: 24px 0;
  font-family: 'Quicksand_500Medium';
  font-size: 16px;
  text-align: center;
`

export const AddDisciplineGroupImage = styled(AddDataSVG).attrs({
  width: 180,
  height: 130,
})``

export const AddDisciplineGroupButton = styled(Button).attrs({
  titleStyle: { fontFamily: 'Montserrat_500Medium', fontSize: 16 },
  buttonStyle: { padding: 10 },
  containerStyle: { alignSelf: 'stretch', marginTop: 16},
})`
`
