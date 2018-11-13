import React, { Component } from 'react';
import './InternetBankPayment.css'

class InternetBankPayment extends Component {
    constructor() {
        super();
        this.state = {
            nds: 0,
            paymentMethod: 'card'
        }
        this.switchRequestPayment = this.switchRequestPayment.bind(this);
        this.switchNDS = this.switchNDS.bind(this);
        this.switchPaymentMethodOnCard = this.switchPaymentMethodOnCard.bind(this);
        this.switchPaymentMethodOnInternetBank = this.switchPaymentMethodOnInternetBank.bind(this);
    }

    switchRequestPayment() {
        this.setState({ tabName: 'request payment' });
    }

    switchNDS(proc) {
        this.setState({ nds: proc });
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
                <div>
                    <article class="field-internet-bank">
                        <input className='internet-bank-input' placeholder="ИНН или название платильшека" type="text" />
                        <p>От кого</p>
                    </article>

                    <article class="field-internet-bank">
                        <p>БИК</p>
                    </article>

                    <article class="field-internet-bank">
                        <input className='internet-bank-input' type="text" />
                        <small className='purpose-payment'>назначение платежа</small>
                        <p>Номер счета</p>
                    </article>

                    <article class="field-internet-bank">
                        <input className='nds-input' placeholder={`НДС ${this.state.nds}%`} type="text" />
                        <small onClick={() => this.switchNDS(18)} style={this.state.nds === 18 ? { color: 'deepskyblue' } : null} className='nds18'>НДС 18%</small>
                        <small onClick={() => this.switchNDS(10)} style={this.state.nds === 10 ? { color: 'deepskyblue' } : null} className='nds10'>НДС 10%</small>
                        <small onClick={() => this.switchNDS(0)} style={this.state.nds === 0 ? { color: 'deepskyblue' } : null} className='nds-none'>Без НДС</small>
                        <p>За что</p>
                    </article>

                    <article class="field-internet-bank">
                        <input className='internet-bank-input' type="text" />
                        <p>Сколько</p>
                    </article>
                    <div class="button25">заплатить</div>
                </div>
            </div>
        );
    }
}

export default InternetBankPayment;
