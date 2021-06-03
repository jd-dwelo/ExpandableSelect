import { Button } from "@material-ui/core";
import React from "react";
import ExpandableSelect from "./ExpandableSelect";
import { InstallLocationsByType } from "./types";

const everything: InstallLocationsByType = {
  unit: ["Living Room", "Dining Room"],
  community: ["Hallway", "Bedroom 1", "Bedroom 2"],
  all: ["Entryway", "Master Bedroom"]
};

const withoutUnit: InstallLocationsByType = {
  community: ["Hallway", "Bedroom 1", "Bedroom 2"],
  all: ["Entryway", "Master Bedroom"]
};

const onlyAll = {
  all: ["Entryway", "Master Bedroom"]
};

export default function App() {
  return (
    <div>
      <p>Unit shown by default, then community, then all</p>
      <ExpandableSelect installLocations={everything} />
      <p>Unit names taken so community is shown by default, then all</p>
      <ExpandableSelect installLocations={withoutUnit} />
      <p>Unit and commiunity names taken so all are shown by default</p>
      <ExpandableSelect installLocations={onlyAll} />
    </div>
  );
}
