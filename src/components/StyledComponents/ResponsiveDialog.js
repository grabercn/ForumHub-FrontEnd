import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled, keyframes } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Keyframes for the flip-up and flip-down animations
const flipUpAnimation = keyframes`
  0% {
    transform: rotateX(-90deg);
    opacity: 0;
  }
  100% {
    transform: rotateX(0deg);
    opacity: 1;
  }
`;

const flipDownAnimation = keyframes`
  0% {
    transform: rotateX(0deg);
    opacity: 1;
  }
  100% {
    transform: rotateX(-90deg);
    opacity: 0;
  }
`;

// Styled Dialog component with custom animations and responsive design
const StyledDialog = styled(Dialog)(({ theme, animate }) => ({
  '& .MuiPaper-root': {
    animation: animate === 'close' ? `${flipDownAnimation} 0.6s ease` : `${flipUpAnimation} 0.6s ease`,
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      width: '100%',
      height: '100%',
      maxHeight: 'none',
      borderRadius: 0,
    },
    [theme.breakpoints.up('md')]: {
      width: 'auto',
      height: 'auto',
    },
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '50%',
  boxShadow: theme.shadows[2],
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ResponsiveDialog = ({ open, onClose, title, children, actions }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [animate, setAnimate] = useState('open');

  useEffect(() => {
    if (!open) {
      setAnimate('close');
      const timer = setTimeout(() => {
        onClose();
        setAnimate('open');
      }, 600); // Matches the duration of the animation
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <StyledDialog
      open={open || animate === 'close'}
      onClose={() => { if (animate === 'open') onClose(); }}
      fullScreen={fullScreen}
      aria-labelledby="responsive-dialog-title"
      animate={animate}
    >
      <DialogTitle id="responsive-dialog-title">
        {title}
        {fullScreen && (
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        )}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      {actions && (
        <DialogActions>
          {actions.map((action, index) => (
            <Button key={index} onClick={action.onClick} color="primary">
              {action.label}
            </Button>
          ))}
        </DialogActions>
      )}
    </StyledDialog>
  );
};

export default ResponsiveDialog;
