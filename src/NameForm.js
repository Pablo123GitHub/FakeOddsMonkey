import React, { Component } from 'react';
import './App.css';


class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BackStake: '',
            BackOdds: '',
            LayStake: '',
            LayOdds : '',
            LayCommission: '',
            BackCommission: 0

        };

        this.handleChange = this.handleChange.bind(this);
        this.round = this.round.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    round (value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
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
        const BackStake = (isNaN(BackStakeFirst) ? 0 : parseFloat(BackStakeFirst));
        const LayStake = isNaN(this.state.LayStake) ? 0 : parseFloat(this.state.LayStake) ;

        const LayCommision =  isNaN(parseInt(this.state.LayCommission)) ? 0 : parseInt(this.state.LayCommission) ;
        const LayProfit =  isNaN(LayStake - LayStake*(LayCommision/100)) ? 0 : parseFloat(LayStake - LayStake*(LayCommision/100)) ;
        const LayOdds = isNaN(this.state.LayOdds) ? 0: this.state.LayOdds;

        const ExchangeLiabilityInput = (parseFloat(LayStake) * (parseFloat(LayOdds) - 1));
        const ExchangeLiability =  isNaN(ExchangeLiabilityInput) ? 0 : ExchangeLiabilityInput;

        const BookieProfitInput = ( parseFloat(this.state.BackStake) * (parseFloat(this.state.BackOdds) - 1));
        const BookieProfit = isNaN(BookieProfitInput) ? 0 : BookieProfitInput;
        const isBookieProfitable = this.round(BookieProfit - ExchangeLiability, 2) >=0;
        const isExchangeProfitable = this.round(-BackStake + LayProfit,2) >= 0;

        console.log(isBookieProfitable);
        console.log(isExchangeProfitable);
        return (

            <div>
                <ColoredLine color='#333333'/>
                <div className='bookmaker'>
                    <div className='inside-div'>
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

                <ColoredLine color='#333333'/>

                <div className='exchange'>
                    <div className='inside-div'>
                        <form >
                            <label>
                                Lay Stake:
                                <input type="text" name="LayStake" value={this.state.LayStake} onChange={this.handleChange} />
                            </label>
                        </form>


                        <form >
                            <label>
                                Lay Odds:
                                <input type="text" name="LayOdds" value={this.state.LayOdds} onChange={this.handleChange} />
                            </label>
                        </form>
                    </div>
                    <div className='inside-div'>
                        <form >
                            <label>
                                Lay Commission:
                                <input type="text" name="LayCommission" value={this.state.LayCommission} onChange={this.handleChange} />
                            </label>
                        </form>
                    </div>



                </div>

                <ColoredLine color='#333333'/>

                <h1 className='header-title'> Profit breakdown </h1>

                <div>
                    <table className='profit-breakdown'>
                        <tr className='table-column-header'>
                            <th></th>
                            <th>Bookmaker</th>
                            <th>Exchange</th>
                            <th>Total</th>

                        </tr>
                        <tr>
                            <td className='table-header-bookmaker' >If Bookmaker wins</td>
                            <td><span className='first-summary green' >+{this.round(BookieProfit,2)}</span></td>
                            <td><span className='first-summary red'>-{this.round(ExchangeLiability,2)}</span></td>
                            <td><span className={isBookieProfitable ? 'first-summary green': 'first-summary red'}>
                        {this.round(BookieProfit - ExchangeLiability, 2)} </span></td>
                        </tr>
                        <tr>
                            <td className='table-header-exchange'>If Exchange wins</td>
                            <td><span className='first-summary red'>-{this.round(BackStake,2)}</span></td>
                            <td><span className='first-summary green'>+{this.round(LayProfit,2)}</span></td>
                            <td><span className={isExchangeProfitable ? 'first-summary green': 'first-summary red'}>
                        {this.round(-BackStake + LayProfit,2)} </span></td>
                        </tr>

                    </table>
                </div>

            </div>
        );
    }
}

export default NameForm;

