import * as React from "react";
import Stack from "@mui/material/Stack";
import ForumCard from "./ForumCard";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ForumDetail from "./ForumDetail";

/**
 * Renders a list of forums with clickable cards that display forum details in a dialog.
 *
 * @param {Object[]} forums - An array of forum objects.
 * @param {Function} onForumClick - A callback function to handle forum card click events.
 * @returns {JSX.Element} The rendered component.
 */
const ForumList = ({ forums, onForumClick }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedForum, setSelectedForum] = React.useState(null);

  /**
   * Handles the opening of the dialog and sets the selected forum.
   *
   * @param {Object} forum - The selected forum object.
   */
  const handleOpen = (forum) => {
    setSelectedForum(forum);
    setOpen(true);
  };

  /**
   * Handles the closing of the dialog.
   */
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
        <Dialog
          open={open}
          onClose={handleClose}
          slotProps={{ backdrop: { style: { backdropFilter: "blur(10px)" } } }}
        >
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
