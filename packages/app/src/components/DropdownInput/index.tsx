import { Input, InputProps } from '@/components/Input'
import { Modal } from '@/components/Modal'
import { Divider } from '@rneui/themed'

import React, { useState } from 'react'
import { PressableProps } from 'react-native'
import {
  Pressable,
  TextInput,
  FlatList,
  ListRenderItem,
} from 'react-native'

import {
  Container,
  PaperContainer,
  ListTitle,
  ListItemContainer,
  ListItemLabel,
} from './styles'


export interface DropdownInputProps extends InputProps {
  title: string
  options: Option[]
  onSelectOption(value: string): void
}

const DropdownListItem: React.FC<PressableProps> = ({ children, ...props}) => {
  return (
    <ListItemContainer {...props}>
      <ListItemLabel>{children}</ListItemLabel>
    </ListItemContainer>
  )
}

const DropdownInput: React.ForwardRefRenderFunction<
  TextInput,
  DropdownInputProps
> = ({ options, title, value, onSelectOption, ...props }, ref) => {
  const [visible, setVisible] = useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  const renderListItem: ListRenderItem<Option> = ({ item }) => {
    return <DropdownListItem onPress={() => {
      onSelectOption(item.value)
      hideModal()
    }}>{item.label}</DropdownListItem>
  }

  return (
    <Pressable onPress={showModal}>
      <Input
        {...props}
        ref={ref}
        editable={false}
        pointerEvents="none"
        value={options.find(opt => opt.value === value)?.label}
      />

      <Modal visible={visible} onHide={hideModal}>
        <Container>
          <PaperContainer>
            <ListTitle>{title}</ListTitle>

            <Divider width={1} />

            <FlatList
              data={options}
              renderItem={renderListItem}
              ItemSeparatorComponent={Divider}
            />
          </PaperContainer>
        </Container>
      </Modal>
    </Pressable>
  )
}

export default React.forwardRef(DropdownInput)
