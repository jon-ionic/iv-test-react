import { 
  IonButton,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
} from '@ionic/react'
import { login } from '../util/authentication'
import { useIonRouter } from '@ionic/react'

const Login = () => {
  const router = useIonRouter();

  const handleLogin = async () => {
    try {
      await login();
      router.push('/tab1');
    } catch (error: unknown) {
      console.log('failed to login', error)
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>Login</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <IonItem>
            <IonLabel>
              <IonButton expand="block" onClick={handleLogin}>Login</IonButton>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Login