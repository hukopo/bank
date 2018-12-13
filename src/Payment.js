import React, { Component } from 'react';
import CardPayment from './CardPayment'
import InternetBankPayment from './InternetBankPayment'
import Pay from './Pay'
import './Payment.css';

class Payment extends Component {
    constructor() {
        super();
        this.state = {
            tabName: 'pay',
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
                    <div className='tab' style={this.state.tabName === 'pay' ? { color: 'black' } : {}} onClick={this.switchPay}>Заплатить</div>
                    <div className='tab' style={this.state.tabName === 'request payment' ? { color: 'black' } : {}} onClick={this.switchRequestPayment}>Запросить платеж</div>
                </div>
                <br/>
                { this.state.tabName === 'pay' && <div>
                    <div className='tab' style={this.state.paymentMethod === 'card' ? { color: 'black' } : {}} onClick={this.switchPaymentMethodOnCard}>С карты любого банка</div>
                    <div className='tab' style={this.state.paymentMethod === 'Internet bank' ? { color: 'black' } : {}} onClick={this.switchPaymentMethodOnInternetBank}>Из своего интерент банка</div>
                </div>}
                { (this.state.tabName === 'pay' && this.state.paymentMethod === 'card') && <CardPayment/>}
                { (this.state.tabName === 'pay' && this.state.paymentMethod === 'Internet bank') && <InternetBankPayment/>}
                { this.state.tabName === 'request payment' && <Pay/>}
            </div>
        );
    }
}

export default Payment;
