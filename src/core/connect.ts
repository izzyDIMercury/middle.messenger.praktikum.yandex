import { StoreEvents } from "./store.ts";
import { isEqual } from "./utils.ts";
// import { GlobalStore } from "../store.ts";

export function connect(mapStateToProps: any) {
    return function(Component: any) {
        return class extends Component {

            private onStoreChange: () => void;
            
            constructor(props: any) {
                //@ts-expect-error can't properly type window.store
                const store = window.store;
                let state = mapStateToProps(store.getState());
                super({ ...props, ...state });

                this.onStoreChange = () => {
                    const nextState = mapStateToProps(store.getState());
                    // console.log("fires");
                    // console.log(Component, nextState);

                    if (!isEqual(state, nextState)) {
                        this.setProps({ ...nextState });
                    }

                    state = nextState;
                }

                store.on(StoreEvents.Updated, this.onStoreChange);
            }
        }
    }
}
