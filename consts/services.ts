import {
    NotepadText,
    BookUser,
    Calendar,
    Phone
} from 'lucide-react';

const services = [
    {
        id: 'CONTACTS_APP_MODAL',
        name: 'Contacts',
        icon: BookUser,
    },
    {
        id: 'NOTES_APP_MODAL',
        name: 'Notes',
        icon: NotepadText,
    },
    {
        id: 'CALENDAR_APP_MODAL',
        name: 'Calendar',
        icon: Calendar,
    },
    {
        id: 'CALLS_APP_MODAL',
        name: 'Calls',
        icon: Phone,
    },
]
export default services;