const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

exports.updateRating = functions.firestore.document("ratings/{ratingId}")
    .onWrite((change, context) => {
      const courseId = change.after.data().courseId;
      const ratingsRef = admin.firestore()
          .collection("ratings")
          .where("courseId", "==", courseId);

      return ratingsRef.get().then((querySnapshot) => {
        let rating = 0;
        let codeSnippetsWorking = 0;
        let easilyExplained = 0;
        let keptUpToDate = 0;
        let topicCoverage = 0;
        let organization = 0;
        let count = 0;
        querySnapshot.forEach((doc) => {
          rating += doc.data().rating;
          codeSnippetsWorking += doc.data().codeSnippetsWorking;
          easilyExplained += doc.data().easilyExplained;
          keptUpToDate += doc.data().keptUpToDate;
          topicCoverage += doc.data().topicCoverage;
          organization += doc.data().organization;
          count++;
        });
        const averageRating = rating / count;
        const averageCodeSnippetsWorking = codeSnippetsWorking / count;
        const averageEasilyExplained = easilyExplained / count;
        const averagekeptUpToDate = keptUpToDate / count;
        const averageTopicCoverage = topicCoverage / count;
        const averageOrganization = organization / count;

        return admin.firestore().collection("courses").doc(courseId).update({
          rating: averageRating,
          codeSnippetsWorking: averageCodeSnippetsWorking,
          easilyExplained: averageEasilyExplained,
          keptUpToDate: averagekeptUpToDate,
          topicCoverage: averageTopicCoverage,
          organization: averageOrganization,
          ratingVotes: count,
        });
      });
    });