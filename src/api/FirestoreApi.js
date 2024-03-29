import { doc, getDoc, setDoc, getDocs, collection, query, where, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../configuration/firebase/FirebaseCommon";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
            technologies: course.technologies,
            features: course.features,
            description: course.description,
            type: course.type,
            level: course.level,
            approved: course.approved,
            photoUrl: course.photoUrl
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
            codeSnippetsWorking: rating.codeSnippetsWorking,
            easilyExplained: rating.easilyExplained,
            keptUpToDate: rating.keptUpToDate,
            topicCoverage: rating.topicCoverage,
            organization: rating.organization
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
            codeSnippetsWorking: rating.codeSnippetsWorking,
            easilyExplained: rating.easilyExplained,
            keptUpToDate: rating.keptUpToDate,
            topicCoverage: rating.topicCoverage,
            organization: rating.organization
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
            technologies: course.technologies,
            type: course.type,
            level: course.level,
            approved: course.approved,
            photoUrl: course.photoUrl
        })
    } catch (error) {
        console.error(error);
    }
}

export const uploadPhoto = async (file, courseId, title, author) => {
    const fileRef = ref(storage, "courseImages/" + courseId);

    const metadata = {
        courseId: courseId,
        title: title,
        author: author
    }

    return uploadBytes(fileRef, file, metadata).then((snapshot) => {
        return getDownloadURL(snapshot.ref);
    })
}

export const uploadUserPhoto = async (file, userId) => {
    const fileRef = ref(storage, "userImages/" + userId);

    const metadata = {
        userId: userId
    }

    return uploadBytes(fileRef, file, metadata).then((snapshot) => {
        return getDownloadURL(snapshot.ref);
    })
}