import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Encapsulation from './Encapsulation';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <SubscriptionUnderTheHood /> */}
    {/* <UseSelectorUnderTheHood /> */}
    {/* <BaseHooks /> */}

    {/* <UsersListSlow /> */}
    {/* <UsersListFast /> */}

    {/* <ModulesSegregation /> */}
    {/* <ModulesSegregationWithToolkit /> */}

    {/* <BasicFetchingNCaching /> */}
    {/* <ThunksWithBoilerplate /> */}
    {/* <CreateAsyncThunk /> */}
    {/* <RTKQuery /> */}
    <Encapsulation />
  </StrictMode>
);
