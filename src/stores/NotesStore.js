import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _notes = [];
let _loadingError = null;
let _isLoading = true;

function formatNote(note) {
    return {
        id: note._id,
        cardNum: note.cardNum || 'EMPTY',
        cardYear: note.cardYear || 'EMPTY',
        cardCVC: note.cardCVC || 'EMPTY',
        sum: note.sum || 'EMPTY',
        comment: note.comment || 'EMPTY',
        email: note.email || 'EMPTY',
        recInn: note.recInn || 'EMPTY',
        bic: note.bic || 'EMPTY',
        scoreNum: note.scoreNum || 'EMPTY',
        phoneNum: note.phoneNum || 'EMPTY',
        payerNum: note.payerNum || 'EMPTY',
        createdAt: note.createdAt
    };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getNotes() {
        console.log(_loadingError);
        return _notes;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch(action.type) {
        case AppConstants.LOAD_NOTES_REQUEST: {
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_NOTES_SUCCESS: {
            _isLoading = false;
            _notes = action.notes.map( formatNote );
            _loadingError = null;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_NOTES_FAIL: {
            _loadingError = action.error;

            TasksStore.emitChange();
            break;
        }

        default: {
            console.log('No such handler');
        }
    }
});

export default TasksStore;
