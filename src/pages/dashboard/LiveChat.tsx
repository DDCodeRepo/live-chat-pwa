import { useEffect } from "react";
import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  ChatPastHistory,
  ChatSidebar,
  ChatThread,
} from "../../components/dashboard/chat";
import gtm from "../../lib/gtm";
import { getThreads } from "../../slices/chat";
import { useDispatch } from "../../store";
import MenuIcon from "@mui/icons-material";

const LiveChat: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  useEffect(() => {
    dispatch(getThreads());
  }, []);

  return (
    <>
      {/*  */}
      <Helmet>
        <title>Dashboard: Live Chat | Material Kit Pro</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          height: "100%",
        }}
      >
        <ChatSidebar />

        <ChatThread />
        <ChatPastHistory />
      </Box>
    </>
  );
};

export default LiveChat;
