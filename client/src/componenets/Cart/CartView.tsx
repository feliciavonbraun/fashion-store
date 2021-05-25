import { Row, Steps } from 'antd';
import { CSSProperties, useContext, useState } from 'react';
import CartItemsList from './CartItemsList';
import DeliverySelection from './DeliverySelection';
import InformationForm from './InformationForm';
import PaymentMethod from './PaymentMethod';
import { CartContext } from '../../contexts/CartContext';
import CompleteOrder from './CompleteOrder';
import LogInForm from '../LogIn/LogInForm';
import { UserContext } from '../../contexts/UserContext';


const { Step } = Steps;

const steps = [
    {
        title: 'Login'
    },
    {
        title: 'Your information',
    },
    {
        title: 'Delivery',
    },
    {
        title: 'Payment',
    },
    {
        title: 'Complete order',
    },
];


function CartView() {
    const { getTotalPriceProducts } = useContext(CartContext);
    const { loggedin } = useContext(UserContext);
    const [current, setCurrent] = useState(0);
    // const [ login, setLogin] = useState(false);


    const next = () => {
        setCurrent(current + 1);
    }


    const stepsComponents: any = {
        0: LogInForm,
        1: InformationForm,
        2: DeliverySelection,
        3: PaymentMethod,
        4: CompleteOrder,
    };

    const StepsComponent = stepsComponents[current];
    
    // function handleLogin() {
    //     setLogin({loggedin})
    // }

    return (
        <Row style={cartViewContainerStyle}>
            <CartItemsList />
            <h3 style={priceTextStyle}>Price products: {getTotalPriceProducts() + ' kr '}</h3>

                {loggedin 
                ? <Steps current={0} />    
                :   <div>
                        <Steps current={current} style={{ marginTop: '7rem' }}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <StepsComponent next={next} />
                    </div>
                    
                }


        </Row>
    );
}

export default CartView;

const cartViewContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'space-around',
    width: '80%',
    margin: 'auto',
    paddingBottom: "8rem",
}

const priceTextStyle: CSSProperties = {
    textAlign: 'center',
    marginTop: '1rem'
}
