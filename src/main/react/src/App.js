import React, { Component } from 'react'
import CoursesTable from './components/CoursesTable'
import DetailsCard from './components/DetailsCard';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  app: {
    textAlign: 'center',
  },
})

class App extends Component {
  state = {
    courses: [
      {
        courseId: 1,
        subject: "Total of all semesters (optional)",
        courseNumber: "N/A",
        courseCredits: '0',
        numericGrade: '0'
      },
    ],
    invalidCourses: []
  }

  render() {
    const { classes } = this.props

    return (
        <div className={classes.app}>
            <DetailsCard />
            <CoursesTable courses={this.state.courses} invalidCourses={this.state.invalidCourses}/>
        </div>
    )
  }
}
export default withStyles(styles)(App)
