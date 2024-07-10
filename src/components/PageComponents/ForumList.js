import * as React from 'react';
import Stack from '@mui/material/Stack';
import ForumCard from './ForumCard';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ForumDetail from './ForumDetail';

const ForumList = ({ forums, onForumClick }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedForum, setSelectedForum] = React.useState(null);

  const handleOpen = (forum) => {
    setSelectedForum(forum);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Stack spacing={2} direction="row">
        {forums.map((forum) => (
          <ForumCard
            key={forum.id} // Use a unique identifier as the key (assuming 'id' exists on forum)
            forum={forum}
            onClick={() => handleOpen(forum)}
          />
        ))}
      </Stack>
      {selectedForum && (
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            {/* Display the forum details as a page, pass in selectedForum */}
            <ForumDetail forum={selectedForum} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ForumList;