import React, { Component } from 'react';

import NotesActions from './action/NotesActions';

import './InternetBankPayment.css'

class InternetBankPayment extends Component {
    constructor() {
        super();
        this.state = {
            inn: '',
            scoreNum: '',
            description: '',
            sum: '',
            nds: '0'
        }
        this.changeInn = this.changeInn.bind(this);
        this.changeScoreNum = this.changeScoreNum.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeSum = this.changeSum.bind(this);
        this.clearFields = this.clearFields.bind(this);
        this.canSend = this.canSend.bind(this);
        this.sendToServer = this.sendToServer.bind(this);
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

    clearFields() {
        document.getElementById("inn").value = '';
        document.getElementById("scoreNum").value = '';
        document.getElementById("sum").value = '';
        document.getElementById("description").value = '';
        
        this.setState({
            inn: '',
            scoreNum: '',
            description: '',
            sum: ''
        });
    }

    canSend() {
        return this.state.inn 
            && this.state.scoreNum
            && this.state.description
            && this.state.sum
    }

    sendToServer() {
        if (!this.canSend()){
            //alert('fail');
            return;
        }

        const newNote = {
            scoreNum: this.state.scoreNum,
            payerNum: this.state.inn,
            sum: this.state.sum,
            comment: this.state.description
        };
        NotesActions.createNote(newNote);

        this.clearFields()
        
        alert('success');
    }

    render() {
        return (
            <div className='card-payment'>
                <div>
                    <article class="field-internet-bank">
                        <input id="inn" className='internet-bank-input' placeholder="ИНН или название платильшека" type="text" onChange={this.changeInn}/>
                        <p>От кого</p>
                    </article>

                    <article class="field-internet-bank">
                        <p>БИК</p>
                    </article>

                    <article class="field-internet-bank">
                        <input id="scoreNum" className='internet-bank-input' type="text" onChange={this.changeScoreNum}/>
                        <small className='purpose-payment'>назначение платежа</small>
                        <p>Номер счета</p>
                    </article>

                    <article class="field-internet-bank">
                        <input id="description" className='nds-input' placeholder={`НДС ${this.state.nds}%`} type="text" onChange={this.changeDescription}/>
                        <small onClick={() => this.switchNDS(18)} style={this.state.nds === 18 ? { color: 'deepskyblue' } : null} className='nds18'>НДС 18%</small>
                        <small onClick={() => this.switchNDS(10)} style={this.state.nds === 10 ? { color: 'deepskyblue' } : null} className='nds10'>НДС 10%</small>
                        <small onClick={() => this.switchNDS(0)} style={this.state.nds === 0 ? { color: 'deepskyblue' } : null} className='nds-none'>Без НДС</small>
                        <p>За что</p>
                    </article>

                    <article class="field-internet-bank">
                        <input id="sum" className='internet-bank-input' type="text" onChange={this.changeSum}/>
                        <p>Сколько</p>
                    </article>
                    <div className={this.canSend() ? "button25" : "button25disabled"} onClick={this.sendToServer}>заплатить</div>
                </div>
            </div>
        );
    }
}

export default InternetBankPayment;
