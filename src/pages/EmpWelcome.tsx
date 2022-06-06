import type { FC } from "react";
import { useEffect } from "react";
import { Button, Container, Typography } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";

const EmpWelcome: FC = () => {
  const { emp } = useParams();
  const navigate = useNavigate();

  useEffect(() => {});

  function handleClick(emp: string) {
    navigate(`/home`);
  }

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          flexDirection: "column",
          gap: "60px",
        }}
      >
        <Typography variant="h1" component="h2">
          {`Welcome ${emp}`}
        </Typography>
        {/* <Button
          sx={{
            alignItems: "center",
            height: "50px",
            width: "200px",
            margin: "20px",
          }}
          variant="contained"
          onClick={() => handleClick("TeamLead")}
        > */}
          Go To Home
        </Button>
      </Container>
    </>
  );
};

export default EmpWelcome;
