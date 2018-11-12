import React, { Component } from 'react';
import CardPayment from './CardPayment'
import './App.css';

class Payment extends Component {
    constructor() {
        super();
        this.state = {
            tabName: 'request payment',
            paymentMethod: 'card'
        }
        this.switchRequestPayment = this.switchRequestPayment.bind(this);
        this.switchPay = this.switchPay.bind(this);
        this.switchPaymentMethodOnCard = this.switchPaymentMethodOnCard.bind(this);
        this.switchPaymentMethodOnInternetBank = this.switchPaymentMethodOnInternetBank.bind(this);
    }

    switchRequestPayment() {
        this.setState({ tabName: 'request payment' });
    }

    switchPay() {
        this.setState({ tabName: 'pay' });
    }

    switchPaymentMethodOnCard() {
        this.setState({ paymentMethod: 'card' });
    }

    switchPaymentMethodOnInternetBank() {
        this.setState({ paymentMethod: 'Internet bank' });
    }

    render() {
        return (
            <div className='header'>
                <div>
                    <div className='tab' style={this.state.tabName === 'pay' ? { color: 'deepskyblue' } : {}} onClick={this.switchPay}>Заплатить</div>
                    <div className='tab' style={this.state.tabName === 'request payment' ? { color: 'deepskyblue' } : {}} onClick={this.switchRequestPayment}>Запросить платеж</div>
                </div>
                <br/>
                <div>
                    <div className='tab' style={this.state.paymentMethod === 'card' ? { color: 'deepskyblue' } : {}} onClick={this.switchPaymentMethodOnCard}>С карты любого банка</div>
                    <div className='tab' style={this.state.paymentMethod === 'Internet bank' ? { color: 'deepskyblue' } : {}} onClick={this.switchPaymentMethodOnInternetBank}>Из своего интерент банка</div>
                </div>
                { (this.state.tabName === 'request payment' && this.state.paymentMethod === 'card') && <CardPayment/>}
            </div>
        );
    }
}

export default Payment;
