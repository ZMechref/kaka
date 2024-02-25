import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore/lite";
import { initializeApp } from "firebase/app";
import { CONFIG } from "./configFb";
import React, { useState, useEffect } from 'react';


const app = initializeApp(CONFIG.firebaseConfig);
const db = getFirestore(app);

export const setJob = async (data) => {
  return new Promise(async (resolve, reject) => {
    const docRef = await addDoc(collection(db, "Jobs"), data).catch((e) => {});
    resolve(docRef.id);
   });
};

export const setTech = async (data) => {
  return new Promise(async (resolve, reject) => {
    const techRef = await addDoc(collection(db, "tech-list"), data)
      .then((docTech) => {})
      .catch((e) => {});
    resolve(techRef.id);
  });
};

export const settechlist = async (techlist) => {
  return new Promise(async (resolve, reject) => {
    const docRef = await addDoc(collection(db, "tech-list"), techlist).catch(
      (e) => {}
    );
    resolve(docRef.id);
  });
};

export const updateAssignedTo = async (id, data) => {
  return new Promise(async (resolve, reject) => {
     const docRef = doc(db, "Jobs", id);
    await updateDoc(docRef, {
      assignedTo: data.assignedTo,
    });
    resolve(docRef.id);
  });
};

export const updateDispatcher = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    const docRef = doc(db, "Jobs", id);
    await updateDoc(docRef, {
      dispatcher: data.assignedTo.uid,
    });
    resolve(docRef.id);
  });
};

export const updateManager = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    const docRef = doc(db, "Jobs", id);
    await updateDoc(docRef, {
      manager: data,
    });
    resolve(docRef.id);
  });
};

export const AssignedTo = async (id, data) => {
  return new Promise(async (resolve, reject) => {
   const docRef = doc(db, "Jobs", id);
    await getDocs(docRef, {
      assignedTo: data.assignedTo,
    });
    resolve(docRef.id);
  });
};
export const setJobStatus = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    const docRef = doc(db, "Jobs", id);
    await updateDoc(docRef, {
      status: data,
    });
    resolve(docRef.id);
  });
};
export const updateChanges = async (id, data) => {
  return new Promise(async (resolve, reject) => {
 
    const docRef = doc(db, "Jobs", id);
    await updateDoc(docRef, {

      woNum: data.woNum,
      joblocation: data.joblocation,
      jobZip: data.jobZip,
      jobState: data.jobState,
      estimNeeded: data.estimNeeded,
      jobStatus: data.jobStatus,
      contact: data.contact,
      trade: data.trade,
      nte: data.nte,
      ivrcode: data.ivrcode,
      poNumb: data.poNumb,
      clientName: data.clientName,
      submdate: data.submdate,
      neededdate: data.neededdate,
      urgency: data.urgency,
      callerName: data.callerName,
      callerNumber: data.callerNumber,
      jobdescr: data.jobdescr,
      status: data.status,
      dispId: data.uid,
      estimTechId: data.estimTechId,
      jobDoneTechId:  data.jobDoneTechId,
    });
    resolve(docRef.id);
  });
};


export const findWoByNumber = (woId, userId) => {
  return new Promise(async (resolve, reject) => {
    let filteredJobsList = [];
  
    const q = await query(
      collection(db, "Jobs"),
      where("woNum", "==", woId),
      where("dispatcher", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const Job = {
        id: doc.id,
        data: doc.data(),
      };
      filteredJobsList.push(Job);
    });
    resolve(filteredJobsList);
    reject((e) => {
    });
  });
};

export const findTechByZip = (techZip, userId) => {
  return new Promise(async (resolve, reject) => {
    let filteredTechList = [];
  
    const b = await query(
      collection(db, "tech-list"),
      where("techZip", "==", techZip),
      where("dispatcher", "==", userId)
    );
    const querySnapshot = await getDocs(b);
    querySnapshot.forEach((doc) => {
      const tech = {
        id: doc.id,
        data: doc.data(),
      };
      filteredTechList.push(tech);
    });
    resolve(filteredTechList);
    reject((e) => {
    });
  });
};

export const findWoForAdmin = (userId) => {
  return new Promise(async (resolve, reject) => {
    let filteredJobsList = [];
    const q = await query(
      collection(db, "Jobs"),
      where("Admin", "===", userId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const Job = {
        id: doc.id,
        data: doc.data(),
      };
      filteredJobsList.push(Job);
    });
    resolve(filteredJobsList);
    reject((e) => {
    });
  });
};

// export const findTechByUser = (Addedby) => {
//   return new Promise(async (resolve, reject) => {
//     let filteredTech = [];
//     const q = await query(
//       collection(db, "tech-list"),
//       where("addedBy", "==", userId)
//     );
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       const Job = {
//         id: doc.id,
//         data: doc.data(),
//       };
//       filteredTech.push(Job);
//     });
//     resolve(filteredTech);
//     reject((e) => {
//     });
//   });
// };

export const findTechByUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let filteredTechList = [];
    const b = await query(
      collection(db, "tech-list"),
      where("Addedby", "==", userId)
    );
    const querySnapshot = await getDocs(b);
    querySnapshot.forEach((doc) => {
      const tech = {
        id: doc.id,
        data: doc.data(),
      };
      filteredTechList.push(tech);
    });
    resolve(filteredTechList);
    reject((e) => {
    });
  });
};

export const findWoForCurrentUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let filteredJobsList = [];
    const q = await query(
      collection(db, "Jobs"),
      where("dispatcher", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const Job = {
        id: doc.id,
        data: doc.data(),
      };
      filteredJobsList.push(Job);
    });
    resolve(filteredJobsList);
    reject((e) => {
    });
  });
};

export const updateDispatcherData = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    const docRef = doc(db, "Jobs", id);
    await updateDoc(docRef, {
      dispatcherData: data,
    });
    resolve(docRef.id);
  });
};
///// Jobs /////////////
export const dispDoc = async (id, data) => {
  return new Promise(async (resolve, reject) => {
   
    const docRef = doc(db, "Jobs", id);
    await dispDoc(docRef, {
      estimTechName: data.estimTechName,
      estimTechCon: data.estimTechCon,
      estimCost: data.estimCost,
      estimPaidby: data.estimPaidby,
      estimPaymentAdress: data.estimPaymentAdress,
      estimTechproffesion: data.estimTechproffesion,
      estimscheduleddate: data.estimscheduleddate,
      estimscheduledtimee: data.estimscheduledtimee,

      jobDoneTechName: data.jobDoneTechName,
      jobDoneTechCon: data.jobDoneTechCon,
      jobdonescheduledate: data.jobdonescheduledate,
      jobdonescheduledtime: data.jobdonescheduledtime,
      jobDoneCost: data.jobDoneCost,
      jobDonePaidby: data.jobDonePaidby,
      jobDonePaymentAdress: data.jobDonePaymentAdress,
      jobDoneHours: data.jobDoneHours,
      jobDoneTechDescription: data.jobDoneTechDescription,
      jobdoneTechproffesion: data.jobdoneTechproffesion,
      suppliyer: data.suppliyer,
      otherSuppliyer: data.otherSuppliyer,
      material: data.material,

      jobType: data.jobType,
      dispId: data.uid,
    });
    resolve(docRef.id);
  });
};

export const techDoc = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    const techRef = doc(db, "techlist", id);
    await techDoc(techRef, {
      freeEstimation: this.state.freeEstimation,
      techName: this.state.TechName,
      techCon: this.state.techCon,
      estimCost: this.state.estimCost,
      paidby: this.state.paidby,
      techZip: this.state.techZip,
      techState: this.state.techState,
      techCoverage: this.state.techCoverage,
      techNote: this.state.techNote,
      techTrade: this.state.techTrade,
      techUrgency: this.state.techUrgency,
    });
    resolve(techRef.id);
  });
};

export const handleDeleteJob = async (id) => {
  try {
    console.log("item deleted", id);
    await deleteDoc(doc(db, "Jobs", id));
    console.log("item successfully deleted");
  } catch (error) {
    console.error("Error deleting document:", error);
  }
};

export const getJobs = async () => {
  let JobsList = [];
  const q = query(collection(db, "Jobs"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const Job = {
      id: doc.id,
      data: doc.data(),
    };
    JobsList.push(Job);
  });
  return JobsList;
};

export const getTechs = async () => {
  let techList = [];
  const q = query(collection(db, "tech-list"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const techId = {
      id: doc.id,
      data: doc.data(),
    };
    techList.push(techId);
  });
  return techList;
};
//// Users /////

export const getUser = async (id) => {
  const docRef = doc(db, "Users", id);
  const userSnap = await getDoc(docRef);
  if (userSnap.exists()) {
    return userSnap.data();
  } else { }
};
export const getAllDispatchers = async (id) => {
  try {
    let newList = [];
    const q = query(
      collection(db, "Users"),
      where("selectedtype", "==", "Dispatcher")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      newList.push(doc.data());
    });
    return newList;
  } catch (error) {}
};
export const getAllTeamLeaders = async (id) => {
  try {
    let newList = [];
    const q = query(
      collection(db, "Users"),
      where("selectedtype", "==", "Team leader")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      newList.push(doc.data());
    });
    return newList;
  } catch (error) {}
};
export const getAllManagers = async (id) => {
  try {
    let newList = [];
    const q = query(
      collection(db, "Users"),
      where("selectedtype", "==", "Manager")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      newList.push(doc.data());
    });
    return newList;
  } catch (error) {}
};
