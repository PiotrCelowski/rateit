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
        let snippets = 0;
        let maintenance = 0;
        let understandability = 0;
        let count = 0;
        querySnapshot.forEach((doc) => {
          rating += doc.data().rating;
          snippets += doc.data().snippets;
          maintenance += doc.data().maintenance;
          understandability += doc.data().understandability;
          count++;
        });
        const averageRating = rating / count;
        const averageSnippets = snippets / count;
        const averageMaintenance = maintenance / count;
        const averageUnderstandability = understandability / count;

        return admin.firestore().collection("courses").doc(courseId).update({
          rating: averageRating,
          snippets: averageSnippets,
          maintenance: averageMaintenance,
          understandability: averageUnderstandability,
          ratingVotes: count,
        });
      });
    });
