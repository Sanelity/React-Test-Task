import React from 'react';
import { Carousel, CarouselItem } from 'react-bootstrap';
import Space from '../Space.jpg';
import Pixels from '../Pixels.png';

export function Slider() {
    return(
        <>
            <Carousel>
                <CarouselItem style={{'height': '600px'}}>
                    <img className='d-block w-100'
                    src={Space}
                    alt='Space'
                    />
                    <Carousel.Caption>
                        <h3>Artistic Space art</h3>
                        <p>Masterpiece!</p>
                    </Carousel.Caption>
                </CarouselItem>
                <CarouselItem style={{'height': '600px'}}>
                    <img className='d-block w-100'
                    src={Pixels}
                    alt='Pixels'
                    />
                    <Carousel.Caption>
                        <h3>Sample text</h3>
                        <p>Lower Sample text!</p>
                    </Carousel.Caption>
                </CarouselItem>
            </Carousel>
        </>
)}