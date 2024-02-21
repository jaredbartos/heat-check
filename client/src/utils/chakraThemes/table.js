import { tableAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
createMultiStyleConfigHelpers(tableAnatomy.keys)

const baseStyle = definePartsStyle({
// define the part you're going to style
th: {
  // fontFamily: 'mono', // change the font family
  // color: '', // change the td text color
},
})

export const tableTheme = defineMultiStyleConfig({ baseStyle })