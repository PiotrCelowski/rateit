import { doc, getDoc, setDoc, getDocs, collection, query, where, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../configuration/firebase/FirebaseCommon";
import { ref, uploadBytes } from "firebase/storage";

export const fetchCourse = async (id) => {
    try {
        const docRef = doc(firestore, "courses", id);
        return await getDoc(docRef);
    } catch (error) {
        console.error(error);
    }
}

export const addCourse = async (course) => {
    try {
        const docData = {
            id: course.id,
            title: course.title,
            author: course.author,
            release: course.release,
            technologies: course.technologies,
            type: course.type,
            level: course.level,
            approved: course.approved
        };
        await setDoc(doc(firestore, "courses", course.id), docData);
    } catch (error) {
        console.error(error);
    }
}

export const addRating = async (rating) => {
    try {
        const docData = {
            id: rating.id,
            courseId: rating.courseId,
            userId: rating.userId,
            rating: rating.rating,
            snippets: rating.snippets,
            understandability: rating.understandability,
            maintenance: rating.maintenance
        };
        await setDoc(doc(firestore, "ratings", rating.id), docData);
    } catch (error) {
        console.error(error);
    }
}

export const fetchCourseRating = async (courseId, userId) => {
    try {
        const q = query(
            collection(firestore, "ratings"),
            where("userId", "==", userId),
            where("courseId", "==", courseId));
        const querySnapshot = await getDocs(q);
        return querySnapshot;
    } catch (error) {
        console.error(error);
    }
}

export const updateRating = async (rating) => {
    try {
        const existingRating = doc(firestore, "ratings", rating.id)
        await updateDoc(existingRating, {
            courseId: rating.courseId,
            rating: rating.rating,
            snippets: rating.snippets,
            understandability: rating.understandability,
            maintenance: rating.maintenance
        })
    } catch (error) {
        console.error(error);
    }
}

export const fetchUserPermissions = async (userId) => {
    try {
        const docRef = doc(firestore, "users", userId);
        return await getDoc(docRef);
    } catch (error) {
        console.error(error);
    }
}

export const updateCourse = async (course) => {
    try {
        const existingRating = doc(firestore, "courses", course.id)
        await updateDoc(existingRating, {
            title: course.title,
            author: course.author,
            release: course.release,
            technologies: course.technologies,
            type: course.type,
            level: course.level,
            approved: course.approved
        })
    } catch (error) {
        console.error(error);
    }
}

export const uploadPhoto = async (file, courseId, title, author) => {
    const fileRef = ref(storage, courseId);

    const metadata = {
        courseId: courseId,
        title: title,
        author: author
    }

    await uploadBytes(fileRef, file, metadata);
}