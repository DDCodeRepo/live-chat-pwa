import { FC, useState } from "react";
import { useEffect } from "react";
import { Button, Container, Grid } from "@material-ui/core";
import { useNavigate } from "react-router";
import { storeUser } from "src/slices/user";

import { useAppDispatch } from "src/store/hooks";

const Employee: FC = () => {
  const navigate = useNavigate();
  const appDispatch = useAppDispatch()

  useEffect(() => {});

  function handleClick(emp: string) {
    navigate(`/welcome/${emp}`);
    appDispatch(storeUser(emp));
  }

  return (
    <>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          gap: "150px"
        }}
      >
        <Button
          sx={{
            alignItems: "center",
            height: "100px",
            width: "100px",
          }}
          variant="contained"
          onClick={() => handleClick("TeamLead")}
        >
          Team Lead
        </Button>
        <Button
          sx={{
            alignItems: "center",
            height: "100px",
            width: "100px",
          }}
          variant="contained"
          onClick={() => handleClick("Agent")}
        >
          Agent
        </Button>
        <Button
          sx={{
            alignItems: "center",
            height: "100px",
            width: "100px",
          }}
          variant="contained"
          onClick={() => handleClick("Supervisor")}
        >
          Supervisor
        </Button>
      </Container>
    </>
  );
};

export default Employee;
