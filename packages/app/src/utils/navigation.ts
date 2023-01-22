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
    const filteredRoutes = state.routes.filter(r => r.key !== removedRoute.key)
    const newCurrentRouteIndex = filteredRoutes.findIndex(r => r.key === currentRoute.key)

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
