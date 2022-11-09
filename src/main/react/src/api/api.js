/*global IS_DEMO*/
/* global token */

export const GetCourseInfo = async () => {
  if (IS_DEMO) {
    return [
        {
            'subject': 'Example Course',
            'courseNumber': 'EC-1000',
            'courseCredits': 4,
            'numericGrade': 'A',
        },
        {
            'subject': 'Example Course 2',
            'courseNumber': 'EC-1001',
            'courseCredits': 0,
            'numericGrade': '3.7',
        },
        {
            'subject': 'Example Course 3',
            'courseNumber': 'EC-1002',
            'courseCredits': 4,
            'numericGrade': 'C',
        },
        {
            'subject': 'Example Course 4',
            'courseNumber': 'EC-1003',
            'courseCredits': 4,
            'numericGrade': 'G',
        }
    ]
  }

  try {
    const response = await fetch(
      '/gpa-calculator/api/courses',
      {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        method: 'GET',
      }
    )
    return await response.json()
  } catch (err) {
    return err
  }
}
