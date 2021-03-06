import React, { Component } from 'react';
import './App.css';
import Slider from './Slider';


class NameForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            BackStake: '',
            BackOdds: '',
            LayStake: '',
            LayOdds : '',
            LayCommission: '',
            BackCommission: 0,
            SliderValue: 0,
            minUnderLayValue: 0,
            maxOverLayValue:20,
            qualifyingBet: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleRangeInput = this.handleRangeInput.bind(this);
        this.round = this.round.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.outputBookieTotal = this.outputBookieTotal.bind(this);
        this.outputExchangeTotal = this.outputExchangeTotal.bind(this);
        this.handleUnderOverLay = this.handleUnderOverLay.bind(this);
        this.handleQualifyingBetMode = this.handleQualifyingBetMode.bind(this);

    }

    handleQualifyingBetMode(){
        this.setState({
            qualifyingBet: !this.state.qualifyingBet
        })
        const that = this;
        function myFunction() {
            setTimeout(function(){
                that.handleClick();
            }, 1);
        }
        myFunction();
    }

    handleChange(event) {

        if (event.target.name === "LayStake") {
            alert('This value can be changed with the Slider at the bottom of the page');
        } else {
            this.setState({[event.target.name]: event.target.value });
            const that = this;
            function myFunction() {
                setTimeout(function(){
                    that.handleClick();
                }, 1);
            }
            myFunction();
        }

    }

    handleUnderOverLay (event) {
        this.setState ({
            [event.target.name]: event.target.value
        })
    }

    handleRangeInput (event) {
       this.setState({
           SliderValue: event.target.value,
           LayStake: event.target.value
       })
    }


    round (value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals).toFixed(2);
    }

    handleClick() {
        let incrementLayStake = 1;
        while (this.outputBookieTotal( incrementLayStake) > this.outputExchangeTotal( incrementLayStake)) {
            incrementLayStake++;
        }

        let incrementLayStakeLowerEnd = (incrementLayStake -1)*100;
        while (this.outputBookieTotal( incrementLayStakeLowerEnd/100) > this.outputExchangeTotal( incrementLayStakeLowerEnd/100)) {
            incrementLayStakeLowerEnd += 1;
        }

        const balancedLayStake = incrementLayStakeLowerEnd/100 ;
        this.setState(
            {
                LayStake: balancedLayStake,
                SliderValue: balancedLayStake,
                maxOverLayValue: this.round(balancedLayStake + balancedLayStake*0.1, 2),
                minUnderLayValue: this.round(balancedLayStake - balancedLayStake*0.1, 2)
            }
        )
    }


    outputBookieTotal (LayStake) {

        const BookieProfitInput = ( parseFloat(this.state.BackStake) * (parseFloat(this.state.BackOdds) - 1));
        const BookieProfit = isNaN(BookieProfitInput) ? 0 : BookieProfitInput;
        const LayOdds = isNaN(this.state.LayOdds) ? 0: this.state.LayOdds;
        const ExchangeLiabilityInput = (parseFloat(LayStake) * (parseFloat(LayOdds) - 1));
        const ExchangeLiability =  isNaN(ExchangeLiabilityInput) ? 0 : ExchangeLiabilityInput;

        return BookieProfit - ExchangeLiability;
    }

    outputExchangeTotal (LayStake) {
        const BackStakeFirst = isNaN(this.state.BackStake) ? 0 : parseFloat(this.state.BackStake);
        const BackStake = (isNaN(BackStakeFirst) ? 0 : parseFloat(BackStakeFirst));

        const LayCommission =  isNaN(parseInt(this.state.LayCommission)) ? 0 : parseInt(this.state.LayCommission) ;
        const LayProfit =  isNaN(LayStake - LayStake*(LayCommission/100)) ? 0 : parseFloat(LayStake - LayStake*(LayCommission/100)) ;

        return this.state.qualifyingBet ? -BackStake + LayProfit : LayProfit;
    }

    render() {
        const ColoredLine = ({ color }) => (
            <hr
                style={{
                    color: color,
                    backgroundColor: color,
                    height: 5
                }}
            />
        );

        const BackStakeFirst = isNaN(this.state.BackStake) ? 0 : parseFloat(this.state.BackStake);
        const BackStake = (isNaN(BackStakeFirst) ? 0 : this.state.qualifyingBet ? parseFloat(BackStakeFirst) : 0);

        const BackOddsFirst = isNaN(this.state.BackOdds) ? 0 : parseFloat(this.state.BackOdds);
        const BackOdds = (isNaN(BackOddsFirst) ? 0 : parseFloat(BackOddsFirst));
        const LayStake = this.round(isNaN(this.state.LayStake) ? 0 : parseFloat(this.state.LayStake),2) ;

        const LayCommission =  isNaN(parseInt(this.state.LayCommission)) ? 0 : parseInt(this.state.LayCommission) ;
        const LayProfit =  isNaN(LayStake - LayStake*(LayCommission/100)) ? 0 : parseFloat(LayStake - LayStake*(LayCommission/100)) ;
        const LayOdds = (isNaN(this.state.LayOdds) ? 0: this.state.LayOdds);

        const ExchangeLiabilityInput = (parseFloat(LayStake) * (parseFloat(LayOdds) - 1));
        const ExchangeLiability =  isNaN(ExchangeLiabilityInput) ? 0 : ExchangeLiabilityInput;

        const BookieProfitInput = ( parseFloat(this.state.BackStake) * (parseFloat(this.state.BackOdds) - 1));
        const BookieProfit = isNaN(BookieProfitInput) ? 0 : BookieProfitInput;
        const isBookieProfitable = this.round(BookieProfit - ExchangeLiability, 2) >=0;
        const isExchangeProfitable = this.round(-(this.state.qualifyingBet ? BackStake: 0) + LayProfit,2) >= 0;

        return (

            <div>
                <h1 className='header-title'> Click below button to switch Bet mode calculation</h1>
                <div className="btn-group">
                    <button className="button" onClick={this.handleQualifyingBetMode}>{this.state.qualifyingBet ? <h2>Qualifying Bet mode</h2> : <h2> Stake No Return mode</h2>}</button>
                </div>

                <h1 className='header-title'> Input numbers to see relevant Lay Stake Amount </h1>
                <div className='bookmaker'>
                    <div className='inside-div '>
                        <form>
                            <label>
                                Back Stake :
                                <input type="text" name="BackStake" value={this.state.BackStake} onChange={this.handleChange} />
                            </label>
                        </form>

                        <form>
                            <label>
                                Back Odds:
                                <input type="text" name="BackOdds" value={this.state.BackOdds} onChange={this.handleChange} />
                            </label>
                        </form>
                    </div>
                    <div className='inside-div'>
                        <form >
                            <label>
                                Back Commission:
                                <input type="text" name="BackCommission" value={this.state.BackCommission} onChange={this.handleChange} />
                            </label>
                        </form>
                    </div>
                </div>

                <div className='exchange'>
                    <div className='inside-div'>
                        {(BackStake>0 || !this.state.qualifyingBet) && BackOdds > 0 && LayOdds> 0 && LayCommission > 0 &&

                        <form >
                            <label>
                                Lay Stake:
                                <input type="text" name="LayStake" value={LayStake} onChange={this.handleChange} />
                            </label>
                        </form>}

                        <form>
                            <label>
                                Lay Odds:
                                <input type="text" name="LayOdds" value={LayOdds} onChange={this.handleChange} />
                            </label>
                        </form>

                    </div>
                    <div className='inside-div'>
                        <form >
                            <label>
                                Lay Commission:
                                <input type="text" name="LayCommission" value={LayCommission} onChange={this.handleChange} />
                            </label>
                        </form>
                    </div>
                </div>
                <div>

                    {this.state.BackStake > 0 && this.state.BackOdds > 0 &&
                    this.state.LayOdds > 0 && this.state.LayCommission > 0 &&

                    <div>
                        <ColoredLine color='#333333'/>
                        <p>
                            <span className='lay-stake-info-before'>You could lay : </span>
                            <span className='lay-stake-info'>  £{LayStake} </span>
                        </p>
                    </div>

                    }

                </div>

                <ColoredLine color='#333333'/>

                <h1 className='header-title'> Profit breakdown </h1>

                <div>
                    <table className='profit-breakdown'>
                        <tbody>
                        <tr className='table-column-header'>
                            <th></th>
                            <th>Bookmaker</th>
                            <th>Exchange</th>
                            <th></th>
                            <th>Total</th>

                        </tr>
                        <tr>
                            <td className='table-header-bookmaker' >If Bookmaker wins</td>
                            <td><span className='first-summary green' >+£{this.round(BookieProfit,2)}</span></td>
                            <td><span className='first-summary red'>-£{this.round(ExchangeLiability,2)}</span></td>
                            <td>=</td>
                            <td><span className={isBookieProfitable ? 'first-summary green': 'first-summary red'}>
                        £{this.round(this.outputBookieTotal(LayStake),2)} </span></td>
                        </tr>
                        <tr>
                            <td className='table-header-exchange'>If Exchange wins</td>
                            <td><span className='first-summary red'>-£{this.state.qualifyingBet ? this.round(BackStake,2) : this.round(0,2)}</span></td>
                            <td><span className='first-summary green'>+£{this.round(LayProfit,2)}</span></td>
                            <td>=</td>
                            <td><span className={isExchangeProfitable ? 'first-summary green': 'first-summary red'}>
                        £{this.round(this.outputExchangeTotal (LayStake),2)} </span></td>
                        </tr>
                        </tbody>

                    </table>
                </div>
                <ColoredLine color='#333333'/>

                <h1 className='header-title'> Customize Lay Stake </h1>

                <Slider
                    handleRange = {this.handleRangeInput}
                    step={0.001}
                    value={this.state.SliderValue}
                    minOverLayValue={this.state.minUnderLayValue}
                    minValueDisplay={this.state.minUnderLayValue}
                    maxOverLayValue={this.state.maxOverLayValue}
                    maxValueDisplay={this.state.maxOverLayValue}
                    handleUnderOverLay = {this.handleUnderOverLay}
                />
            </div>
        );
    }
}

export default NameForm;

