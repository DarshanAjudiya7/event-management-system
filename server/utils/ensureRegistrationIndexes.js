const Registration = require('../models/Registration');

let registrationIndexesChecked = false;

const ensureRegistrationIndexes = async () => {
  if (registrationIndexesChecked) return;

  try {
    await Registration.createCollection().catch((error) => {
      if (error.codeName !== 'NamespaceExists') {
        throw error;
      }
    });

    const indexes = await Registration.collection.indexes();

    const legacyUserEventIndex = indexes.find((index) => index.name === 'userId_1_eventId_1');
    if (legacyUserEventIndex) {
      await Registration.collection.dropIndex('userId_1_eventId_1');
    }

    const collegeEventIndex = indexes.find((index) => index.name === 'collegeId_1_eventId_1');
    if (collegeEventIndex && !collegeEventIndex.unique) {
      await Registration.collection.dropIndex('collegeId_1_eventId_1');
    }

    const refreshedIndexes = await Registration.collection.indexes();
    const hasUniqueCollegeEventIndex = refreshedIndexes.some(
      (index) => index.name === 'collegeId_1_eventId_1' && index.unique
    );

    if (!hasUniqueCollegeEventIndex) {
      await Registration.collection.createIndex(
        { collegeId: 1, eventId: 1 },
        { unique: true }
      );
    }

    registrationIndexesChecked = true;
  } catch (error) {
    // Ignore transient index setup issues and retry on the next server start.
    registrationIndexesChecked = false;
  }
};

module.exports = ensureRegistrationIndexes;
