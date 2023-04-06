import { FooterLoading } from '@/components/FooterLoading'
import { Spacer } from '@/components/Spacer'
import { useMe } from '@/contexts/me'
import { useStatusBar } from '@/contexts/status-bar'
import { useNavigation } from '@/helpers'
import { delay } from '@/utils/delay'

import { Icon, SpeedDial, useTheme } from '@rneui/themed'
import React, {  useRef } from 'react'
import { Keyboard, RefreshControl, TextInput } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
  useAnimatedStyle,
  Layout,
  withTiming,
  FadeIn,
  FadeOut,
  useAnimatedProps,
  withSpring,
  LightSpeedInLeft,
  LightSpeedOutRight,
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
import { AddDisciplineGroupPlaceholder } from './AddDisciplineGroupPlaceholder'
import { NoDisciplineGroupsPlaceholder } from './NoDisciplineGroupsPlaceholder'

export interface DisciplineGroupsScreenProps {}

const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcon)
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const DisciplineGroupsScreen: React.FC<DisciplineGroupsScreenProps> = () => {
  const {
    isFetchingMore,
    isRefreshing,
    disciplineGroups,
    onNextPage,
    onRefresh,
    search,
    menu,
  } = useDisciplineGroupsPresenter()

  const { user } = useMe()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const { theme } = useTheme()

  const searchInputRef = useRef() as React.MutableRefObject<TextInput | null>

  const searchButtonStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        !search.open ? theme.colors.primary : theme.colors.white,
        { duration: 300 },
      ),
    }
  })

  const searchButtonIconProps = useAnimatedProps(() => {
    return {
      fontSize: withSpring(!search.open ? 24 : 20),
      color: withTiming(
        !search.open ? theme.colors.white : theme.colors.black,
        {
          duration: 300,
        },
      ),
    }
  })

  const navigateToCreateGroup = () => {
    navigation.navigate('CreateGroupScreen', {})
  }

  const navigateToCreatePost = () => {
    navigation.navigate('CreatePostScreen', {})
  }

  const navigateToSearchGroupsSubscribe = () => {
    navigation.navigate('SearchGroupsSubscribeScreen', {
      onDisciplineGroupSelected: (_, disciplineGroup) => {
        navigation.navigate('DisciplineGroupInfoScreen', {
          disciplineGroupId: disciplineGroup.id,
        })
      },
    })
  }

  useStatusBar('primary')

  return (
    <Container>
      <Animated.View
        style={{
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
        {!search.open && (
          <Animated.View
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(500)}
            style={{
              flexGrow: 1,
              flexShrink: 0,
              justifyContent: 'center',
            }}
          >
            <Title>Suas turmas 2</Title>
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
            flexGrow: search.open ? 1 : 0,
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
            disabled={search.open}
            onPress={async () => {
              search.show()
              await delay(300)
              searchInputRef?.current?.focus()
            }}
          >
            <AnimatedIcon
              style={{ alignSelf: 'center' }}
              animatedProps={searchButtonIconProps}
              name="search"
            />
          </HeaderButton>

          <AnimatedTextInput
            ref={searchInputRef}
            style={[{ flex: 1, fontSize: 14 }]}
            layout={Layout.mass(0.3).springify()}
            placeholder="Digite o nome ou código da disciplina"
            value={search.text}
            onChangeText={search.onChange}
          />

          {search.text.length > 0 && (
            <AnimatedIcon
              style={{ marginHorizontal: 12 }}
              entering={LightSpeedInLeft}
              exiting={LightSpeedOutRight}
              name="close"
              size={14}
              color={theme.colors.grey4}
              onPress={() => search.onChange('')}
            />
          )}
        </Animated.View>

        {search.open && (
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
              onPress={async () => {
                search.hide()
                await delay(300)
                Keyboard.dismiss()
              }}
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
          ListEmptyComponent={() => {
            const placeholderMap = {
              TEACHER: 'Ainda não há nada por aqui, crie já uma turma.',
              STUDENT: 'Ainda não há nada por aqui, entre já em uma turma.',
            }

            const buttonTitleMap = {
              TEACHER: 'Criar turma',
              STUDENT: 'Entrar em uma turma',
            }

            const onAddDisciplineGroupMap = {
              TEACHER: navigateToCreateGroup,
              STUDENT: navigateToSearchGroupsSubscribe
            }

            if (search.dText.length > 0) return <NoDisciplineGroupsPlaceholder />

            return (
              <AddDisciplineGroupPlaceholder
                placeholder={placeholderMap[user?.type || 'STUDENT']}
                buttonTitle={buttonTitleMap[user?.type || 'STUDENT']}
                onAddDisciplineGroup={
                  onAddDisciplineGroupMap[user?.type || 'STUDENT']
                }
              />
            )
          }}
          ItemSeparatorComponent={Spacer}
          contentContainerStyle={{ padding: 16 }}
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

      <SpeedDial
        isOpen={menu.open}
        icon={{ name: 'menu', color: '#fff' }}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={menu.show}
        onClose={menu.hide}
        color={theme.colors.primary}
      >
        {user?.type === 'TEACHER' ? (
          <SpeedDial.Action
            key={'Criar turma'}
            icon={{ name: 'add', color: '#fff' }}
            color={theme.colors.primary}
            title={'Criar turma'}
            onPress={() => {
              navigateToCreateGroup()
              menu.hide()
            }}
            titleStyle={{ overflow: 'hidden' }}
          />
        ) : (
          <></>
        )}

        {
          user?.type === 'TEACHER' ? (
            <SpeedDial.Action
              key={'Criar postagem'}
              icon={{ name: 'add', color: '#fff' }}
              color={theme.colors.primary}
              title={'Criar postagem'}
              onPress={() => {
                navigateToCreatePost()
                menu.hide()
              }}
              titleStyle={{ overflow: 'hidden' }}
            />
          ) : (
            <></>
          )
        }

        {
          user?.type === 'STUDENT' ? (
            <SpeedDial.Action
              key={'Entrar em uma turma'}
              icon={{
                name: 'location-enter',
                type: 'material-community',
                color: '#fff',
              }}
              color={theme.colors.primary}
              title={'Entrar em uma turma'}
              onPress={() => {
                navigateToSearchGroupsSubscribe()
                menu.hide()
              }}
              titleStyle={{ overflow: 'hidden' }}
            />
          ) : (
            <></>
          )
        }
      </SpeedDial>
    </Container>
  )
}

export default withDisciplineGroupsPresenter(DisciplineGroupsScreen)
