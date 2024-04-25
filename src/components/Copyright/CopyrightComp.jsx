import { Link, Typography } from '@mui/material';
import React from 'react'

const CopyrightComp = (props) => {
        return (
          <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://eventcrafters.com">
              Event Crafters
            </Link>{' '}
            2024
            {'.'}
          </Typography>
        );
}

export default CopyrightComp;