import { useRef, useState } from "react";
import type { FC } from "react";
import PropTypes from "prop-types";
import InfoIcon from "@mui/icons-material/Info";
import {
  Avatar,
  AvatarGroup,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  Select,
  FormGroup,
  FormControlLabel,
  Checkbox,
  DialogContentText,
  TextField,
  DialogActions,
} from "@material-ui/core";
import { experimentalStyled } from "@material-ui/core/styles";
import ArchiveIcon from "../../../icons/Archive";
import BellIcon from "../../../icons/Bell";
import BanIcon from "../../../icons/Ban";
import CameraIcon from "../../../icons/Camera";
import PhoneIcon from "../../../icons/Phone";
import DotsHorizontalIcon from "../../../icons/DotsHorizontal";
import TrashIcon from "../../../icons/Trash";
import type { Participant } from "../../../types/chat";

interface ChatThreadToolbarProps {
  participants: Participant[];
}

const ParticipantAvatar = experimentalStyled((props) => <Avatar {...props} />)(
  ({ styleProps }) => {
    if (styleProps.small) {
      return {
        height: 30,
        width: 30,
        "&:nth-of-type(2)": {
          mt: "10px",
        },
      };
    }
    return {};
  }
);

const ChatThreadToolbar: FC<ChatThreadToolbarProps> = (props) => {
  const { participants, ...other } = props;
  const moreRef = useRef<HTMLButtonElement | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  // We hardcode the current user ID because the mocked that is not in sync with the auth provider.
  // When implementing this app with a real database, replace this ID with the ID from Auth Context.
  const otherParticipants = participants.filter(
    (participant) => participant.id !== "5e86809283e28b96d2d38537"
  );
  const displayNames = otherParticipants
    .reduce((names, participant) => [...names, participant.name], [])
    .join(", ");

  const handleMenuOpen = (): void => {
    setOpenMenu(true);
  };

  const handleMenuClose = (): void => {
    setOpenMenu(false);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [age, setAge] = useState();
  return (
    <Box
      sx={{
        alignItems: "center",
        backgroundColor: "background.paper",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        display: "flex",
        flexShrink: 0,
        minHeight: 64,
        px: 2,
        py: 1,
      }}
      {...other}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          "& .MuiAvatar-root": otherParticipants.length > 1 && {
            height: 30,
            width: 30,
            "&:nth-of-type(2)": {
              mt: "10px",
            },
          },
        }}
      >
        <AvatarGroup max={2}>
          {otherParticipants.map((participant) => (
            <ParticipantAvatar
              key={participant.id}
              src={participant.avatar}
              styleProps={{ small: otherParticipants.length > 1 }}
            />
          ))}
        </AvatarGroup>
        <Typography color="textPrimary" sx={{ ml: 2 }} variant="subtitle2">
          {displayNames}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      {/* TRANSFER BUTTON */}
      <Button
        variant="outlined"
        color="inherit"
        onClick={handleClickOpen}
        sx={{ mr: 1 }}
      >
        Transfer Chat
      </Button>

      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Transfer Chat"}</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Typography style={{ fontWeight: 700 }}>
                Select Transfer Department
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Department
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  //   onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Typography style={{ fontWeight: 700 }}>
                Select Transfer Agent
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Department
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  //   onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox color="primary" defaultChecked />}
                label="Share Chat with transfer agent."
              />
            </FormGroup>
            <DialogContentText>
              Once checked this chat between you and the customer will be shared
              with the transfer agent of other department. This will help other
              agents to understand what is issue customer facing.
            </DialogContentText>
          </Grid>
          <Grid>
            <Typography style={{ fontWeight: 700 }}>
              Private Message
              <IconButton>
                <InfoIcon color="primary" />
              </IconButton>
            </Typography>

            <TextField
              id="outlined-multiline-static"
              //   label="Message"
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Transfer Dept
          </Button>
        </DialogActions>
      </Dialog>
      <Button variant="contained" color="inherit" onClick={handleClickOpen}>
        Resolve
      </Button>
      {/* 
      <IconButton>
        <PhoneIcon fontSize="small" />
      </IconButton>
      <IconButton>
        <CameraIcon fontSize="small" />
      </IconButton>
      <Tooltip title="More options">
        <IconButton onClick={handleMenuOpen} ref={moreRef}>
          <DotsHorizontalIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={moreRef.current}
        keepMounted
        elevation={1}
        onClose={handleMenuClose}
        open={openMenu}
      >
        <MenuItem>
          <ListItemIcon>
            <BanIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Block contact" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <TrashIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete thread" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ArchiveIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Archive thread" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <BellIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Mute notifications" />
        </MenuItem>
      </Menu> */}
    </Box>
  );
};

ChatThreadToolbar.propTypes = {
  participants: PropTypes.array,
};

ChatThreadToolbar.defaultProps = {
  participants: [],
};

export default ChatThreadToolbar;
