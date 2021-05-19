import React, { Component } from 'react';
import CarouselStart from './Carousel';
import CategoryMenu from './Categorycard';
import ProductCardGrid from './ProductCardGrid';

class StartPageView extends Component {
    render() {
        return(
            <div>
                <CarouselStart />
                <CategoryMenu/>
                <ProductCardGrid />
            </div>
        )
    }
}

export default StartPageView;