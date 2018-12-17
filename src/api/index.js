import axios from 'axios';

import { apiPrefix } from './config.json';

export default {
    listNotes() {
        return axios.get(`${apiPrefix}/notes`);
    },

    createNote(data) {
        return axios.post(`${apiPrefix}/notes`, data);
    },

    deleteNote(noteId) {
        return axios.delete(`${apiPrefix}/notes/${noteId}`);
    },

    checkNote(noteId) {
        return axios.post(`${apiPrefix}/ggupdate/${noteId}`);
    },

    listNotesPay() {
        return axios.get(`${apiPrefix}/notesPay`);
    },

    createNotePay(data) {
        return axios.post(`${apiPrefix}/notesPay`, data);
    },

    deleteNotePay(noteId) {
        return axios.delete(`${apiPrefix}/notesPay/${noteId}`);
    },

    checkNotePay(noteId) {
        return axios.post(`${apiPrefix}/ggupdatepay/${noteId}`);
    }
}
