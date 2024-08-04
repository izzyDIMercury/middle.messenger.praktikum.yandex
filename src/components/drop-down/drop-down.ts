import Block from "../../core/block.ts";
import { connect } from "../../core/connect.ts";

type DropDownProps = {};

class DropDown extends Block<DropDownProps> {

    public array: [] = [];
    public keys: [] = [];

    constructor(props: DropDownProps) {
        super({
            ...props
        })
    }

    init() {
        const UserFound = new User({})

        this.children = {
            UserFound
        }
    }

    componentDidMount(): void {
        // console.log(this.props.first_name)
    }


    render() {
        console.log("DDREN")
        return (
            `   <div>
                    {{{ first_name }}}
                </div>
            `
        )
    }
}


const mapStateToPropsShort = ({ userFound }): object => {
    return { ...userFound }
}

export default connect(mapStateToPropsShort)(DropDown);
