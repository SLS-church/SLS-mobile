/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer, useLinking, NavigationContainerRef } from '@react-navigation/native';
import RootNavigator from '@/components/navigation/RootNavigator';
import { SnackbarProvider } from '@dooboo-ui/snackbar';

function App(): React.ReactElement {

  const ref = React.useRef<NavigationContainerRef>(null);

  const { getInitialState } = useLinking(ref, {
    prefixes: ['slschurch://'],
  });

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();
  
  React.useEffect(() => {
    Promise.race([
      getInitialState(),
      new Promise(resolve =>
        // Timeout in 150ms if `getInitialState` doesn't resolve
        // Workaround for https://github.com/facebook/react-native/issues/25675
        setTimeout(resolve, 150)
      ),
    ])
      .catch(e => {
        console.error(e);
      })
      .then((state: any) => {
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  if (!isReady) {
    return <></>;
  }

  return (
    <NavigationContainer initialState={initialState} ref={ref}>
      <SnackbarProvider>
        <RootNavigator />
      </SnackbarProvider>
    </NavigationContainer>
  );
};

export default App;
