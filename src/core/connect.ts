import { StoreEvents } from "./store.ts";
import { isEqual } from "./utils.ts";

export function connect(mapStateToProps, dispatch?) {
    return function(Component) {
        return class extends Component {

            private onStoreChange: () => void;
            
            constructor(props) {
                const store = window.store;
                let state = mapStateToProps(store.getState());
                super({ ...props, ...state });

                this.onStoreChange = () => {
                    const nextState = mapStateToProps(store.getState());
                    // console.log("fires");

                    if (!isEqual(state, nextState)) {
                        this.setProps({ ...nextState });
                    }

                    state = nextState;
                }

                store.on(StoreEvents.Updated, this.onStoreChange)
            }
        }
    }
}
