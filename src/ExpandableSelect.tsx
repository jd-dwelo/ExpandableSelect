import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { InstallLocations, InstallLocationsByType } from "./types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    hidden: {
      display: "none"
    }
  })
);

type Props = {
  installLocations: InstallLocationsByType;
};

export default function ExpandableSelect(props: Props) {
  const classes = useStyles();
  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [showMore, setShowMore] = React.useState(false);
  const [showEvenMore, setShowEvenMore] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    event.preventDefault();
    const value = event.target.value;
    if (value === "more-level-1") {
      setShowMore(true);
    } else if (value === "more-level-2") {
      setShowEvenMore(true);
    } else {
      setAge(value as string);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const makeItemsSublist = (
    locations: InstallLocations,
    moreValue: string | undefined
  ) => {
    const items = [];
    locations.forEach((location) => {
      if (moreValue) {
        let className;

        if (moreValue === "more-level-1") {
          className = ""
        } else if (moreValue === "more-level-2") {
          className = showMore ? "" classes.hidden : ""
        }
      }
      items.push(<MenuItem value={location}>{location}</MenuItem>);
    });
    if (moreValue) {
      items.push(
        <MenuItem
          value={moreValue}
          onClick={handleOpen}
          className={showMore ? classes.hidden : ""}
        >
          More...
        </MenuItem>
      );
    }
    return items;
  };

  const makeMenuItems = () => {
    const items: any[][] = [];

    const {
      unit: unitLocations,
      community: communityLocations,
      all: allLocations
    } = props.installLocations;

    const locationsArraysInOrder = [
      unitLocations,
      communityLocations,
      allLocations
    ];

    locationsArraysInOrder.forEach((locations, index) => {
      if (locations && locations.length > 0) {
        const moreValue =
          index === 0
            ? "more-level-1"
            : index === 1
            ? "more-level-2"
            : undefined;
        items.push(makeItemsSublist(locations, moreValue));
      }
    });
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="initial-select-label">Age</InputLabel>
        <Select
          labelId="initial-select-label"
          id="initial-select"
          value={age}
          onChange={handleChange}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
          <MenuItem
            value={"more"}
            onClick={handleOpen}
            className={showMore ? classes.hidden : ""}
          >
            More...
          </MenuItem>
          <MenuItem value={40} className={showMore ? "" : classes.hidden}>
            Fourty
          </MenuItem>
          <MenuItem value={50} className={showMore ? "" : classes.hidden}>
            Fifty
          </MenuItem>
          <MenuItem value={60} className={showMore ? "" : classes.hidden}>
            Sixty
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
