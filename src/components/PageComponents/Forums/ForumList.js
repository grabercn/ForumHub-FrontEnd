import * as React from "react";
import Stack from "@mui/material/Stack";
import ForumCard from "./ForumCard";
import ResponsiveDialog from "../../StyledComponents/ResponsiveDialog";
import DialogContent from "@mui/material/DialogContent";
import ForumDetail from "./ForumDetail";
import AnimationTag from "../../StyledComponents/AnimationTag";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { getCookie } from "../../Objects/userData.object";
import { isNightMode } from "../../Objects/theme";

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

  // Get the current forum from cookie or set to null if not present
  const currentForum = getCookie('user_city');

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

  // Filter the forums to separate the current forum from others
  const currentForumData = forums.find(forum => forum.forumName === currentForum);
  const otherForums = forums.filter(forum => forum.forumName !== currentForum);

  return (
    <AnimationTag variant="slide-up">
      <div>
        {/* Display the current city's forum if it exists */}
        {currentForumData && (
          <div>
            <Typography variant="h6" sx={{ mb: 2, color: isNightMode() ? 'black' : 'white' }}>
              Your Current City
            </Typography>
            <Stack spacing={2} direction="row">
              <ForumCard
                key={currentForumData.id}
                forum={currentForumData}
                onClick={() => handleOpen(currentForumData)}
                isCompact={isCompact}
              />
            </Stack>
            <Divider sx={{ mt: 2, mb: 2 }} />
          </div>
        )}

        {/* Only display the "Other Cities" header once */}
        {otherForums.length > 0 && (
          <div>
            <Typography variant="h6" sx={{ mb: 2, color: isNightMode() ? 'black' : 'white' }}>
              Other Cities:
            </Typography>
            <Stack spacing={2} direction="row">
              {otherForums.map((forum) => (
                <ForumCard
                  key={forum.id} // Use a unique identifier as the key (assuming 'id' exists on forum)
                  forum={forum}
                  onClick={() => handleOpen(forum)}
                  isCompact={isCompact}
                />
              ))}
            </Stack>
          </div>
        )}

        {selectedForum && (
          <ResponsiveDialog
            open={open}
            onClose={handleClose}
            slotProps={{ backdrop: { style: { backdropFilter: "blur(10px)" } } }}
          >
            <DialogContent>
              {/* Display the forum details as a page, pass in selectedForum */}
              <ForumDetail forum={selectedForum} />
            </DialogContent>
          </ResponsiveDialog>
        )}
      </div>
    </AnimationTag>
  );
};

export default ForumList;
