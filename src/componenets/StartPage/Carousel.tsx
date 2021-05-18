import { Component, CSSProperties } from 'react';
import { Carousel } from 'antd';

class CarouselStart extends Component {
    render() {
        return (
            <Carousel autoplay>
                <div>
                    <img 
                        src="https://github.com/msmalinosterberg/miniprojekt/blob/master/src/assets/carousel1.png?raw=true" 
                        alt="girl with sunglasses" 
                        style={caoruselPic} 
                    />
                </div>
                <div>
                    <img 
                        src="https://github.com/msmalinosterberg/miniprojekt/blob/carousel-picture/src/assets/carousel2.png?raw=true" 
                        alt="three girls smiling and holding flowers" 
                        style={caoruselPic} 
                    />
                </div>
                <div>
                    <img 
                        src="https://github.com/msmalinosterberg/miniprojekt/blob/carousel-picture/src/assets/carousel3.png?raw=true" 
                        alt="girl with sunglasses sitting" 
                        style={caoruselPic} 
                    />
                </div>
                <div>
                    <img 
                        src="https://github.com/msmalinosterberg/miniprojekt/blob/carousel-picture/src/assets/carousel4.png?raw=true" 
                        alt="girl with sunglasses in a car" 
                        style={caoruselPic} 
                    />
                </div>
            </Carousel>
        )
    }
}

export default CarouselStart;

const caoruselPic: CSSProperties = {
    display: 'flex',
    height: 'auto',
    width: '100%',
    marginTop: '4rem',
};



