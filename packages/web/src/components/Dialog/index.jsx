import { Dialog as MDialog, DialogContent } from "@material-ui/core";

function Dialog({ isOpen, setIsOpen, children }) {
  return (
    <MDialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="xs">
      <DialogContent>{children}</DialogContent>
    </MDialog>
  );
}

export default Dialog;
