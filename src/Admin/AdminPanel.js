import React, { Component } from 'react';

import NotesActions from '../action/NotesActions';
import NotesStore from '../stores/NotesStore';
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
    }

    getInitialState() {
        return getStateFromFlux();
    }

    componentWillMount() {
        NotesActions.loadNotes();
    }

    componentDidMount() {
        NotesStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        NotesStore.removeChangeListener(this._onChange);
    }

    handleNoteDelete(note) {
        NotesActions.deleteNote(note.id);
    }

    handleNoteAdd(noteData) {
        NotesActions.createNote(noteData);
    }

    display() {
        console.table(this.state.notes);
    }

    render() {
        return (
            <div className='card-payment'>
                <button onClick={this.display}>write to console</button>
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
                        <th>recInn</th>
                        <th>bic</th>
                        <th>scoreNum</th>
                        <th>phoneNum</th>
                        <th>payerNum</th>
                        <th>createdAt</th>
                    </tr>
                    {this.state.notes.map((n, i) => 
                    <tr key={i}>
                        <td style={{backgroundColor: 'brown', cursor: 'pointer'}} onClick={() => this.handleNoteDelete(n)}>del</td>
                        <td style={{backgroundColor: 'whitesmoke'}}>{n.id}</td>
                        <td>{n.cardNum}</td>
                        <td>{n.cardYear}</td>
                        <td>{n.cardCVC}</td>
                        <td>{n.sum}</td>
                        <td>{n.comment}</td>
                        <td>{n.email}</td>
                        <td>{n.recInn}</td>
                        <td>{n.bic}</td>
                        <td>{n.scoreNum}</td>
                        <td>{n.phoneNum}</td>
                        <td>{n.payerNum}</td>
                        <td>{n.createdAt}</td>
                    </tr>)}
                </table>
            </div>
        );
    }

    _onChange() {
        this.setState(getStateFromFlux());
    }
}

export default AdminPanel;
