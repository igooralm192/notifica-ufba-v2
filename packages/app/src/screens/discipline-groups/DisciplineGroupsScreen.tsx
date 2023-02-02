import { FooterLoading } from '@/components/FooterLoading'
import { Spacer } from '@/components/Spacer'
import { useMe } from '@/contexts/me'
import { useStatusBar } from '@/contexts/status-bar'
import { useNavigation } from '@/helpers'
import { useTabBarHeight } from '@/hooks'

import { Icon, SpeedDial, useTheme } from '@rneui/themed'
import React, { useEffect, useRef, useState } from 'react'
import {
  Keyboard,
  Platform,
  RefreshControl,
  TextInput,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
  useAnimatedStyle,
  Layout,
  withTiming,
  FadeIn,
  FadeOut,
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { DisciplineGroupListItem } from './DisciplineGroupListItem'
import {
  useDisciplineGroupsPresenter,
  withDisciplineGroupsPresenter,
} from './DisciplineGroupsPresenter'
import {
  Container,
  Title,
  Subtitle,
  HeaderButton,
  ListContainer,
} from './DisciplineGroupsStyles'

export interface DisciplineGroupsScreenProps {}

const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcon)

const DisciplineGroupsScreen: React.FC<DisciplineGroupsScreenProps> = () => {
  const {
    isFetchingMore,
    isRefreshing,
    disciplineGroups,
    onNextPage,
    onRefresh,
  } = useDisciplineGroupsPresenter()

  const { user } = useMe()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const tabBarHeight = useTabBarHeight()
  const { theme } = useTheme()

  const iconSize = useSharedValue(20)

  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const searchInputRef = useRef() as React.MutableRefObject<TextInput | null>

  const showMenu = () => setMenuOpen(true)
  const hideMenu = () => setMenuOpen(false)

  const showSearch = () => setSearchOpen(true)
  const hideSearch = () => setSearchOpen(false)

  useStatusBar('primary')

  const teacherActions = [
    {
      title: 'Criar turma',
      icon: { name: 'add', color: '#fff' },
      onPress: () => {
        navigation.navigate('CreateGroupScreen', {})
        hideMenu()
      },
    },
  ]

  const menuActions = user?.type === 'TEACHER' ? teacherActions : []

  const searchButtonStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        !searchOpen ? theme.colors.primary : theme.colors.white,
        { duration: 300 },
      ),
    }
  })

  const searchButtonIconProps = useAnimatedProps(() => {
    return {
      fontSize: withSpring(!searchOpen ? 24 : 20),
      color: withTiming(!searchOpen ? theme.colors.white : theme.colors.black, {
        duration: 300,
      }),
    }
  })

  useEffect(() => {
    if (!searchInputRef?.current?.isFocused?.() && searchOpen) {
      searchInputRef?.current?.focus()
      return
    }

    if (searchInputRef?.current?.isFocused?.() && !searchOpen) {
      Keyboard.dismiss()
      return
    }
  }, [searchOpen])

  return (
    <Container>
      <Animated.View
        style={{
          // minHeight: insets.top + 84,
          paddingTop: insets.top + 8,
          paddingBottom: 16,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          backgroundColor: theme.colors.primary,
        }}
        layout={Layout.mass(0.3).springify()}
      >
        {!searchOpen && (
          <Animated.View
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(500)}
            style={{
              flexGrow: 1,
              flexShrink: 0,
              justifyContent: 'center',
            }}
          >
            <Title>Suas turmas</Title>
            <Subtitle>Busque e visualize suas turmas.</Subtitle>
          </Animated.View>
        )}

        <Animated.View
          layout={Layout.duration(500)}
          style={{
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            flexBasis: 40,
            flexGrow: searchOpen ? 1 : 0,
            flexShrink: 0,
            backgroundColor: 'white',
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <HeaderButton
            style={[
              { width: 40, height: 40, justifyContent: 'center' },
              searchButtonStyles,
            ]}
            disabled={searchOpen}
            onPress={showSearch}
          >
            <AnimatedIcon
              style={{ alignSelf: 'center' }}
              animatedProps={searchButtonIconProps}
              name="search"
            />
          </HeaderButton>

          <TextInput
            ref={searchInputRef}
            placeholder="Digite o nome ou código da disciplina"
            style={[{ flex: 1, fontSize: 14, paddingRight: 12 }]}
          />
        </Animated.View>

        {searchOpen && (
          <Animated.View
            layout={Layout.duration(300)}
            entering={FadeIn.duration(300).delay(500)}
            exiting={FadeOut.duration(300)}
          >
            <HeaderButton
              style={[
                {
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  marginLeft: 8,
                  backgroundColor: theme.colors.white,
                },
              ]}
              onPress={hideSearch}
            >
              <Icon name="close" size={20} color="black" />
            </HeaderButton>
          </Animated.View>
        )}
      </Animated.View>

      <ListContainer>
        <Animated.FlatList
          scrollEventThrottle={1}
          onScrollBeginDrag={Keyboard.dismiss}
          data={disciplineGroups}
          renderItem={({ item }) => (
            <DisciplineGroupListItem disciplineGroup={item} />
          )}
          ItemSeparatorComponent={Spacer}
          contentContainerStyle={{
            padding: 16,
            // Safe area bottom + safe area bottom tab padding + bottom tab height + list padding bottom
            paddingBottom: insets.bottom + 20 + 70 + 16,
          }}
          onEndReached={onNextPage}
          onEndReachedThreshold={0.15}
          ListFooterComponent={isFetchingMore ? FooterLoading : undefined}
          refreshControl={
            <RefreshControl
              refreshing={!isFetchingMore && isRefreshing}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      </ListContainer>

      {menuActions.length > 0 && (
        <SpeedDial
          isOpen={menuOpen}
          icon={{ name: 'menu', color: '#fff' }}
          openIcon={{ name: 'close', color: '#fff' }}
          onOpen={showMenu}
          onClose={hideMenu}
          color={theme.colors.primary}
          containerStyle={{
            marginBottom: tabBarHeight + (Platform.OS === 'ios' ? 20 : 40),
          }}
        >
          {menuActions.map(action => (
            <SpeedDial.Action
              key={action.title}
              icon={action.icon}
              color={theme.colors.primary}
              title={action.title}
              onPress={action.onPress}
              titleStyle={{ overflow: 'hidden' }}
            />
          ))}
        </SpeedDial>
      )}
    </Container>
  )
}

export default withDisciplineGroupsPresenter(DisciplineGroupsScreen)
