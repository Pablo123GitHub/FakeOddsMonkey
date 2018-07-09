import React, { Component } from 'react';
import './App.css';


class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BackStake: '',
            BackOdds: '',
            LayStake: '',
            LayOdds : ''

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
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
        return (
            <div>
                <ColoredLine color='black'/>

            <form onSubmit={this.handleSubmit}>
                <label>
                    Back Stake :
                    <input type="text" name="BackStake" value={this.state.BackStake} onChange={this.handleChange} />
                </label>
                {/*<input type="submit" value="Submit" />*/}
            </form>

            <form onSubmit={this.handleSubmit}>
                <label>
                    Back Odds:
                    <input type="text" name="BackOdds" value={this.state.BackOdds} onChange={this.handleChange} />
                </label>
                {/*<input type="submit" value="Submit" />*/}
            </form>

                <ColoredLine color='black'/>

            <form onSubmit={this.handleSubmit}>
                <label>
                    Lay Stake:
                    <input type="text" name="LayStake" value={this.state.LayStake} onChange={this.handleChange} />
                </label>
                {/*<input type="submit" value="Submit" />*/}
            </form>

            <form onSubmit={this.handleSubmit}>
                <label>
                    Lay Odds:
                    <input type="text" name="LayOdds" value={this.state.LayOdds} onChange={this.handleChange} />
                </label>
                {/*<input type="submit" value="Submit" />*/}
            </form>
                <ColoredLine color='black'/>

                <p>here is what I win with the Bookie : {this.state.BackStake} </p>

                <p> Liability : {(parseFloat(this.state.BackStake) * (parseFloat(this.state.BackOdds) - 1))  }     </p>

            </div>
        );
    }
}

export default NameForm;

