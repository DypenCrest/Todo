import { Box, Divider, Grid, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useState } from "react";
import AddTodoForm from "../components/addTodoForm";
import CompletedTodos from "../components/compleTodos";
import RemainTodos from "../components/remainTodos";
import ButtonAppBar from "../components/appBar";

const HomePage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabPanel = ({ index, value, children }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );

  return (
    <div>
      <ButtonAppBar />
      <Grid
        container
        component="main"
        sx={{ height: "100dvh", width: "100dvw", mt:"4rem",}}
      >
        <Grid item xs={3}>
          <AddTodoForm />
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={8}>
          <Box sx={{ width: "100%", borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
              aria-label="full width tabs example"
              centered
            >
              <Tab label="Remaining Todos" />
              <Tab label="Completed Todos" />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <RemainTodos />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CompletedTodos />
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
