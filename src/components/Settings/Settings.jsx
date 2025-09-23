import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { GrTextAlignCenter } from "react-icons/gr";
import { MdFormatAlignLeft, MdFormatAlignRight } from "react-icons/md";
import {
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
  useGetTermsQuery,
  useCreateTermsMutation,
  useUpdateTermsMutation,
} from "../../Api/authApi";

export default function TextEditor() {
  const [activeTab, setActiveTab] = useState("terms");
  const [termsId, setTermsId] = useState(null);
  const [privacyId, setPrivacyId] = useState(null);
  const {
    data: privacyData,
    isLoading: isPrivacyLoading,
    refetch: refetchPrivacy,
  } = useGetPrivacyPolicyQuery();
  const {
    data: termsData,
    isLoading: isTermsLoading,
    refetch: refetchTerms,
  } = useGetTermsQuery();
  const [updatePrivacyPolicy, { isLoading: isUpdatingPrivacy }] =
    useUpdatePrivacyPolicyMutation();
  const [createTerms, { isLoading: isCreatingTerms }] =
    useCreateTermsMutation();
  const [updateTerms, { isLoading: isUpdatingTerms }] =
    useUpdateTermsMutation();
  const refetchTimeout = useRef();

  // Set privacyId from API
  useEffect(() => {
    if (privacyData && privacyData.results && privacyData.results.length > 0) {
      setPrivacyId(privacyData.results[0].id);
    }
  }, [privacyData]);

  // Set termsId from API
  useEffect(() => {
    if (termsData && termsData.results && termsData.results.length > 0) {
      setTermsId(termsData.results[0].id);
    }
  }, [termsData]);

  // Always sync the editor DOM with API data when tab is active
  useEffect(() => {
    const contentEditable = document.getElementById("editor-content");
    if (
      activeTab === "privacy" &&
      privacyData &&
      privacyData.results &&
      privacyData.results.length > 0
    ) {
      const apiValue = privacyData.results[0].text || "";
      if (contentEditable && apiValue !== contentEditable.innerHTML) {
        contentEditable.innerHTML = apiValue;
      }
    } else if (
      activeTab === "terms" &&
      termsData &&
      termsData.results &&
      termsData.results.length > 0
    ) {
      const apiValue = termsData.results[0].text || "";
      if (contentEditable && apiValue !== contentEditable.innerHTML) {
        contentEditable.innerHTML = apiValue;
      }
    }
  }, [privacyData, termsData, activeTab]);

  const getCurrentContent = () => {
    if (
      activeTab === "privacy" &&
      privacyData &&
      privacyData.results &&
      privacyData.results.length > 0
    ) {
      return privacyData.results[0].text || "";
    }
    if (
      activeTab === "terms" &&
      termsData &&
      termsData.results &&
      termsData.results.length > 0
    ) {
      return termsData.results[0].text || "";
    }
    return "";
  };

  useEffect(() => {
    const contentEditable = document.getElementById("editor-content");
    if (contentEditable) {
      contentEditable.innerHTML = getCurrentContent();
    }
  }, [activeTab, privacyData, termsData]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const saveChanges = async () => {
    const contentEditable = document.getElementById("editor-content");
    let content = contentEditable ? contentEditable.innerHTML : "";
    try {
      if (activeTab === "privacy" && privacyId) {
        await updatePrivacyPolicy({
          id: privacyId,
          data: { text: content },
        }).unwrap();
        toast.success("Privacy policy updated successfully!");
        if (refetchTimeout.current) clearTimeout(refetchTimeout.current);
        refetchTimeout.current = setTimeout(() => {
          refetchPrivacy();
        }, 1000);
      } else if (activeTab === "terms") {
        if (termsId) {
          await updateTerms({ id: termsId, data: { text: content } }).unwrap();
          toast.success("Terms and conditions updated successfully!");
          if (refetchTimeout.current) clearTimeout(refetchTimeout.current);
          refetchTimeout.current = setTimeout(() => {
            refetchTerms();
          }, 1000);
        } else {
          await createTerms({ text: content }).unwrap();
          toast.success("Terms and conditions created successfully!");
          if (refetchTimeout.current) clearTimeout(refetchTimeout.current);
          refetchTimeout.current = setTimeout(() => {
            refetchTerms();
          }, 1000);
        }
      }
    } catch (error) {
      toast.error("Failed to save changes.");
    }
  };

  return (
    <div className="h-[90vh] overflow-y-scroll bg-accent">
      <div className="w-11/12 h-[90vh] mx-auto mb-6">
        {/* Tabs */}
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

        <div className="flex items-center justify-start mt-4 rounded">
          {/* Font size */}
          <select
            defaultValue="3"
            className="px-1 py-0.5 text-sm border border-borderGray rounded mr-1"
            onChange={(e) => formatText("fontSize", e.target.value)}
          >
            <option value="1">10</option>
            <option value="2">11</option>
            <option value="3">12</option>
            <option value="4">14</option>
            <option value="5">16</option>
            <option value="6">17</option>
            <option value="7">18</option>
          </select>

          <div className="border border-borderGray rounded">
            {/* Bold */}
            <button
              className="px-2 py-0.5  text-sm font-bold border-r border-borderGray"
              onClick={() => formatText("bold")}
            >
              B
            </button>

            {/* Italic */}
            <button
              className="px-2 py-0.5  italic text-sm border-r border-borderGray"
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
          <div className="flex space-x-1 border border-borderGray rounded ml-1">
            <button
              className="px-2 py-1.5  text-sm border-r border-borderGray"
              onClick={() => formatText("justifyLeft")}
            >
              <span className="w-4">
                <MdFormatAlignLeft />
              </span>
            </button>

            <button
              className="px-2 py-1  rounded text-sm border-r border-borderGray"
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

        {/* Editable content area */}
        <div
          id="editor-content"
          className="min-h-96 outline-none bg-white rounded-lg my-8"
          contentEditable="true"
          dangerouslySetInnerHTML={{ __html: getCurrentContent() }}
        />

        {/* Save button */}
        <div className="bg-gray-50">
          <button
            className="w-full bg-primary mb-6 text-white font-medium py-2 px-4 rounded"
            onClick={saveChanges}
            disabled={
              isPrivacyLoading ||
              isUpdatingPrivacy ||
              isTermsLoading ||
              isCreatingTerms ||
              isUpdatingTerms
            }
          >
            {isPrivacyLoading ||
            isUpdatingPrivacy ||
            isTermsLoading ||
            isCreatingTerms ||
            isUpdatingTerms
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
