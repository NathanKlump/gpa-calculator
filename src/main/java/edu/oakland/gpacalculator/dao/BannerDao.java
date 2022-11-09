package edu.oakland.gpacalculator.dao;

import edu.oakland.gpacalculator.model.CoursesInfo;
import edu.oakland.gpacalculator.dao.Constants;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository
public class BannerDao {
    
    @Autowired private JdbcTemplate jdbcTemplate;

    public List<CoursesInfo> getCoursesInfo(String pidm) throws DataAccessException {
        return jdbcTemplate.query(Constants.GET_COURSES_INFO, CoursesInfo.mapper, pidm);
    }
}

