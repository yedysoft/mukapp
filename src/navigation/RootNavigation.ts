import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef() as any;

export function navigate(name: any, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function reset(name: string, index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index,
      routes: [{name}],
    });
  }
}
