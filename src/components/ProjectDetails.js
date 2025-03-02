import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, doc, getDoc, collection, getDocs, updateDoc } from "../firebaseConfig";
import Navbar from "./NavBar"; // Import Navbar

function ProjectDetails() {
  const { userId, projectId } = useParams();
  const [project, setProject] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [sitebuilders, setSitebuilders] = useState([]);
  const [selectedSitebuilder, setSelectedSitebuilder] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      const projectDoc = doc(db, `users/${userId}/projects`, projectId);
      const projectSnap = await getDoc(projectDoc);
      if (projectSnap.exists()) {
        setProject(projectSnap.data());
      }
    };

    const fetchSitebuilders = async () => {
      const sitebuildersCollection = collection(db, "sitebuilders");
      const sitebuilderSnap = await getDocs(sitebuildersCollection);
      const sitebuildersList = sitebuilderSnap.docs.map((doc) => ({
        id: doc.id,
        email: doc.data().email,
      }));
      setSitebuilders(sitebuildersList);
    };

    fetchProject();
    fetchSitebuilders();
  }, [userId, projectId]);

  const handleSitebuilderChange = async (event) => {
    const selectedEmail = event.target.value;
    setSelectedSitebuilder(selectedEmail);

    if (selectedEmail) {
      // Update Firestore with the selected sitebuilder
      const projectRef = doc(db, `users/${userId}/projects`, projectId);
      await updateDoc(projectRef, { sitebuilder: selectedEmail });

      // Update local state
      setProject((prev) => ({ ...prev, sitebuilder: selectedEmail }));
    }
  };

  // Mapping keys to user-friendly labels
  const imageLabels = {
    selectedBathroom: "Bathroom",
    selectedDoor: "Door",
    selectedKitchen: "Kitchen",
    selectedLighting: "Lighting",
    selectedFacadeImage: "Facade",
    selectedFloorPlan: "Floor Plan",
    selectedWindow: "Window",
  };

  return (
    <>
      <Navbar /> {/* Include the Navbar */}
      <div className="container">
        <div className="project-header">
          <h1>{project?.projectName}</h1>

          {/* Sitebuilder Dropdown */}
          <div className="sitebuilder-dropdown">
            <label>Select Sitebuilder: </label>
            <select value={selectedSitebuilder || project?.sitebuilder || ""} onChange={handleSitebuilderChange}>
              <option value="">Assign Sitebuilder</option>
              {sitebuilders.map((sb) => (
                <option key={sb.id} value={sb.email}>
                  {sb.email}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p>Created At: {project?.createdAt ? new Date(project.createdAt.seconds * 1000).toLocaleString() : "N/A"}</p>
        <p>Updated At: {project?.updatedAt ? new Date(project.updatedAt.seconds * 1000).toLocaleString() : "N/A"}</p>

        {/* Image Grid */}
        <div className="images">
          {Object.keys(imageLabels).map(
            (key) =>
              project?.[key] && (
                <div className="image-container" key={key}>
                  <img src={project[key]} alt={imageLabels[key]} onClick={() => setModalImage(project[key])} />
                  <p className="image-label">{imageLabels[key]}</p>
                </div>
              )
          )}
        </div>

        {/* Image Modal */}
        {modalImage && (
          <div className="modal active" onClick={() => setModalImage(null)}>
            <span className="close-btn">&times;</span>
            <img src={modalImage} alt="Full View" />
          </div>
        )}
      </div>
    </>
  );
}

export default ProjectDetails;
