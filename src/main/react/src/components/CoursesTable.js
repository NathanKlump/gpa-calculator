import React, { useState, forwardRef } from 'react';
import MaterialTable from 'material-table'
import { makeStyles } from '@material-ui/core/styles'
import { MTableToolbar } from 'material-table'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/icons/Input'
import Add from '@material-ui/icons/Add';
import Save from '@material-ui/icons/Save';

import { GetCourseInfo } from '../api/api.js'
import InvalidCoursesModal from './InvalidCoursesModal.js'

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    color: 'white',
    position: 'static',
    fontSize: 24,
    backgroundColor: 'transparent',
    "&:hover": {
      backgroundColor: 'transparent'
    },
  },
  plusButton: {
    paddingBottom: 1.5,
  },
  box: {
    border: '3px solid black',
    margin: 'auto',
    width: 230,
    backgroundColor: '#F1EEE9',
    marginTop: 20,
    marginBottom: 20
  },
  columnStyle: {
    fontSize: 20,
    lineHeight: 1.8
  },
  header: {
    fontWeight: 'bold', 
    fontSize: 20,
    lineHeight: 1.8
  },
  addCaption: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  tooltip: {
    fontSize: 11,
  },
  importButton: {
    color: 'white',
    fontSize: 16,
  },
}))

export default function CoursesTable(props) {
  const classes = useStyles()
  const [data, setData] = useState(props.courses)
  const [invalidCourses, setInvalidCourses] = useState(props.invalidCourses)
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const numberGradeRegex = new RegExp(/^\d*\.?\d*$/)
  const letterGradeRegex = new RegExp('^[A][-]?$|^[B-C][+-]?$|^[D][+]?$|^F$')

  const columns = [
    { 
      title: 'Subject', 
      field: 'subject'
    },
    { 
      title: 'Credits', 
      field: 'courseCredits',
      validate: rowData => (rowData.courseCredits >= 0 || rowData.courseCredits == null) ? {isValid: true} : 'Must enter a positive numeric value or appropriate letter grade'
    },
    { 
      title: 'Grade', 
      field: 'numericGrade', 
      validate: rowData => (rowData.numericGrade >= 0 || rowData.numericGrade == null || numberGradeRegex.test(rowData.numericGrade) || letterGradeRegex.test(rowData.numericGrade))
      ? {isValid: true} : 'Must enter a positive numeric value or appropriate letter grade'
    },
    {
      title: 'Official Grade', 
      field: 'isOfficial',
      editable: 'never', 
    },
  ];

  const tableIcons = {
    Add: forwardRef((props, ref) => <Add {...props} className={classes.addButton} ref={ref} />),
    Check: forwardRef((props, ref) => <Save {...props} ref={ref} />),
  }

  let gradeMap = new Map([
    ['A', 4],
    ['A-', 3.7],
    ['B+', 3.3],
    ['B', 3],
    ['B-', 2.7],
    ['C+', 2.3],
    ['C', 2],
    ['C-', 1.7],
    ['D+', 1.3],
    ['D', 1],
    ['F', 0],
]);

const getGradeNumber = (grade) =>{
  if(letterGradeRegex.test(grade)){
    return (gradeMap.has(grade) ? gradeMap.get(grade) : 0)
  }
  return grade;
}

const calculateCredits = () => {
  const courses = data
  let credits = 0
  courses.forEach((c) => (
    credits += parseInt(c.courseCredits)
  ))
  if(isNaN(credits)) credits = 0
  return credits
};
  
  const calculateGpa = () => {
    const courses = data
    let honorPoints = 0
    let credits = 0
    let cumulativeGpa = 0
    courses.forEach(c => {
      credits += parseInt(c.courseCredits)
      honorPoints += parseFloat(getGradeNumber(c.numericGrade) * c.courseCredits)
      cumulativeGpa = honorPoints / credits
    })
    if(isNaN(cumulativeGpa)) cumulativeGpa = 0
    return cumulativeGpa.toFixed(2)
  };

  function getCoursesAndValidate(){
    GetCourseInfo().then((existingData) => {
      let isCompatible = []
      let notCompatible = []
      existingData.forEach(course => {
        course.isOfficial = "Yes"
      })
      existingData.forEach(course => {
        (letterGradeRegex.test(course.numericGrade) || numberGradeRegex.test(course.numericGrade))
        ? isCompatible.push(course)
        : notCompatible.push(course)
      })
      setData([...data, ...isCompatible])
      setInvalidCourses(notCompatible)
      if (notCompatible.length !== 0) {
        setOpen(true)
      }
    })
  }

  function verifyRowEdit(oldData, newData){
    if(Object.entries(oldData.courseCredits+oldData.numericGrade).sort().toString()===
       Object.entries(newData.courseCredits+newData.numericGrade).sort().toString())
        {
          return
        } newData.isOfficial = "No"
  }

  return (
    <div>
      <div className={classes.box}>
        <div className={classes.header}>
          <p>Totals:</p>
          </div>
          <div className={classes.columnStyle}>          
          <p>Total Credits: {calculateCredits()}</p>
          <p>GPA: {calculateGpa()}</p>
       </div>
    </div>
      <MaterialTable
        title="GPA Calculator"
        columns={columns}
        data={data}
        actions={[
          {
            icon: () => <Button disableRipple
            variant='filled'
            color='secondary'
            fontFamily='Arimo'
            className={classes.importButton}
            size='large'
            endIcon={<Input className={classes.importButton}/>}>
              Import Courses
            </Button>,
            tooltip: "Imports your classes from the database",
            isFreeAction: true,
            onClick: () => {
              getCoursesAndValidate()
            },
          },
        ]}
        components={{
          Toolbar: (props) => (
            <div className={classes.cardHeader}>
              <MTableToolbar {...props} />
            </div>
          ),
        }}
        options={{
          headerStyle: {
            backgroundColor: '#b89f74',
            fontWeight: 'bold',
            fontSize: 16,
          },
          rowStyle: rowData => ({
            backgroundColor: (rowData.isOfficial !== "No") ? '#a7d5ff' : '#F1EEE9'
          }),
          pageSizeOptions: [5, 6, 7, 8, 9, 10],
          search:true,
        }}
        icons = {tableIcons}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                newData.isOfficial = "No"
                setData([...data, newData]);
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
                resolve();
              }, 1000)
              verifyRowEdit(oldData, newData)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                
                resolve()
              }, 1000)
            }),
        }}
      />
       <InvalidCoursesModal
          open={open && invalidCourses.length > 0} 
          onClose={handleClose} 
          invalidCourses={invalidCourses}>
      </InvalidCoursesModal>
    </div>
  );
}