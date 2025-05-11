import Modal from "@/components/Modal";
import Notes from "@/components/home/apps/Notes";
import SupportChat from "@/components/support/SupportChat";

export default function Modals() {
    return (
        <>
            <Modal id="CHATBOT_MODAL" title="Support Chat">
                <SupportChat />
            </Modal>
            <Modal id="NOTES_APP_MODAL" title="Notes">
                <Notes />
            </Modal>
        </>
    );
}