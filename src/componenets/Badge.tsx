import { Badge } from "antd";
import { Component, ContextType } from "react";
import { CSSProperties } from "react";
import { CartContext } from "../contexts/CartContext";
class AddToBadge extends Component  { 
    context!: ContextType<typeof CartContext>
    static contextType = CartContext;
 
    render() { 
        return (
            <CartContext.Consumer>
                {({ getBadgeQuantity }) => {
                    return (
                        <div>
                            <Badge count={getBadgeQuantity()} style={badgeStyle} />
                        </div>
                    )
                }}
            </CartContext.Consumer>
        )
    }              
}

const badgeStyle: CSSProperties = {
    background: 'red',
    color: 'white', 
    borderColor: 'red',
    fontSize: '0.8rem',
    marginTop: '1.1rem'
}

export default AddToBadge;


