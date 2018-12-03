import React, { Component } from 'react';
import './InternetBankPayment.css'

class InternetBankPayment extends Component {
    constructor() {
        super();
        this.state = {
            cardNumber: '',
            cardYear: '',
            sum: '',
            comment: '',
            email: '',
            CVC: ''
        }
        this.changeCardNumber = this.changeCardNumber.bind(this);
        this.changeCVC = this.changeCVC.bind(this);
        this.changeCardYear = this.changeCardYear.bind(this);
        this.changeSum = this.changeSum.bind(this);
        this.changeComment = this.changeComment.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.sendToServer = this.sendToServer.bind(this);
    }

    changeCardNumber() {
        let value = document.getElementById("cardNumber").value;
        let newValue = ""
        const len = Math.min(value.length, 19);
        for(let i= 0; i < len; i++){
            if (/^[0-9]{1}$/.test(value[i]))
                newValue += value[i];
        }
        this.setState({ cardNumber: newValue });
        document.getElementById("cardNumber").value = newValue;
    }

    changeCVC() {
        let value = document.getElementById("CVC").value;
        let newValue = ""
        const len = Math.min(value.length, 3);
        for(let i= 0; i < len; i++){
            if (/^[0-9]{1}$/.test(value[i]))
                newValue += value[i];
        }
        this.setState({ CVC: newValue });
        document.getElementById("CVC").value = newValue;
    }

    changeCardYear() {
        let value = document.getElementById("cardYear").value;
        let newValue = ""
        const len = Math.min(value.length, 5);
        for(let i= 0; i < len; i++){
            if (/^[0-9]{1}$/.test(value[i]) || (i === 2 && value[i] === '/'))
                newValue += value[i];
        }
        if (newValue.length === 2 && this.state.cardYear.length === 1)
            newValue += '/';
        this.setState({ cardYear: newValue });
        document.getElementById("cardYear").value = newValue;
    }

    changeSum() {
        let value = document.getElementById("sum").value;
        let newValue = ""
        const len = Math.min(value.length, 5);
        for(let i= 0; i < len; i++){
            if (/^[0-9]{1}$/.test(value[i]) || (i === 2 && value[i] === '/'))
                newValue += value[i];
        }
        const sumINT = Number.parseInt(value);
        if(sumINT > 75000 || sumINT < 1000)
            newValue = 'err';
        this.setState({ sum: newValue });
    }

    changeComment() {
        let value = document.getElementById("comment").value;
        if (value.length <= 150)
            this.setState({ comment: value });
    }

    changeEmail() {
        let value = document.getElementById("email").value;
        if (value.indexOf('@') > 0)
            this.setState({ email: value });
        else
            this.setState({ email: 'err' });
    }

    sendToServer(){
        alert('send');
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
                    <div class="button25" onClick={this.sendToServer}>заплатить</div>
                </div>
            </div>
        );
    }
}

export default InternetBankPayment;
