import React, { Component } from 'react';

import NotesActions from '../action/NotesActions';
import NotesStore from '../stores/NotesStore';
import ReactToPrint from "react-to-print";
import './Table.css'

const payFalseColumns = ["id", "cardNum", "cardYear", "cardCVC", "sum", "comment", "email", "scoreNum", "payerNum", "createdAt"];
const payTrueColumns = ["id", "recInn", "scoreNum", "comment", "sum", "phoneNum", "email", "createdAt"];

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
            notes: [],
            searchField: "id",
            sortField: "id",
            search: "",
            auth: false,
            authError: null
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
        this.onChangeSearchInput = this.onChangeSearchInput.bind(this);
        this.onChangeSearchSelect = this.onChangeSearchSelect.bind(this);
        this.onChangeSortSelect = this.onChangeSortSelect.bind(this);
        this.signIn = this.signIn.bind(this);
        this.passwordAndLoginCheck = this.passwordAndLoginCheck.bind(this);
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

    onChangeSearchInput() {
        let newValue = document.getElementById("search-input").value;
        this.setState({ search: newValue });
        document.getElementById("search-input").value = newValue;
    }

    onChangeSearchSelect() {
        let newValue = document.getElementById("search-select").value;
        this.setState({ searchField: newValue });
    }

    onChangeSortSelect() {
        let newValue = document.getElementById("sort-select").value;
        this.setState({ sortField: newValue });
    }

    display() {
        console.table(this.state.notes);
    }

    passwordAndLoginCheck(login, password) {
        if (login === "" || password === "" || login.includes(" ") || password.includes(" ")) {
            this.setState({ authError: "login or password can`t conyain space" });
            return false;
        }
        else {
            this.setState({ authError: null });
            return true;
        }
    }

    signIn() {
        let login = document.getElementById("login").value;
        let password = document.getElementById("password").value;
        if (this.passwordAndLoginCheck(login, password)) {
            //const user = {
            //    login: "1",
            //    password: "1"
            //};
            //NotesActions.createUser(user);       
            //let flag = false;
            NotesActions.signIN(login, password).then(a => a.data ? this.setState({ auth: true}) : this.setState({authError: "incorect login or password"}));
        }
        //this.setState({ auth: true });
    }

    render() {
        let newNotes = this.state.notes;
        newNotes = newNotes.filter(n => n[this.state.searchField].includes(this.state.search)).sort((a, b) => a[this.state.sortField] < b[this.state.sortField] ? -1 : 1)
        return (
            <div className='card-payment'>
                {!this.state.auth ?
                    <div>
                        <div>
                            sign in
                            <br />
                            <input id="login" />
                            <br />
                            <input type="password" id="password" />
                            <br />
                            <button onClick={this.signIn}>sign in</button>
                        </div>
                        {this.state.authError !== null &&
                            <div style={{ color: "red", background: "pink" }}>
                                <h3>Error: {this.state.authError}</h3>
                            </div>}
                    </div> :
                    <div>
                        {this.state.pay === null ? <div className='taba' style={this.state.pay !== true ? { color: 'deepskyblue' } : {}} onClick={this.state.pay === null ? this.switchPay : null}>Загрузить таблицы</div> :
                            <div>
                                <div className='taba' style={this.state.pay !== true ? { color: 'deepskyblue' } : {}} onClick={this.state.pay ? null : this.switchPay}>Запросить платеж</div>
                                <div className='taba' style={this.state.pay !== false ? { color: 'deepskyblue' } : {}} onClick={this.state.pay ? this.switchRequestPayment : null}>Заплатить</div>
                            </div>}
                        {this.state.pay && <button onClick={this.display}>write to console</button>}
                        {this.state.pay !== null &&
                            <div>
                                search
                        <select id="search-select" style={{ margin: "10px" }} onChange={this.onChangeSearchSelect}>
                                    {this.state.pay === false && payFalseColumns.map(o => <option>{o}</option>)}
                                    {this.state.pay === true && payTrueColumns.map(o => <option>{o}</option>)}
                                </select>
                                <input id="search-input" onChange={this.onChangeSearchInput} />
                            </div>}
                        {this.state.pay !== null &&
                            <div>
                                sort
                        <select id="sort-select" style={{ margin: "10px" }} onChange={this.onChangeSortSelect}>
                                    {this.state.pay === false && payFalseColumns.map(o => <option>{o}</option>)}
                                    {this.state.pay === true && payTrueColumns.map(o => <option>{o}</option>)}
                                </select>
                            </div>}
                        {this.state.pay !== null && <PDFPrinterForPay notes={newNotes} pay={this.state.pay} />}
                    </div>}
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
        this.handleNoteCheck = this.handleNoteCheck.bind(this);
    }

    handleNoteDelete(note) {
        if (this.state.pay === true)
            NotesActions.deleteNote(note.id);
        else
            NotesActions.deleteNotePay(note.id);
    }

    handleNoteCheck(note) {
        if (this.state.pay === true)
            NotesActions.checkNote(note.id);
        else
            NotesActions.checkNotePay(note.id);
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
                                <td style={{ backgroundColor: 'brown', cursor: 'pointer' }} onClick={() => NotesActions.deleteNotePay(n.id)}>del</td>
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
                            <th></th>
                        </tr>
                        {this.props.notes && this.props.notes.map((n, i) =>
                            <tr style={n.check ? { background: 'yellow' } : {}} key={i}>
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
                                <td style={{ backgroundColor: 'pink', cursor: 'pointer' }} onClick={() => this.handleNoteCheck(n)}>check</td>
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
                    trigger={() => <a href="#/admin">Print to pdf</a>}
                    content={() => this.componentRef}
                />
                <NotesTable ref={el => (this.componentRef = el)}
                    notes={this.props.notes} pay={this.props.pay} />
            </div>
        );
    }
}

export default AdminPanel;
