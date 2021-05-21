import { Menu, Row } from 'antd';
import React, {
    CSSProperties,
    Dispatch,
    SetStateAction,
    useContext,
} from 'react';
import { ProductContext } from '../../contexts/ProductContext';

interface Props {
    setCategory: Dispatch<SetStateAction<string | undefined>>;
}

export default function CategoryMenu(props: Props) {
    const productContext = useContext(ProductContext);
    const { allCategories } = productContext;
    const { setCategory } = props;

    const handleClick = (category: string) => {
        setCategory(category);
    };

    return (
        <div>
            <Row style={categoryMenuContainer}>
                <Menu mode='horizontal' style={MenuStyle}>
                    {allCategories.map((category) => (
                        <Menu.Item onClick={() => handleClick(category)}>
                            {category}
                        </Menu.Item>
                    ))}
                </Menu>
            </Row>
        </div>
    );
}

const categoryMenuContainer: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '1rem',
    margin: '0',
};

const MenuStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
};

// const linkStyle: CSSProperties = {
//    fontWeight: 400,
//    borderBottom: '0.1rem solid black'
// }
