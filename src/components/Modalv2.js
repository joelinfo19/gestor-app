import { Modal, Button } from "react-bootstrap"

export default function Modalv2({ title, children, show, setShow, saveClick, closeClick, size, footer = true }) {

	const handleClose = () => {
		setShow(false);
		closeClick()
	}
	return (
		<>
			<Modal
				size={size}
				show={show}
				onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{children}
				</Modal.Body>
				{
					footer
						?
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
						: null
				}
			</Modal>
		</>
	)
}