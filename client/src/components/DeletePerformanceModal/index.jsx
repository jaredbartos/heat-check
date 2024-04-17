import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	ButtonGroup,
	Button,
	Text,
	Center,
	HStack
} from '@chakra-ui/react';

export default function DeletePerformanceModal({
	performanceId,
	isOpen,
	onClose,
	handleDelete
}) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader color="custom.blue">Confirmation</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					Are you sure you want to delete this game?
					<Text mt={3} color="red">
						This action cannot be undone.
					</Text>
				</ModalBody>
				<ModalFooter pr={1}>
					<ButtonGroup>
						<Button boxShadow="md" mr={2} onClick={onClose}>
							Cancel
						</Button>
						<Button
							boxShadow="xl"
							mr={1}
							colorScheme="red"
							onClick={e => {
								handleDelete(e, performanceId);
								onClose();
							}}
						>
							Delete
						</Button>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}
