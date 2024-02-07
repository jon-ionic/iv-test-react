import { 
  IonButton, 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonPage,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import { useIonRouter } from '@ionic/react'
import { sessionIsLocked, unlockSession } from '../util/session-vault'
import { isAuthenticated, logout } from '../util/authentication'


const Start = () => {
  const [showUnlock, setShowUnlock] = useState<boolean>(false)

  const router = useIonRouter();

  useEffect(() => {
    performUnlockFlow();
  }, [])

  const attemptNavigation = async (): Promise<void> => {
    if (!(await sessionIsLocked())) {
      if (await isAuthenticated()) {
        router.push('/tab1');
      } else {
        router.push('/login');
      }
    }
  };
  const attemptUnlock = async (): Promise<void> => {
    if (await sessionIsLocked()) {
      try {
        await unlockSession();
      } catch (err: unknown) {
        setShowUnlock(true);
      }
    }
  };

  const performUnlockFlow = async (): Promise<void> => {
    await attemptUnlock();
    await attemptNavigation();
  }

  const redoLogin = async (): Promise<void> => {
    await logout();
    router.push('/login/');
  };

  return (
    <IonPage>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>
              <IonButton expand='block' onClick={performUnlockFlow}>Unlock</IonButton>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>
              <IonButton expand='block' onClick={redoLogin}>Redo Login</IonButton>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Start