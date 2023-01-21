import { Text } from "@rneui/themed";
import { Pressable } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const PaperContainer = styled.Pressable`
  width: 300px;
  max-height: 500px;
  padding-bottom: 8px;
  background-color: white;
  border-radius: 8px;
`

export const ListTitle = styled(Text)`
  font-family: 'Quicksand_700Bold';
  font-size: 16px;
  margin: 16px 24px;
`

export const ListItemContainer = styled(Pressable)`
  padding: 16px 24px;
`

export const ListItemLabel = styled(Text)`
  font-family: 'Quicksand_500Medium';
  font-size: 12px;
`
