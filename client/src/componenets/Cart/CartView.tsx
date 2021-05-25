import { Row, Steps } from 'antd';
import { CSSProperties, useContext, useState } from 'react';
import CartItemsList from './CartItemsList';
import DeliverySelection from './DeliverySelection';
import InformationForm from './InformationForm';
import PaymentMethod from './PaymentMethod';
import { CartContext } from '../../contexts/CartContext';
import CompleteOrder from './CompleteOrder';
import { UserContext } from '../../contexts/UserContext';
import LogInForm from '../LogIn/LogInForm';

const { Step } = Steps;

const steps = [
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

    const next = () => {
        setCurrent(current + 1);
    };

    const stepsComponents: any = {
        0: InformationForm,
        1: DeliverySelection,
        2: PaymentMethod,
        3: CompleteOrder,
    };

    const StepsComponent = stepsComponents[current];

    return (
        <Row style={cartViewContainerStyle}>
            <CartItemsList />
            <h3 style={priceTextStyle}>
                Price products: {getTotalPriceProducts() + ' kr '}
            </h3>
            {!loggedin ? (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '1rem',
                        flexDirection: 'column',
                    }}
                >
                    <h2 style={{ color: '#1890ff', marginBottom: '1.5rem' }}>
                        Log in to place your order
                    </h2>
                    <LogInForm />
                </div>
            ) : (
                <>
                    <Steps
                        current={current}
                        style={{ marginTop: '7rem', marginBottom: '1rem' }}
                    >
                        {steps.map((item) => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                    <StepsComponent next={next} />
                </>
            )}
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
    paddingBottom: '8rem',
};

const priceTextStyle: CSSProperties = {
    textAlign: 'center',
    marginTop: '1rem',
};
