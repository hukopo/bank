import React, { Component } from 'react';
import './InternetBankPayment.css'

import NotesActions from './action/NotesActions';

class Pay extends Component {
    constructor() {
        super();
        this.state = {
            inn: '',
            scoreNum: '',
            description: '',
            sum: '',
            email: '',
            phoneNum: '',
            nds: '0'
        }
        this.changeInn = this.changeInn.bind(this);
        this.changeScoreNum = this.changeScoreNum.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeSum = this.changeSum.bind(this);
        this.clearFields = this.clearFields.bind(this);
        this.canSend = this.canSend.bind(this);
        this.sendToServer = this.sendToServer.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.changePhoneNum = this.changePhoneNum.bind(this);
    }

    changeInn() {
        let value = document.getElementById("inn").value;
        let newValue = ""
        const len = Math.min(value.length, 10);
        for(let i= 0; i < len; i++){
            if (/^[0-9]{1}$/.test(value[i]))
                newValue += value[i];
        }
        this.setState({ inn: newValue });
        document.getElementById("inn").value = newValue;
    }

    changeScoreNum() {
        let value = document.getElementById("scoreNum").value;
        let newValue = ""
        const len = Math.min(value.length, 19);
        for(let i= 0; i < len; i++){
            if (/^[0-9]{1}$/.test(value[i]))
                newValue += value[i];
        }
        this.setState({ scoreNum: newValue });
        document.getElementById("scoreNum").value = newValue;
    }
    
    changeDescription() {
        let value = document.getElementById("description").value;
        if (value.length <= 150)
            this.setState({ description: value });
    }

    changeSum() {
        let value = document.getElementById("sum").value;
        let newValue = ""
        const len = Math.min(value.length, 7);
        for(let i= 0; i < len; i++){
            if (/^[0-9]{1}$/.test(value[i]))
                newValue += value[i];
        }
        this.setState({ sum: newValue });
        document.getElementById("sum").value = newValue;
    }

    changeEmail() {
        let value = document.getElementById("email").value;
        if (value.indexOf('@') > 0)
            this.setState({ email: value });
        else
            this.setState({ email: 'err' });
    }

    changePhoneNum() {
        let value = document.getElementById("phoneNum").value;
        let newValue = ""
        const len = Math.min(value.length, 11);
        for(let i= 0; i < len; i++){
            if (/^[0-9]{1}$/.test(value[i]))
                newValue += value[i];
        }
        this.setState({ phoneNum: newValue });
        document.getElementById("phoneNum").value = newValue;
    }

    clearFields() {
        document.getElementById("inn").value = '';
        document.getElementById("scoreNum").value = '';
        document.getElementById("sum").value = '';
        document.getElementById("description").value = '';
        
        this.setState({
            inn: '',
            scoreNum: '',
            description: '',
            sum: '',
            email: '',
            phoneNum: ''
        });
    }

    canSend() {
        return this.state.inn 
            || this.state.scoreNum
            || this.state.description
            || this.state.sum
            || this.state.email
            || this.state.phoneNum
    }

    sendToServer() {
        if (!this.canSend()){
            alert('fail');
            return;
        }

        const newNote = {
            scoreNum: this.state.scoreNum,
            recInn: this.state.inn,
            sum: this.state.sum,
            comment: this.state.description,
            email: this.state.email,
            phoneNum: this.state.phoneNum
        };
        NotesActions.createNote(newNote);

        this.clearFields()
        
        alert('success');
    }

    render() {
        return (
            <div className='card-payment'>
                <div>
                    <article className="field-internet-bank">
                        <input id="inn" className='internet-bank-input' placeholder="ИНН или название получателя" type="text" onChange={this.changeInn}/>
                        <p>ИНН получателя</p>
                    </article>

                    <article className="field-internet-bank">
                        <p>БИК</p>
                    </article>

                    <article className="field-internet-bank">
                        <input id="scoreNum" className='internet-bank-input' type="text" onChange={this.changeScoreNum}/>
                        <small className='purpose-payment'>назначение платежа</small>
                        <p>Номер счета</p>
                    </article>

                    <article className="field-internet-bank">
                        <input id="description" className='nds-input' placeholder={`НДС ${this.state.nds}%`} type="text" onChange={this.changeDescription}/>
                        <small onClick={() => this.switchNDS(18)} style={this.state.nds === 18 ? { color: 'deepskyblue' } : null} className='nds18'>НДС 18%</small>
                        <small onClick={() => this.switchNDS(10)} style={this.state.nds === 10 ? { color: 'deepskyblue' } : null} className='nds10'>НДС 10%</small>
                        <small onClick={() => this.switchNDS(0)} style={this.state.nds === 0 ? { color: 'deepskyblue' } : null} className='nds-none'>Без НДС</small>
                        <p>За что</p>
                    </article>

                    <article className="field-internet-bank">
                        <input id="sum" className='internet-bank-input' type="text" onChange={this.changeSum}/>
                        <p>Сколько</p>
                    </article>

                    <article className="field-internet-bank">
                        <input id="phoneNum" className='internet-bank-input' placeholder='8' type="text" onChange={this.changePhoneNum}/>
                        <small className='phone-small'>оставляя телефон вы соглашаетесь на обработку персональных данных</small>
                        <p>Номер телефона</p>
                    </article>

                    <article className="field-internet-bank">
                        <input id="email" className='internet-bank-input' placeholder='для уведомлений об оплате' type="email" onChange={this.changeEmail}/>
                        <p>Эл.почта</p>
                    </article>
                    <div className="button25">Создать платеж</div>
                    <br />
                    <div className='clear'>
                        <a className='clear' href='/#/home' onClick={this.clearFields}>Отчистить форму</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pay;
