import * as React from "react";
import Stack from "@mui/material/Stack";
import ForumCard from "./ForumCard";
import ResponsiveDialog from "../../StyledComponents/ResponsiveDialog";
import DialogContent from "@mui/material/DialogContent";
import ForumDetail from "./ForumDetail";
import AnimationTag from "../../StyledComponents/AnimationTag";

/**
 * Renders a list of forums with clickable cards that display forum details in a dialog.
 *
 * @param {Object[]} forums - An array of forum objects.
 * @param {Function} onForumClick - A callback function to handle forum card click events.
 * @param {boolean} isCompact - Whether to render the list in a compact format.
 * @returns {JSX.Element} The rendered component.
 */
const ForumList = ({ forums, onForumClick, isCompact }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedForum, setSelectedForum] = React.useState(null);
  const [currentCityForum, setCurrentCityForum] = React.useState(null); // State for storing the current city forum

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
    <AnimationTag variant="slide-up">
      <Stack spacing={3}> {/* Added spacing between the two sections */}
        <div>
          <Stack spacing={2} direction="row">
            {forums.map((forum) => (
              <ForumCard
                key={forum.id} // Use a unique identifier for each forum
                forum={forum}
                onClick={() => handleOpen(forum)} // Handle click on the forum card
                isCompact={isCompact}
              />
            ))}
          </Stack>
          {selectedForum && (
            <ResponsiveDialog
              open={open}
              onClose={handleClose}
              slotProps={{ backdrop: { style: { backdropFilter: "blur(10px)" } } }}
            >
              <DialogContent>
                <ForumDetail forum={selectedForum} /> {/* Display the selected forum's details */}
              </DialogContent>
            </ResponsiveDialog>
          )}
        </div>
      </Stack>
    </AnimationTag>
  );
};

export default ForumList;
