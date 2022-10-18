import {
  NavigationState,
  PartialRoute,
  PartialState,
  Route,
} from '@react-navigation/routers'

export const getRouteByName = (
  navigationState: NavigationState | PartialState<NavigationState>,
  routeName: string,
): NavigationState['routes'][number] | PartialRoute<Route<string>> | null => {
  let findRoute:
    | NavigationState['routes'][number]
    | PartialRoute<Route<string>>
    | null = null

  for (const route of navigationState.routes) {
    if (route.name === routeName) return route

    if (route.state) {
      findRoute = getRouteByName(route.state, routeName)

      if (findRoute?.name === routeName) return findRoute
    }
  }

  return findRoute
}
