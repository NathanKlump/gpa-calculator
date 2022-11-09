import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    courses: {
      fontWeight: 600,
    },
}));

export default function InvalidCoursesModal({ open, invalidCourses, onClose }) {
    const classes = useStyles();

    return (
        <Dialog 
           open={open}
           onClose={onClose}>          
        <DialogTitle>Courses Not Imported</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
        These courses have been excluded from the GPA Calculator because they do not meet the requirements of an acceptable grade.  Acceptable grades include letter grades (A, B, C, D, F) and numeric grades (0.0 - 4.0).
            <ul className={classes.courses}>
              {invalidCourses.map((course) => (
                <li key={course.courseNumber}>
                  {course.subject} ({course.courseNumber})
                </li>
              ))}
            </ul>
          </DialogContentText>
        </DialogContent>
      <DialogActions><Button color='secondary'  onClick={onClose}>Close</Button></DialogActions>
      </Dialog>
      );
}

