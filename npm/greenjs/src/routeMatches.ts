export function routeMatches(route: string, path: string): boolean {
  const pathSplit = path.split("/");
  const routeSplit = route.split("/");

  for (let i = 0; i < routeSplit.length; i += 1) {
    if (routeSplit[i].charAt(0) === ":") {
      //route is of the form /hello/:param/something
    } else if (routeSplit[i].charAt(0) === "*") {
      //route is of the form /hello/*param
      return true;
    } else if (i >= pathSplit.length || pathSplit[i] !== routeSplit[i]) {
      return false;
    }
  }
  return  routeSplit.length === pathSplit.length;
}
