import { Input, Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap"

export default ({
    openModal, toggle, setPermission, linkToShare,
    generate, closeGenerateLinkModal
}) => {
    return (
        <Modal isOpen={openModal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Generate link access</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Permissions:</label>
                        <br/>
                        <select className="form-control" 
                            onChange={(event) => setPermission(event.target.value)} >
                            <option value="">Select permission</option>
                            <option value="viewer">Viewer</option>
                            <option value="editor">editor</option>
                        </select>
                    </div>
                    { linkToShare && 
                        <div className="form-group">
                            <label>Copy link below  to share:</label>
                            <br/>
                            <Input value={linkToShare}/>
                        </div>
                    }
                    
                    <br/>
                    <Button onClick={generate}>Generate</Button>
                </ModalBody>
                <ModalFooter>
                <Button color="secondary" onClick={closeGenerateLinkModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
    )
}