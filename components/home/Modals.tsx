import Modal from "@/components/Modal";
import Notes from "@/components/home/apps/Notes";
import Calendar from "@/components/home/apps/Calendar";
import SupportChat from "@/components/support/SupportChat";
import Contacts from "@/components/home/apps/Contacts";

export default function Modals() {
    return (
        <>
            <Modal id="CHATBOT_MODAL" title="Support Chat">
                <SupportChat />
            </Modal>
            <Modal id="NOTES_APP_MODAL" title="Notes">
                <Notes />
            </Modal>
            <Modal id="CALENDAR_APP_MODAL" title="Calendar">
                <Calendar />
            </Modal>
            <Modal id="CONTACTS_APP_MODAL" title="Contacts">
                <Contacts />
            </Modal>
        </>
    );
}