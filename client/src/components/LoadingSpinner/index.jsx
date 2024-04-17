import { Spinner, Center, Box } from '@chakra-ui/react';

export default function LoadingSpinner() {
	return (
		<Box w="100%" h="100%">
			<Center w="100%" h="100%">
				<Spinner size="lg" />
			</Center>
		</Box>
	);
}
