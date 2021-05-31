import { Row, Select } from 'antd';
import {
    CSSProperties,
    Dispatch,
    SetStateAction,
    useContext,
} from 'react';
import { ProductContext } from '../../contexts/ProductContext';

interface Props {
    setCategory: Dispatch<SetStateAction<string | undefined>>;
}

const { Option } = Select;

export default function CategoryMenu(props: Props) {
    const productContext = useContext(ProductContext);
    const { allCategories } = productContext;
    const { setCategory } = props;

    const handleChange = (category: string) => {
        setCategory(category);
    };

    return (
        <div>
            <Row style={categoryMenuContainer}>
                <Select
                    onChange={handleChange}
                    defaultValue={'All products'}
                    style={{ minWidth: '8rem' }}
                >
                    <Option value={''} key={'All products'}>
                        All products
                    </Option>
                    {allCategories.map((category) => (
                        <Option value={category} key={category}>
                            {category}
                        </Option>
                    ))}
                </Select>
            </Row>
        </div>
    );
}

const categoryMenuContainer: CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '80%',
    paddingTop: '2rem',
    marginBottom: 'auto',
    marginTop: 'auto',
    marginRight: 'auto',
    marginLeft: 'auto',
};
