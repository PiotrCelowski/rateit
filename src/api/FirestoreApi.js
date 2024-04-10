import { doc, getDoc, setDoc, getDocs, collection, query, where, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore, storage } from "../configuration/firebase/FirebaseCommon";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { chain, get, isNil } from "lodash";
import { v4 as uuidv4 } from "uuid";

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
        const courseId = get(course, 'id', uuidv4())
        const docData = {
            id: courseId,
            title: get(course, 'title', 'Title'),
            author: get(course, 'author', 'Author'),
            technologies: get(course, 'technologies', []),
            features: get(course, 'features', []),
            description: get(course, 'description', ''),
            type: get(course, 'type', ''),
            level: get(course, 'level', ''),
            approved: get(course, 'approved', false),
            photoUrl: get(course, 'photoUrl', "/static/images/no-image.jpg"),
            comments: []
        };
        await setDoc(doc(firestore, "courses", courseId), docData);
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const addRating = async (rating) => {
    try {
        const docData = chain(rating) // -- starts chaining
            .pick([
                'id',
                'courseId',
                'userId',
                'rating',
                'codeSnippetsWorking',
                'easilyExplained',
                'keptUpToDate',
                'topicCoverage',
                'organization',
                'comment',
            ]) // -- picks only the listed fields
            .omitBy(isNil) // -- checks if value is null or undefined, and if it is, removes it from the object
            .value() // -- gets the final result without fields that contain a null or undefined value

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
            organization: rating.organization,
            comment: rating.comment
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
        const courseId = get(course, 'id', null)
        // -- throws error to prevent firestore api call if there no course.id provided --
        if (!courseId) throw new Error(`Course id is required. Provided course.id is ${courseId}`)

        const updatedData = chain(course)
            .pick([
                'title',
                'author',
                'technologies',
                'features',
                'type',
                'level',
                'approved',
                'photoUrl',
                'description'
            ])
            .omitBy(isNil) // -- checks if value is null or undefined, and if it is, removes it from the object
            .value()
        const existingRating = doc(firestore, "courses", courseId)
        await updateDoc(existingRating, updatedData)
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const addNewCommentToCourse = async (commentData) => {
    try {
        const existingRating = doc(firestore, "courses", commentData.courseId)
        await updateDoc(existingRating, {
            comments: arrayUnion(commentData)
        });
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