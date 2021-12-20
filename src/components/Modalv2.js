import { Modal, Button } from "react-bootstrap"

export default function Modalv2({ title, children, show, setShow, saveClick }) {

	const handleClose = () => setShow(false);
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{children}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={() => {
						handleClose()
						saveClick()
					}
					}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}