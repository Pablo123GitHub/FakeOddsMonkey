import React, { Component } from 'react';


class Slider extends Component {


    render(){
        return (
            <div>
                <h1>
                    THIS IS THE SLIDER COMPONENT
                </h1>

                <input
                    onChange={this.props.handleRange}
                    step={this.props.step}
                    value={this.props.value}
                    type="range"
                    min={this.props.min}
                    max={this.props.max}


                />
            </div>
        )
    }



}

export default Slider;