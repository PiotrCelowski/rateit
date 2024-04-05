import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { CourseForm } from "../components/CourseForm/CourseForm";
import { useSelector } from "react-redux";
import { fetchCourse } from "../api/FirestoreApi";
// import PendingCourseEditForm from "../components/PendingCourseEditForm/PendingCourseEditForm"

const EditCoursePage = () => {
    const currentCourseId = useSelector((state) => state.courseDetails.currentCourseId)
    const [loading, setLoading] = useState(true)
    const [currentCourse, setCurrentCourse] = useState(false);

    const fetchCurrentCourse = useCallback(async () => {
    if (currentCourseId) {
      const response = await fetchCourse(currentCourseId);
      if (response.exists()) {
        setCurrentCourse((oldState) => {
          return {
            id: response.data().id,
            title: response.data().title,
            author: response.data().author,
            technologies: response.data()?.technologies || [],
            features: response.data()?.features || [],
            description: response.data()?.description || '',
            type: response.data().type,
            level: response.data().level,
            photoUrl: response.data()?.photoUrl || ''
          };
        });
      }
    //   if (!response.exists()) {
    //     setNoCourse(true)
    //   }
    }
        setLoading(false);
    }, [currentCourseId]);

    useEffect(() => {
        fetchCurrentCourse()
    }, [fetchCurrentCourse])

    return (
        <Box px={{ xs: 2.5, md: 3 }} py={3} minHeight={"1250px"}>
            {/* <PendingCourseEditForm /> */}
            {!loading && <CourseForm adminEdit currentCourseData={currentCourse} />}
        </Box>
    )
}

export default EditCoursePage;
