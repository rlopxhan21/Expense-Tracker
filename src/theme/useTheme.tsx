import React from 'react'

import { createTheme } from '@mui/material'

export const useTheme = () => {
    const theme = createTheme({
    })
    
    return {theme}
}
