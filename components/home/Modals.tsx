import Modal from "@/components/Modal";
import Notes from "@/components/home/apps/Notes";
import Calls from "@/components/home/apps/Calls";
import Calendar from "@/components/home/apps/Calendar";
import Contacts from "@/components/home/apps/Contacts";
import SupportChat from "@/components/support/SupportChat";

export default function Modals({ role }: { role?: string }) {
    return (
        <>
            {!role && (
                <Modal id="CHATBOT_MODAL" title="Support Chat">
                    <SupportChat />
                </Modal>
            )}
            {role && (
                <>
                    <Modal id="NOTES_APP_MODAL" title="Notes">
                        <Notes />
                    </Modal>
                    <Modal id="CALENDAR_APP_MODAL" title="Calendar">
                        <Calendar />
                    </Modal>
                    <Modal id="CONTACTS_APP_MODAL" title="Contacts">
                        <Contacts />
                    </Modal>
                    <Modal id="CALLS_APP_MODAL" title="Calls">
                        <Calls />
                    </Modal>
                </>
            )}
        </>
    );
}