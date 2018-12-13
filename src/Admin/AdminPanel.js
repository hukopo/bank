import React, { Component } from 'react';

import NotesActions from '../action/NotesActions';
import NotesStore from '../stores/NotesStore';
import ReactToPrint from "react-to-print";
import './Table.css'

function getStateFromFlux() {
    return {
        isLoading: NotesStore.isLoading(),
        notes: NotesStore.getNotes()
    };
}

class AdminPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pay: null,
            isLoading: {},
            notes: []
        }
        this.getInitialState = this.getInitialState.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.handleNoteDelete = this.handleNoteDelete.bind(this);
        this.handleNoteAdd = this.handleNoteAdd.bind(this);
        this._onChange = this._onChange.bind(this);
        this.display = this.display.bind(this);
        this.switchRequestPayment = this.switchRequestPayment.bind(this);
        this.switchPay = this.switchPay.bind(this);
    }

    switchRequestPayment() {
        this.setState({ pay: false });
        this.componentWillMount();
    }

    switchPay() {
        this.setState({ pay: true });
        this.componentWillMount();
    }

    getInitialState() {
        return getStateFromFlux();
    }

    componentWillMount() {
        if (this.state.pay === true)
            NotesActions.loadNotes();
        else
            NotesActions.loadNotesPay();

    }

    componentDidMount() {
        NotesStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        NotesStore.removeChangeListener(this._onChange);
    }

    handleNoteDelete(note) {
        if (this.state.pay === true)
            NotesActions.deleteNote(note.id);
        else
            NotesActions.deleteNotePay(note.id);
    }

    handleNoteAdd(noteData) {
        if (this.state.pay === true)
            NotesActions.createNote(noteData);
        else
            NotesActions.createNotePay(noteData);
    }

    display() {
        console.table(this.state.notes);
    }

    render() {
        return (
            <div className='card-payment'>
                <div>
                    <div className='tab' style={this.state.pay ? { color: 'black' } : {}} onClick={this.state.pay ? null : this.switchPay}>Запросить платеж</div>
                    <div className='tab' style={!this.state.pay ? { color: 'black' } : {}} onClick={this.state.pay ? this.switchRequestPayment : null}>Заплатить</div>
                </div>
                <button onClick={this.display}>write to console</button>
                {this.state.pay !== null && <PDFPrinterForPay notes={this.state.notes} pay={this.state.pay} />}
                {/*this.state.pay && <PDFPrinterForPay notes={this.state.notes} />*/}
            </div>
        );
    }

    _onChange() {
        this.setState(getStateFromFlux());
    }
}

class NotesTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pay: this.props.pay
        }
        this.handleNoteDelete = this.handleNoteDelete.bind(this);
    }

    handleNoteDelete(note) {
        if (this.state.pay === true)
            NotesActions.deleteNote(note.id);
        else
            NotesActions.deleteNotePay(note.id);
    }

    render() {
        return (
            <div>
                {this.props.pay ?
                    <table border="1">
                        <caption>Таблица заметок платежей</caption>
                        <tr>
                            <th></th>
                            <th>id</th>
                            <th>recInn</th>
                            <th>scoreNum</th>
                            <th>comment</th>
                            <th>sum</th>
                            <th>phoneNum</th>
                            <th>email</th>
                            <th>createdAt</th>
                        </tr>
                        {this.props.notes && this.props.notes.map((n, i) =>
                            <tr key={i}>
                                <td style={{ backgroundColor: 'brown', cursor: 'pointer' }} onClick={() => this.handleNoteDelete(n)}>del</td>
                                <td style={{ backgroundColor: 'whitesmoke' }}>{n.id}</td>
                                <td>{n.recInn}</td>
                                <td>{n.scoreNum}</td>
                                <td>{n.comment}</td>
                                <td>{n.sum}</td>
                                <td>{n.phoneNum}</td>
                                <td>{n.email}</td>
                                <td>{n.createdAt}</td>
                            </tr>)}
                    </table>
                    :
                    <table border="1">
                <caption>Таблица заметок платежей</caption>
                <tr>
                    <th></th>
                    <th>id</th>
                    <th>cardNum</th>
                    <th>cardYear</th>
                    <th>cardCVC</th>
                    <th>sum</th>
                    <th>comment</th>
                    <th>email</th>
                    <th>scoreNum</th>
                    <th>payerNum</th>
                    <th>createdAt</th>
                </tr>
                {this.props.notes && this.props.notes.map((n, i) =>
                    <tr key={i}>
                        <td style={{ backgroundColor: 'brown', cursor: 'pointer' }} onClick={() => this.handleNoteDelete(n)}>del</td>
                        <td style={{ backgroundColor: 'whitesmoke' }}>{n.id}</td>
                        <td>{n.cardNum}</td>
                        <td>{n.cardYear}</td>
                        <td>{n.cardCVC}</td>
                        <td>{n.sum}</td>
                        <td>{n.comment}</td>
                        <td>{n.email}</td>
                        <td>{n.scoreNum}</td>
                        <td>{n.payerNum}</td>
                        <td>{n.createdAt}</td>
                    </tr>)}
            </table>}
            </div>
        );
    }
}

class PDFPrinterForPay extends React.Component {
    render() {

        console.log(this.props.notes);
        return (
            <div>
                <ReactToPrint
                    // eslint-disable-next-line
                    trigger={() => <a href="#">Print to pdf</a>}
                    content={() => this.componentRef}
                />
                <NotesTable ref={el => (this.componentRef = el)}
                    notes={this.props.notes} pay={this.props.pay} />
            </div>
        );
    }
}

export default AdminPanel;
