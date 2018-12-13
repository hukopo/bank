import React, { Component } from 'react';
import './CardPayment.css'

import NotesActions from './action/NotesActions';


class CardPayment extends Component {
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
        this.clearFields = this.clearFields.bind(this);
    }

    changeCardNumber() {
        let value = document.getElementById("cardNumber").value;
        let newValue = ""
        const len = Math.min(value.length, 19);
        for (let i = 0; i < len; i++) {
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
        for (let i = 0; i < len; i++) {
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
        for (let i = 0; i < len; i++) {
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
        for (let i = 0; i < len; i++) {
            if (/^[0-9]{1}$/.test(value[i]) || (i === 2 && value[i] === '/'))
                newValue += value[i];
        }
        const sumINT = Number.parseInt(value);
        if (sumINT > 75000 || sumINT < 1000)
            newValue = null;
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
            this.setState({ email: null });
    }

    clearFields() {
        document.getElementById("cardYear").value = '';
        document.getElementById("cardNumber").value = '';
        document.getElementById("cardYear").value = '';
        document.getElementById("CVC").value = '';
        document.getElementById("sum").value = '';
        document.getElementById("comment").value = '';
        document.getElementById("email").value = '';
        
        this.setState({
            cardNumber: '',
            cardYear: '',
            sum: '',
            comment: '',
            email: '',
            CVC: ''
        });
    }

    canSend() {
        return this.state.cardNumber 
            && this.state.cardYear
            && this.state.sum
            && this.state.comment
            && this.state.email
            && this.state.CVC
    }

    sendToServer() {
        if (!this.canSend()){
            alert('fail');
            return;
        }

        const newNote = {
            cardNum: this.state.cardNumber,
            cardYear: this.state.cardYear,
            sum: this.state.sum,
            comment: this.state.comment,
            email: this.state.email,
            cardCVC: this.state.CVC
        };
        NotesActions.createNote(newNote);

        this.clearFields()
        
        alert('success');
    }

    render() {
        return (
            <div className='card-payment'>
                <div className='creedit-card'>
                    <img alt="VisaMasterCard not found" height='30px' src="./VisaMasterCard.jpg" />
                    <input id="cardNumber" className='card-payment-input card-number' placeholder="номер карты" type="text" onChange={this.changeCardNumber} />
                    <input id="cardYear" className='card-payment-input card-year' placeholder="ММ/ГГ" type="text" onChange={this.changeCardYear} />
                    <input id="CVC" className='card-payment-input card-csv' placeholder="CVC" type="text" onChange={this.changeCVC} />
                </div>
                <div className='discrepyion-payment'>
                    <article class="field">
                        <input id="sum" className='card-payment-input' style={this.state.sum === null ? { borderBottomColor: 'red' } : null} placeholder="от 1000 до 75000 ₽" type="text" onChange={this.changeSum} />
                        <p>Сумма</p>
                    </article>

                    <article class="field">
                        <input id="comment" className='card-payment-input' placeholder="до 150 символов" type="text" onChange={this.changeComment} />
                        <p>Коментарий</p>
                    </article>

                    <article class="field">
                        <input id="email" className='card-payment-input' style={this.state.email === null ? { borderBottomColor: 'red' } : null} placeholder="для квитанции об оплате" type="email" onChange={this.changeEmail} />
                        <p>Ваша эл.почта</p>
                    </article>
                    <div className={this.canSend() ? "button25" : "button25disabled"} onClick={this.sendToServer}>заплатить</div>
                </div>
            </div>
        );
    }
}

export default CardPayment;
