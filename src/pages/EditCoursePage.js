import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { CourseForm } from "../components/CourseForm/CourseForm";
import { useSelector } from "react-redux";
import { fetchCourse } from "../api/FirestoreApi";
import { useNavigate } from "react-router-dom";

const EditCoursePage = () => {
    const currentCourseId = useSelector((state) => state.courseDetails.currentCourseId)
    const [loading, setLoading] = useState(true)
    const [currentCourse, setCurrentCourse] = useState(null);
    const navigate = useNavigate()

    const fetchCurrentCourse = useCallback(async () => {
    if (currentCourseId) {
      const response = await fetchCourse(currentCourseId);
      if (response?.exists()) {
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
      if (!response?.exists()) {
        navigate('/pending', { state: { message: 'No pending course found', severity: 'error' } })
      }
    }
        setLoading(false);
    }, [currentCourseId, navigate]);

    useEffect(() => {
        fetchCurrentCourse()
    }, [fetchCurrentCourse])

    return (
        <Box px={{ xs: 2.5, md: 3 }} py={3} sx={{ flexGrow: 1 }}>
            {loading && <div>Fetching data...</div>}
            {!loading && <CourseForm adminEdit key={currentCourseId} currentCourseData={currentCourse} />}
        </Box>
    )
}

export default EditCoursePage;
