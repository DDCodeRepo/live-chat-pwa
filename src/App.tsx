import { useEffect } from 'react';
import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core';
import './i18n';
import GlobalStyles from './components/GlobalStyles';
import RTL from './components/RTL';
import SettingsDrawer from './components/SettingsDrawer';
import SplashScreen from './components/SplashScreen';
import { gtmConfig } from './config';
import useAuth from './hooks/useAuth';
import useScrollReset from './hooks/useScrollReset';
import useSettings from './hooks/useSettings';
import gtm from './lib/gtm';
import routes from './routes';
import { createTheme } from './theme';
import { API, DELAY_TIME_INTERVAL } from './constants';
import usePollingHandler from './services/polling-service/polling-handler';


const App: FC = () => {
  const content = useRoutes(routes);
  const { settings } = useSettings();
  const auth = useAuth();
  useScrollReset();

  useEffect(() => {
    gtm.initialize(gtmConfig);
  }, []);

  usePollingHandler(API.POLLING_DATA_API, DELAY_TIME_INTERVAL);

  /* const pollObj = PollingHandler.getInstance();
  pollObj.setIntervalHook(useInterval);
  pollObj.setSelectorHook(useSelector);
  pollObj.setDispatchHook(useDispatch);
  pollObj.handlePoll(API.POLLING_DATA_API, DELAY_TIME_INTERVAL) */

  const theme = createTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme
  });

  return (
    <ThemeProvider theme={theme}>
      <RTL direction={settings.direction}>
        <SnackbarProvider
          dense
          maxSnack={3}
        >
          <GlobalStyles />
          <SettingsDrawer />
          {auth.isInitialized ? content : <SplashScreen />}
        </SnackbarProvider>
      </RTL>
    </ThemeProvider>
  );
};

export default App;
