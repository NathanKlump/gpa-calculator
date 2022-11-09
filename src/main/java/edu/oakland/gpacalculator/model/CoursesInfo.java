package edu.oakland.gpacalculator.model;

import lombok.Data;
import org.springframework.jdbc.core.RowMapper;

@Data
public class CoursesInfo {

  private String termCode;
  private String subject;
  private String courseNumber;
  private int courseCredits;
  private String numericGrade;
  

  public static RowMapper<CoursesInfo> mapper =
    (rs, rowNum) -> {
      CoursesInfo coursesInfo = new CoursesInfo();
        coursesInfo.setTermCode(rs.getString("term_code"));
        coursesInfo.setSubject(rs.getString("course_title"));
        coursesInfo.setCourseNumber(rs.getString("subject_code") + "-" + rs.getInt("course_number"));
        coursesInfo.setCourseCredits(rs.getInt("crs_credits"));
        coursesInfo.setNumericGrade(rs.getString("grade"));
      return coursesInfo;
    };
}
