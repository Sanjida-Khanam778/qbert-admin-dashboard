import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { GrTextAlignCenter } from "react-icons/gr";
import { MdFormatAlignLeft, MdFormatAlignRight } from "react-icons/md";

export default function TextEditor() {
  const [activeTab, setActiveTab] = useState("terms");
  const [isEditing, setIsEditing] = useState(false);
  // const [termsId, setTermsId] = useState(null);
  // const [privacyId, setPrivacyId] = useState(null);
  // const {
  //   data: privacyData,
  //   isLoading: isPrivacyLoading,
  //   refetch: refetchPrivacy,
  // } = useGetPrivacyPolicyQuery();
  // const {
  //   data: termsData,
  //   isLoading: isTermsLoading,
  //   refetch: refetchTerms,
  // } = useGetTermsQuery();
  // const [updatePrivacyPolicy, { isLoading: isUpdatingPrivacy }] =
  //   useUpdatePrivacyPolicyMutation();
  // const [createTerms, { isLoading: isCreatingTerms }] =
  //   useCreateTermsMutation();
  // const [updateTerms, { isLoading: isUpdatingTerms }] =
  //   useUpdateTermsMutation();
  // const refetchTimeout = useRef();

  // Set privacyId from API
  // useEffect(() => {
  //   if (privacyData && privacyData.results && privacyData.results.length > 0) {
  //     setPrivacyId(privacyData.results[0].id);
  //   }
  // }, [privacyData]);

  // Set termsId from API
  // useEffect(() => {
  //   if (termsData && termsData.results && termsData.results.length > 0) {
  //     setTermsId(termsData.results[0].id);
  //   }
  // }, [termsData]);

  // Always sync the editor DOM with API data when tab is active
  // useEffect(() => {
  //   const contentEditable = document.getElementById("editor-content");
  //   if (
  //     activeTab === "privacy" &&
  //     privacyData &&
  //     privacyData.results &&
  //     privacyData.results.length > 0
  //   ) {
  //     const apiValue = privacyData.results[0].text || "";
  //     if (contentEditable && apiValue !== contentEditable.innerHTML) {
  //       contentEditable.innerHTML = apiValue;
  //     }
  //   } else if (
  //     activeTab === "terms" &&
  //     termsData &&
  //     termsData.results &&
  //     termsData.results.length > 0
  //   ) {
  //     const apiValue = termsData.results[0].text || "";
  //     if (contentEditable && apiValue !== contentEditable.innerHTML) {
  //       contentEditable.innerHTML = apiValue;
  //     }
  //   }
  // }, [privacyData, termsData, activeTab]);

  // const getCurrentContent = () => {
  //   if (
  //     activeTab === "privacy" &&
  //     privacyData &&
  //     privacyData.results &&
  //     privacyData.results.length > 0
  //   ) {
  //     return privacyData.results[0].text || "";
  //   }
  //   if (
  //     activeTab === "terms" &&
  //     termsData &&
  //     termsData.results &&
  //     termsData.results.length > 0
  //   ) {
  //     return termsData.results[0].text || "";
  //   }
  //   return "";
  // };

  // useEffect(() => {
  //   const contentEditable = document.getElementById("editor-content");
  //   if (contentEditable) {
  //     contentEditable.innerHTML = getCurrentContent();
  //   }
  // }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const saveChanges = async () => {
    const contentEditable = document.getElementById("editor-content");
    let content = contentEditable ? contentEditable.innerHTML : "";
    setIsEditing(false);
    // try {
    //   if (activeTab === "privacy" && privacyId) {
    //     await updatePrivacyPolicy({
    //       id: privacyId,
    //       data: { text: content },
    //     }).unwrap();
    //     toast.success("Privacy policy updated successfully!");
    //     if (refetchTimeout.current) clearTimeout(refetchTimeout.current);
    //     refetchTimeout.current = setTimeout(() => {
    //       refetchPrivacy();
    //     }, 1000);
    //   } else if (activeTab === "terms") {
    //     if (termsId) {
    //       await updateTerms({ id: termsId, data: { text: content } }).unwrap();
    //       toast.success("Terms and conditions updated successfully!");
    //       if (refetchTimeout.current) clearTimeout(refetchTimeout.current);
    //       refetchTimeout.current = setTimeout(() => {
    //         refetchTerms();
    //       }, 1000);
    //     } else {
    //       await createTerms({ text: content }).unwrap();
    //       toast.success("Terms and conditions created successfully!");
    //       if (refetchTimeout.current) clearTimeout(refetchTimeout.current);
    //       refetchTimeout.current = setTimeout(() => {
    //         refetchTerms();
    //       }, 1000);
    //     }
    //   }
    // } catch (error) {
    //   toast.error("Failed to save changes.");
    // }
  };
  const handleEdit = () => {
    setIsEditing(true);
  };
  // Dummy content for tabs
  const dummyTerms = `<h2>Terms & Conditions</h2><ul><li>You must be at least 18 years old to use this service.</li><li>Do not share your password with anyone.</li><li>All data is confidential and protected.</li></ul>`;
  const dummyPrivacy = `<h2>Privacy Policy</h2><p>Your data is stored securely and will not be shared with third parties. We use cookies to improve user experience.</p>`;

  // Show dummy content if not editing and no API data
  return (
    <div className="h-[90vh] overflow-y-scroll bg-accent">
      <div className="w-11/12 h-[90vh] mx-auto mb-6">
        {/* Tabs */}
        <div className="flex items-center justify-between">
          <div className="flex mt-2">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "terms"
                  ? "text-primary border-b-2 border-primary "
                  : "text-subgray"
              }`}
              onClick={() => handleTabChange("terms")}
            >
              Terms and condition
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === "privacy"
                  ? "text-primary border-b-2 border-primary "
                  : "text-subgray"
              }`}
              onClick={() => handleTabChange("privacy")}
            >
              Privacy policy
            </button>
          </div>
          <div className="p-6">
            <button
              onClick={handleEdit}
              className="p-2 px-6 bg-primary text-white rounded-md"
            >
              Edit
            </button>
          </div>
        </div>
        {isEditing && (
          <div className="flex items-center justify-start mt-4 rounded">
            {/* Font size */}
            <select
              defaultValue="3"
              className="px-1 py-0.5 text-sm border-2 border-gray rounded mr-1"
              onChange={(e) => formatText("fontSize", e.target.value)}
            >
              <option value="1">10</option>
              <option value="2">11</option>
              <option value="3">12</option>
              <option value="4">14</option>
              <option value="5">15</option>
              <option value="6">16</option>
              <option value="7">17</option>
              <option value="8">18</option>
            </select>

            <div className="border-2 border-gray rounded">
              {/* Bold */}
              <button
                className="px-2 py-0.5  text-sm font-bold border-r-2 border-gray"
                onClick={() => formatText("bold")}
              >
                B
              </button>

              {/* Italic */}
              <button
                className="px-2 py-0.5  italic text-sm border-r-2 border-gray"
                onClick={() => formatText("italic")}
              >
                I
              </button>

              {/* Underline */}
              <button
                className="px-2 py-0.5  underline text-sm"
                onClick={() => formatText("underline")}
              >
                U
              </button>
            </div>

            {/* Text align group */}
            <div className="flex space-x-1 border-2 border-gray rounded ml-1">
              <button
                className="px-2 py-1.5  text-sm border-r border-gray"
                onClick={() => formatText("justifyLeft")}
              >
                <span className="w-4">
                  <MdFormatAlignLeft />
                </span>
              </button>

              <button
                className="px-2 py-1 text-sm border-r-2 border-gray"
                onClick={() => formatText("justifyCenter")}
              >
                <span className="w-4">
                  <GrTextAlignCenter />
                </span>
              </button>

              <button
                className="px-2 py-1 text-sm "
                onClick={() => formatText("justifyRight")}
              >
                <span className="w-4">
                  <MdFormatAlignRight />
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Editable content area */}
        <div
          id="editor-content"
          className="min-h-96 outline-none bg-white rounded-lg my-8 border border-gray p-6"
          contentEditable={isEditing ? "true" : "false"}
          dangerouslySetInnerHTML={{
            __html: activeTab === "terms" ? dummyTerms : dummyPrivacy,
          }}
        />

        {/* Save button */}
        {isEditing && (
          <div className="bg-gray-50">
            <button
              className="w-full bg-primary mb-6 text-white font-medium py-2 px-4 rounded"
              onClick={saveChanges}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
