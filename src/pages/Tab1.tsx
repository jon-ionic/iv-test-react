import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { useContext } from 'react';
import { getSession, setSession, clearSession, lockSession, updateUnlockMode } from '../util/session-vault';
import { SessionContext } from '../providers/SessionProvider';

const Tab1: React.FC = () => {
  const session = useContext(SessionContext)

  const storeClicked = async (): Promise<void> => {
    await setSession({
      email: 'test@ionic.io',
      firstName: 'Tessa',
      lastName: 'Testsmith',
      accessToken: '4abf1d79-143c-4b89-b478-19607eb5ce97',
      refreshToken: '565111b6-66c3-4527-9238-6ea2cc017126',
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonItem>
            <IonLabel>
              <IonButton expand="block" color="warning" onClick={getSession}>Unlock</IonButton>
            </IonLabel>
          </IonItem>
        
        <IonList>
          <IonItem>
            <IonLabel>
              <IonButton expand="block" onClick={storeClicked}>Store</IonButton>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>
              <IonButton expand="block" color="secondary" onClick={() => updateUnlockMode('BiometricsWithPasscode')}>Use Biometrics</IonButton>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>
              <IonButton expand="block" color="secondary" onClick={() => updateUnlockMode('InMemory')}>Use In Memory</IonButton>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>
              <IonButton expand="block" color="secondary" onClick={() => updateUnlockMode('SecureStorage')}>Use Secure Storage</IonButton>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>
              <IonButton expand="block" color="warning" onClick={lockSession}>Lock</IonButton>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>
              <IonButton expand="block" color="danger" onClick={clearSession}>Clear</IonButton>
            </IonLabel>
          </IonItem>

          <IonItem>
            <div>
              <div>{ session?.email }</div>
              <div>{ session?.firstName } { session?.lastName }</div>
              <div>{ session?.accessToken }</div>
              <div>{ session?.refreshToken }</div>
            </div>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
