import React, { Component } from 'react';
import './App.css';
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
                <input placeholder="номер карты" type="email" />
                <input placeholder="ММ/ГГ" type="email" />
                <input placeholder="CVC" type="email" />

                </div>
                <div>
                    <article class="field">
                        <input placeholder="от 1000 до 75000 ₽" type="email" />
                        <p>Сумма</p>
                    </article>

                    <article class="field">
                        <input placeholder="до 150 символов" type="text" />
                        <p>Коментарий</p>
                    </article>

                    <article class="field">
                        <input placeholder="для квитанции об оплате" type="text" />
                        <p>Ваша эл.почта</p>
                    </article>
                </div>
            </div>
        );
    }
}

export default CardPayment;
