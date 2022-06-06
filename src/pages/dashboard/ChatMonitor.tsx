import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";

const ChatMonitor = () => {
  return (
    <div>
      <Grid container>
        <Grid item direction="row">
          <Card sx={{ m: 1, width: 200, height: 580 }}>
            <CardContent></CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ m: 1, ml: 0, width: 943, height: 70 }}>
            <CardContent></CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChatMonitor;
