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

export const removeRoute = (
  state: NavigationState,
  predicate: (route: NavigationState['routes'][number]) => boolean,
): NavigationState => {
  const removedRoute = state.routes.find(predicate)
  const currentRoute = state.routes[state.index]

  if (removedRoute) {
    const isSameRoute = currentRoute.key === removedRoute.key
    const filteredRoutes = state.routes.filter(r => r.key !== removedRoute.key)
    const newCurrentRouteIndex = !isSameRoute
      ? filteredRoutes.findIndex(r => r.key === currentRoute.key)
      : filteredRoutes.length > 0
      ? filteredRoutes.length - 1
      : 0

    return { ...state, index: newCurrentRouteIndex, routes: filteredRoutes }
  }

  return {
    ...state,
    routes: state.routes.map(r => {
      if (r.state) return { ...r, state: removeRoute(r.state as NavigationState, predicate) }
      return r
    })
  }
}
