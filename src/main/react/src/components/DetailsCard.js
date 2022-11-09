import React, { useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 15,
  },
  expand: {
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  table: {
    border: '1px solid black',
    borderCollapse: 'collapse',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 17
  },
  tableHeader: {
    padding: 6,
    textAlign: 'left'
  },
  tableRows: {
    border: '1px solid black',
    borderCollapse: 'collapse',
    padding: 7
  },
  disclaimer: {
    textAlign: 'left',
    color: 'black',
    marginBottom: 20,
  },
  list: {
    textAlign: 'left',
    color: 'black',
  },
  instructions: {
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'transparent',
    "&:hover": {
      backgroundColor: 'transparent'
    }
  },
  links: {
    color: 'blue',
    "&:hover": {
      color: 'red'
    },
  },
  cardHeader: {
    fontSize: 45,
    marginBottom: 3
  },
}));

export default function DetailsCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const buttonText = expanded ? 'Collapse' : 'Expand';

  return (
    <Card className={classes.root}>
      <CardContent>
      <table className={classes.table}>
              <tr className={classes.tableRows}>
                <th className={classes.tableHeader}>Letter Grade: </th>
                <td className={classes.tableRows}>A</td>
                <td className={classes.tableRows}>A-</td>
                <td className={classes.tableRows}>B+</td>
                <td className={classes.tableRows}>B</td>
                <td className={classes.tableRows}>B-</td>
                <td className={classes.tableRows}>C+</td>
                <td className={classes.tableRows}>C</td>
                <td className={classes.tableRows}>C-</td>
                <td className={classes.tableRows}>D+</td>
                <td className={classes.tableRows}>D</td>
                <td className={classes.tableRows}>F</td>
              </tr>
              <tr>
                <th className={classes.tableHeader}>Honor Points: </th>
                <td className={classes.tableRows}>4.0</td>
                <td className={classes.tableRows}>3.7</td>
                <td className={classes.tableRows}>3.3</td>
                <td className={classes.tableRows}>3.0</td>
                <td className={classes.tableRows}>2.7</td>
                <td className={classes.tableRows}>2.3</td>
                <td className={classes.tableRows}>2.0</td>
                <td className={classes.tableRows}>1.7</td>
                <td className={classes.tableRows}>1.3</td>
                <td className={classes.tableRows}>1.0</td>
                <td className={classes.tableRows}>0.0</td>
              </tr>
            </table>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography className={classes.disclaimer} variant="body1" component="p">
            This GPA calculator should only be used as a resource to help you understand how grade point averages are calculated, 
            the results are not official. Official GPA calculations are completed by OU's Office of the Registrar 
            and can be found in your <a className={classes.links} target="_blank" rel="noopener noreferrer" href ="https://sail.oakland.edu/PROD/bwskogrd.P_ViewTermGrde">SAIL account</a>.
          </Typography>
          
          <Typography className={classes.disclaimer} variant="body1" component="p">
          All grades appear on student transcripts. However, only numerical grades are used to determine the grade point average, 
            which is rounded to two decimal places. To learn more about the grading scale, 
            please <a className={classes.links} target="_blank" rel="noopener noreferrer" href="https://docs.google.com/document/d/182ghMFyrH7qpZ5FcJ7KrMZ0AOc6uda6ytRak-KrxXdM/view">check the FAQ</a>.
          </Typography>
          
          <Typography className={classes.instructions} variant="body1" color="textSecondary" component="p">
            To use the GPA Calculator:
          </Typography>
          <Typography className={classes.list} variant="body1" component="p">
            <ul>
              <li>The optional row at the top can be used to input your current GPA, by inputting current GPA Hours in the credits column and current GPA in the grade column; 
                  these can be found by clicking on "View Transcript" in MySAIL, then find the totals at the bottom. Ensure that you enter GPA Hours in the credit column, not total credits.</li>
              <li>Use the 'Add Course' button in the top right of the table to add a course.</li>
              <li>In the 'Grade' column, you can enter either a numeric (0.0-4.0) grade or a letter (A-F) grade.</li>
              <li>You can edit or delete a course using the buttons in the Actions column.</li>
              <li>If you wish to calculate GPA with a repeated course, you must enter all courses completed individually as a separate line, and enter the projected new grade for the repeated course.</li>
              <li>If you are calculating a projected GPA using S/U grades, these courses do not count towards GPA credit hours; leave these courses out of your calculation. 
                  If these courses were in previous semesters, they will not be included in the GPA Hours total found under "View Transcript" in MySAIL.</li>
              <li>If the page is refreshed, the table will reset.</li>
            </ul>
          </Typography>
        </CardContent>
      </Collapse>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, 
          {expanded}
          )}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Button disableRipple className={classes.button} size="medium" color="secondary">
            {buttonText}
         </Button>
        </IconButton>
      </CardActions>
    </Card>
  );
}