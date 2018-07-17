import React, { Component } from 'react';


class Slider extends Component {
    render(){
        return (
            <div>
                <h1>
                    Use slider to change Lay Stake
                </h1>
                <div className='slider-flex'>
                    <div className='inside-div'>
                        <form >
                            <label>
                                <p>UnderLay :</p>
                                <input
                                    value={this.props.minValueDisplay}
                                    onChange={this.props.handleUnderOverLay}
                                    name='minUnderLayValue'
                                />
                            </label>
                        </form>
                    </div>
                    <input
                        onChange={this.props.handleRange}
                        step={this.props.step}
                        value={this.props.value}
                        type="range"
                        min={this.props.minOverLayValue}
                        max={this.props.maxOverLayValue}
                    />

                    <div className='inside-div'>
                        <form >
                            <label>
                                <p>OverLay:</p>
                                <input
                                    value={this.props.maxValueDisplay}
                                    onChange={this.props.handleUnderOverLay}
                                    name='maxOverLayValue'
                                />
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Slider;