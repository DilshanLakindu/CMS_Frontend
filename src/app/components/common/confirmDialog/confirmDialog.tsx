import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, IconButton, Container } from "@mui/material";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import { useTheme } from "@mui/material";
import CustomLoader from "../CustomLoader/CustomLoader";
interface ConfirmDialogProps {
  open: boolean;
  isOpen: () => void;
  title: string;
  subTitle: string;
  onConfirm: () => void;
  loading?: boolean;
}

export default function ConfirmDialog({ open, isOpen, title, subTitle, onConfirm, loading }: ConfirmDialogProps) {
  const theme = useTheme();
  return (
    <Dialog open={open} sx={{ padding: theme.spacing(6), position: "absolute", top: theme.spacing(5), borderRadius: "50px" }}>
      <Container maxWidth="lg" sx={{ padding: 2, width: "500px" }}>
        <DialogTitle sx={{ textAlign: "center" }}>
          <IconButton
            sx={{
              backgroundColor: theme.palette.error.contrastText,
              color: theme.palette.error.dark,
            }}
            size="large"
          >
            <NotListedLocationIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle2">{subTitle}</Typography>
        </DialogContent>
        {loading ? (
          <CustomLoader />
        ) : (
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={onConfirm}>Yes</Button>
            <Button variant="outlined" onClick={isOpen}>
              No
            </Button>
          </DialogActions>
        )}
      </Container>
    </Dialog>
  );
}
