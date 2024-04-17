import { tableAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
	createMultiStyleConfigHelpers(tableAnatomy.keys);

const baseStyle = definePartsStyle({
	tbody: {
		bgColor: 'white'
	}
});

export const tableTheme = defineMultiStyleConfig({ baseStyle });
