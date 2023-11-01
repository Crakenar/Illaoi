// import { StoreProvider } from "./src/store/store";
//componments
import AppComponent from "./src/components/Organism/AppComponent";

// options={{ headerBackVisible:false }}
import { Provider, useSelector } from "react-redux";
import {Store} from "./src/redux/store";
export default function App() {


  return (
    // <StoreProvider>
    <Provider store={Store}>
        <AppComponent />
    </Provider>
    // </StoreProvider>
  );
}


