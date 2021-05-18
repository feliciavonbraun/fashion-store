import { Component } from 'react';
import CarouselStart from './Carousel';
import ProductCardGrid from './ProductCardGrid';

class StartPageView extends Component {
    render() {
        return(
            <div>
                <CarouselStart />
                <ProductCardGrid />
            </div>
        )
    }
}

export default StartPageView;