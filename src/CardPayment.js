import React, { Component } from 'react';
import './CardPayment.css'

class CardPayment extends Component {
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
            <div className='card-payment'>
                <div className='creedit-card'>
                <img alt="VisaMasterCard not found" height='30px' src="./VisaMasterCard.jpg" />
                    <input className='card-payment-input card-number' placeholder="номер карты" type="text" />
                    <input className='card-payment-input card-year' placeholder="ММ/ГГ" type="text" />
                    <input className='card-payment-input card-csv' placeholder="CVC" type="text" />
                </div>
                <div className='discrepyion-payment'>
                    <article class="field">
                        <input className='card-payment-input' placeholder="от 1000 до 75000 ₽" type="text" />
                        <p>Сумма</p>
                    </article>

                    <article class="field">
                        <input className='card-payment-input' placeholder="до 150 символов" type="text" />
                        <p>Коментарий</p>
                    </article>

                    <article class="field">
                        <input className='card-payment-input' placeholder="для квитанции об оплате" type="email" />
                        <p>Ваша эл.почта</p>
                    </article>
                    <div class="button25">заплатить</div>
                </div>
            </div>
        );
    }
}

export default CardPayment;
