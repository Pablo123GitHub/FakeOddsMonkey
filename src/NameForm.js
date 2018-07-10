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
            LayCommission: ''

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

        const BackStake = isNaN(this.state.BackStake) ? 0 : parseFloat(this.state.BackStake);
        const LayStake = isNaN(this.state.LayStake) ? 0 : parseFloat(this.state.LayStake) ;

        const LayCommision =  isNaN(parseInt(this.state.LayCommission)) ? 0 : parseInt(this.state.LayCommission) ;
        const LayProfit = LayStake - LayStake*(LayCommision/100);
        const LayOdds = isNaN(this.state.LayOdds) ? 0: this.state.LayOdds;


        const BookieProfitInput = ( parseFloat(this.state.BackStake) * (parseFloat(this.state.BackOdds) - 1));
        const BookieProfit = isNaN(BookieProfitInput) ? 0 : BookieProfitInput;

        const ExchangeLiabilityInput = (parseFloat(this.state.LayStake) * (parseFloat(this.state.LayOdds) - 1));
        const ExchangeLiability =  isNaN(ExchangeLiabilityInput) ? 0 : ExchangeLiabilityInput;

        return (

            <div>
                <ColoredLine color='black'/>
                <div className='bookmaker'>
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
                <ColoredLine color='black'/>

                <div className='exchange'>
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


                <form >
                    <label>
                        Lay Commission:
                        <input type="text" name="LayCommission" value={this.state.LayCommission} onChange={this.handleChange} />
                    </label>
                </form>
                </div>

                <ColoredLine color='black'/>

                <p> What I win with the Bookie : {this.round(BookieProfit,2) }  </p>

                <p> At Lay odds of {LayOdds} my Liability is : {this.round(ExchangeLiability,2)} </p>

                <p>  Overall profit will be : {this.round(BookieProfit -ExchangeLiability,2)} </p>
                <p> Lay Commission is : {LayCommision}  </p>

                <ColoredLine color='black'/>

                <p> Profit breakdown </p>

                <p> If Bookie wins : {this.round(BookieProfit,2)} - {this.round(ExchangeLiability,2)} = {this.round(BookieProfit - ExchangeLiability, 2)} </p>

                <p> If Exchange wins : -{this.round(BackStake,2)} + {this.round(LayProfit,2)}  =  {this.round(-BackStake + LayProfit,2)} </p>
            </div>
        );
    }
}

export default NameForm;

